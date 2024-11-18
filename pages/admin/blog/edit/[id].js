// pages/admin/blog/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlogEditor from '../../../../components/BlogEditor';
import { supabase } from '../../../../lib/supabaseClient';

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error:', error);
      router.push('/admin');
      return;
    }

    setArticle(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData) => {
    const { error } = await supabase
      .from('blog_posts')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error:', error);
      return;
    }

    router.push('/admin');
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Editar Artículo
            </h2>
            <BlogEditor 
              initialData={article} 
              onSubmit={handleSubmit} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}