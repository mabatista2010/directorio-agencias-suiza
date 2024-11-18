// pages/admin/blog/new.js
import BlogEditor from '../../../components/BlogEditor';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function NewBlogPost() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      // Asegurarnos de que todos los campos se envían correctamente
      const dataToSubmit = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        cover_image: formData.cover_image,
        seo_title: formData.seo_title || '',  // Asegurar que no sea null
        seo_description: formData.seo_description || '',  // Asegurar que no sea null
        status: formData.status,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([dataToSubmit])
        .select();

      if (error) throw error;

      router.push('/admin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Nuevo Artículo
            </h2>
            <BlogEditor onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}