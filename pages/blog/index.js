import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';

// Mapeo de categorías para mostrar etiquetas más legibles
const CATEGORY_MAPPING = {
  'documentacion': 'Documentación',
  'proceso-seleccion': 'Proceso de Selección',
  'idiomas': 'Idiomas',
  'vivienda': 'Vivienda',
  'salarios': 'Salarios y Condiciones',
  'cultura': 'Cultura y Adaptación'
};

// Función de ayuda para formatear la categoría
const formatCategory = (categorySlug) => {
  return CATEGORY_MAPPING[categorySlug] || categorySlug;
};

export default function BlogIndex({ initialArticles = [], categories = [], tags = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);

  // Función para manejar el clic en tags
  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  // Efecto para filtrar artículos cuando cambian los filtros
  useEffect(() => {
    let filtered = [...initialArticles];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(lowerSearchTerm) ||
        article.excerpt.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filtrar por tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article => 
        article.tags?.some(tag => selectedTags.includes(tag))
      );
    }

    setArticles(filtered);
  }, [searchTerm, selectedCategory, selectedTags, initialArticles]);

  // Componente actualizado para la tarjeta de artículo
  const ArticleCard = ({ article }) => (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]">
      {/* Contenedor de imagen */}
      {article.cover_image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {formatCategory(article.category)}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(article.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          <Link 
            href={`/blog/${article.slug}`}
            className="text-gray-900 hover:text-blue-600"
          >
            {article.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {article.tags?.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
          >
            Leer más
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Preguntas Frecuentes | Agencias Suiza</title>
        <meta 
          name="description" 
          content="Encuentra información útil sobre trabajo temporal en Suiza, procesos de contratación y más."
        />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Sección Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra información útil sobre trabajo temporal en Suiza,
            procesos de contratación y más.
          </p>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Buscador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categorías
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {Object.entries(CATEGORY_MAPPING).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags populares
            </label>
            <div className="flex flex-wrap gap-2 py-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No hay artículos disponibles en este momento.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data: articles, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Procesar las URLs de las imágenes
    const processedArticles = await Promise.all(
      articles.map(async (article) => {
        if (article.cover_image) {
          // Si la URL no es completa y no comienza con http, obtener la URL pública
          if (!article.cover_image.startsWith('http')) {
            const { data, error: urlError } = supabase.storage
              .from('blog-images')
              .getPublicUrl(article.cover_image);
            if (urlError) {
              console.error(`Error obteniendo la URL pública para ${article.cover_image}:`, urlError);
              article.cover_image = null;
            } else {
              article.cover_image = data.publicUrl;
            }
          }
        }
        return article;
      })
    );

    // Obtener categorías únicas manteniendo los slugs para el filtrado
    const categories = [...new Set(articles.map(article => article.category))].filter(Boolean);

    // Obtener tags únicos
    let tagsSet = new Set();
    articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    const tags = Array.from(tagsSet);

    return {
      props: {
        initialArticles: processedArticles || [],
        categories: categories || [],
        tags: tags || []
      }
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        initialArticles: [],
        categories: [],
        tags: []
      }
    };
  }
}
