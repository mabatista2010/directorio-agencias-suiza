// components/QuillEditor.js
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '../lib/supabaseClient';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    if (typeof window !== 'undefined') {
      await import('react-quill/dist/quill.snow.css');
    }
    return function Quill({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { 
    ssr: false,
    loading: () => <p>Cargando editor...</p>
  }
);

const QuillEditor = ({ value, onChange, error }) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEditorValue(value || '');
  }, [value]);

  const handleChange = useCallback((content) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  }, [onChange]);

  const imageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `blog-content/${fileName}`;

          const { data, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

          const editor = document.querySelector('.ql-editor');
          const range = document.getSelection().getRangeAt(0);

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
  }, []);

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

  if (!mounted) {
    return <div className="h-96 bg-gray-50 rounded-lg animate-pulse" />;
  }

  return (
    <div className="relative">
      <style jsx global>{`
        .ql-container {
          height: auto !important;
          min-height: 300px;
        }
        .ql-editor {
          min-height: 300px;
          height: auto !important;
        }
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
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        className="w-full"
        preserveWhitespace={true}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default QuillEditor;