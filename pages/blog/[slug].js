// pages/blog/[slug].js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';
// Importación de los estilos de React Quill
import 'react-quill/dist/quill.snow.css';

export default function BlogPost({ article }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{`${article.seo_title || article.title} | Agencias Suiza`}</title>
        <meta name="description" content={article.seo_description || article.excerpt} />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {article.cover_image && (
            <div className="relative w-full aspect-video">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error('Error loading image:', article.cover_image);
                }}
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {article.title}
            </h1>
            <p className="text-gray-500 mb-6">
              {new Date(article.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            {/* Contenido actualizado para manejar links y estilos de Quill */}
            <div className="ql-snow">
              <div 
                className="ql-editor prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-gray-700 prose-p:mb-4
                  prose-ul:list-disc prose-ul:pl-4
                  prose-ol:list-decimal prose-ol:pl-4
                  prose-strong:font-bold prose-strong:text-gray-900
                  prose-em:italic
                  prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Estilos específicos para los elementos de Quill */}
            <style jsx global>{`
              .ql-editor {
                padding: 0;
              }
              .ql-editor p {
                margin-bottom: 1em;
              }
              .ql-editor a {
                color: #2563eb;
                text-decoration: underline;
                transition: color 0.2s ease;
              }
              .ql-editor a:hover {
                color: #1d4ed8;
              }
              .ql-editor img {
                max-width: 100%;
                height: auto;
                margin: 1em 0;
                border-radius: 0.5rem;
              }
              .ql-editor ul,
              .ql-editor ol {
                padding-left: 1.5em;
                margin-bottom: 1em;
              }
              .ql-editor ul li,
              .ql-editor ol li {
                margin-bottom: 0.5em;
              }
              .ql-editor h1,
              .ql-editor h2,
              .ql-editor h3 {
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                font-weight: bold;
              }
            `}</style>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;

    const { data: article, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !article) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        article
      }
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true
    };
  }
}
