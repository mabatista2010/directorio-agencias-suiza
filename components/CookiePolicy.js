// components/CookiePolicy.js
export function CookiePolicy() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-semibold mb-4">Política de Cookies</h2>

      <section className="mb-6">
        <h3 className="text-xl font-medium mb-2">¿Qué son las cookies?</h3>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.
          Estas nos ayudan a proporcionar funcionalidades esenciales y mejorar su experiencia de navegación.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium mb-2">Tipos de cookies que utilizamos</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.
          </li>
          <li>
            <strong>Cookies analíticas:</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.
          </li>
          <li>
            <strong>Cookies funcionales:</strong> Permiten recordar sus preferencias y proporcionar funciones mejoradas.
          </li>
          <li>
            <strong>Cookies de rendimiento:</strong> Nos ayudan a mejorar el rendimiento del sitio web.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium mb-2">¿Cómo utilizamos las cookies?</h3>
        <p>Utilizamos cookies para:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Mantener su sesión activa mientras navega por el sitio</li>
          <li>Entender cómo utiliza nuestro sitio para mejorarlo</li>
          <li>Recordar sus preferencias y configuraciones</li>
          <li>Proporcionar funcionalidades personalizadas</li>
          <li>Mejorar la velocidad y seguridad del sitio</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium mb-2">Sus opciones respecto a las cookies</h3>
        <p>
          Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies
          que ya están en su dispositivo y puede configurar la mayoría de los navegadores para
          que no las acepten. Sin embargo, si lo hace, es posible que deba ajustar manualmente
          algunas preferencias cada vez que visite el sitio y que algunos servicios y funcionalidades
          no funcionen.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-2">Más información</h3>
        <p>
          Para obtener más información sobre cómo utilizamos las cookies y sus derechos al respecto,
          no dude en contactarnos o consultar nuestra{' '}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
            política de privacidad
          </Link>.
        </p>
      </section>
    </div>
  );
}
