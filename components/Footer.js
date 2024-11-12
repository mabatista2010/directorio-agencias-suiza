// components/Footer.js

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row justify-between">
          <p className="text-center md:text-left">&copy; 2024 Directorio de Agencias Suiza. Todos los derechos reservados.</p>
          {/* Sección de enlaces adicionales (opcional) */}
          {/* Puedes agregar enlaces como "Política de Privacidad", "Términos de Uso", etc., en el futuro */}
          {/* 
          <div className="mt-4 md:mt-0">
            <a href="/privacy" className="mx-2 hover:text-white text-sm">Política de Privacidad</a>
            <a href="/terms" className="mx-2 hover:text-white text-sm">Términos de Uso</a>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
}
