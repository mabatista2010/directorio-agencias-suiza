// components/BlogEditor.js

import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Image, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import dynamic from 'next/dynamic';
import QuillEditor from './QuillEditor'; // Asegúrate de importar el QuillEditor

export default function BlogEditor({ onSubmit, initialData = null }) {
  
  // Definir los valores por defecto para todos los campos
  const defaultData = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    cover_image: '',
    seo_title: '',
    seo_description: '',
    status: 'draft'
  };

  // Combinar los datos iniciales con los valores por defecto
  const [formData, setFormData] = useState({
    ...defaultData,
    ...initialData
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Actualizar formData si initialData cambia
  useEffect(() => {
    setFormData({
      ...defaultData,
      ...initialData
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Generar slug automáticamente desde el título
    if (name === 'title') {
      const generatedSlug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }));
    }
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    const trimmedTag = newTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Función para manejar la subida de imágenes usando Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        cover_image: publicUrl
      }));
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setErrors(prev => ({
        ...prev,
        image: `Error al subir la imagen: ${error.message}`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar la imagen existente de Supabase Storage
  const handleImageRemove = async () => {
    if (formData.cover_image) {
      try {
        setIsLoading(true);

        // Extraer el nombre del archivo de la URL
        const url = new URL(formData.cover_image);
        const pathname = url.pathname; // /storage/v1/object/public/blog-images/blog-covers/123456789.jpg
        const filePath = pathname.replace('/storage/v1/object/public/', '');

        // Eliminar la imagen de Supabase Storage
        const { error } = await supabase.storage
          .from('blog-images')
          .remove([filePath]);

        if (error) throw error;

        // Actualizar el estado para eliminar la referencia a la imagen
        setFormData(prev => ({
          ...prev,
          cover_image: ''
        }));
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Error al eliminar la imagen: ' + error.message
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.content.trim()) newErrors.content = 'El contenido es obligatorio';
    if (!formData.category) newErrors.category = 'La categoría es obligatoria';
    if (!formData.seo_title.trim()) newErrors.seo_title = 'El título SEO es obligatorio';
    if (!formData.seo_description.trim()) newErrors.seo_description = 'La descripción SEO es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
      // Aquí puedes redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Error al guardar el artículo'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
        }

        .ql-editor p {
          margin-bottom: 1em;
        }

        .ql-snow .ql-toolbar button.ql-image:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-image:hover .ql-stroke {
          stroke: #2563eb;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título y Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Título del artículo"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="url-del-articulo"
            />
          </div>
        </div>

        {/* Extracto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Extracto
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Breve descripción del artículo..."
          />
        </div>

        {/* Contenido Principal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenido
          </label>
          <QuillEditor
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
            error={errors.content}
          />
        </div>

        {/* Categoría y Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar categoría</option>
              <option value="documentacion">Documentación</option>
              <option value="proceso-seleccion">Proceso de Selección</option>
              <option value="idiomas">Idiomas</option>
              <option value="vivienda">Vivienda</option>
              <option value="salarios">Salarios y Condiciones</option>
              <option value="cultura">Cultura y Adaptación</option>
              <option value="ayudas-subsidios">Ayudas y subsidios</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const trimmedTag = newTag.trim();
                    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
                      setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, trimmedTag]
                      }));
                      setNewTag('');
                    }
                  }
                }}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Añadir tag... (presiona Enter para añadir)"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Añadir
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Imagen de Portada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen de Portada
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <div className="flex items-center space-x-2">
                <Image className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {isLoading ? 'Subiendo...' : 'Seleccionar imagen'}
                </span>
              </div>
            </button>
            {formData.cover_image && (
              <div className="relative w-20 h-20">
                <img
                  src={formData.cover_image}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  disabled={isLoading}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Configuración SEO */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Configuración SEO
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título SEO
            </label>
            <input
              type="text"
              name="seo_title"
              value={formData.seo_title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.seo_title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Título optimizado para motores de búsqueda"
            />
            {errors.seo_title && (
              <p className="mt-1 text-sm text-red-600">{errors.seo_title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción SEO
            </label>
            <textarea
              name="seo_description"
              value={formData.seo_description}
              onChange={handleChange}
              rows={2}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.seo_description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Descripción optimizada para motores de búsqueda"
            />
            {errors.seo_description && (
              <p className="mt-1 text-sm text-red-600">{errors.seo_description}</p>
            )}
          </div>
        </div>

        {/* Estado y Botones de Acción */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Guardando...' : 'Guardar Artículo'}</span>
            </button>
          </div>
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <span>{errors.submit}</span>
          </div>
        )}
      </form>
    </>
  );
}
