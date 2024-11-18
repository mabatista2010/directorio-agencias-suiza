import React, { useState } from 'react';

const EJEMPLOS = {
  1: "Profesional de la construcción con 10 años de experiencia. Manual, y capaz de gestionar una gran carga de trabajo",
  2: "Profesional experimentado en logistica, 5 años de experiencia que me han ayudado a comprender y entender los aspectos claves de esta profesión.",
  3: "Asistente administrativo con experiencia de mas de 6 años. Mi habilidad para resolver problemas y gestionar el estres, han sido claves para mi trabajo.",
};

function EnhancedTextArea({ value, onChange, className = "", type = "profile" }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExampleClick = (exampleNumber) => {
    onChange(EJEMPLOS[exampleNumber]);
  };

  const handleGenerateAI = async () => {
    if (!value.trim()) {
      alert('Por favor, escribe o selecciona un texto antes de generar');
      return;
    }

    setIsGenerating(true);
    try {
      // Seleccionar el endpoint correcto según el tipo
      const endpoint = type === "profile" ? '/api/generate-cv-profile' : '/api/translate-experience';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: value,
          type: type // Asegurarnos que el tipo se envía correctamente
        }),
        });

      if (!response.ok) throw new Error('Error al generar el texto');

      const data = await response.json();
      onChange(type === "profile" ? data.generatedText : data.translation);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar el texto. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          type === "profile" 
            ? "Describe brevemente tu experiencia profesional, tus logros más destacados y tus objetivos. Nuestra IA se encargará del resto..."
            : type === "education"
              ? "Describe tu formación académica, especializaciones y logros académicos relevantes..."
              : "Describe tus responsabilidades y logros en este puesto..."
        }
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        rows={4}
        disabled={isGenerating}
      />

      <div className="flex flex-wrap gap-2 items-center justify-between">
        {/* Solo mostrar ejemplos para el perfil */}
        {type === "profile" && (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handleExampleClick(num)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isGenerating}
              >
                Ejemplo {num}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="flex items-center px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {type === "profile" ? 'Generando...' : 'Traduciendo...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {type === "profile" ? 'Mejorar con IA' : 'Traducir al francés'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default EnhancedTextArea;