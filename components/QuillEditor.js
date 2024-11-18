import React from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '../lib/supabaseClient';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange, error }) => {
  const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Cargando editor...</p>
  });

  // Función para manejar la subida de imágenes
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          // Crear un nombre único para el archivo
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `blog-content/${fileName}`;

          // Subir la imagen a Supabase Storage
          const { data, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) throw uploadError;

          // Obtener la URL pública de la imagen
          const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

          // Obtener la referencia al editor
          const editor = document.querySelector('.ql-editor');
          const range = document.getSelection().getRangeAt(0);

          // Insertar la imagen en el editor
          const img = document.createElement('img');
          img.src = publicUrl;
          img.style.maxWidth = '100%';
          range.insertNode(img);

        } catch (error) {
          console.error('Error al subir la imagen:', error);
          alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
        }
      }
    };
  };

  // Configuración del editor
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  return (
    <div>
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

      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        className="h-96 mb-12"
        theme="snow"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default QuillEditor;