// pages/terms.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Términos y Condiciones - Agencias Suiza</title>
        <meta name="description" content="Términos y condiciones de uso de Agencias Suiza" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg">
          <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>

          <p className="mb-8">
            Por favor, lea detenidamente estos Términos y Condiciones ("Términos") antes de utilizar el sitio web y los servicios de Agencias Suiza ("nosotros", "nuestro").
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder o utilizar nuestro sitio web y servicios, usted acepta cumplir y estar sujeto a estos Términos y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
            <p>Agencias Suiza es una plataforma que:</p>
            <ul>
              <li>Facilita la conexión entre candidatos y agencias de trabajo temporal en Suiza.</li>
              <li>Proporciona herramientas para la creación de CV profesionales.</li>
              <li>Ofrece recursos e información sobre el mercado laboral suizo.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Uso del Sitio Web</h2>
            <p>Usted se compromete a utilizar nuestro sitio web y servicios únicamente para fines legales y de acuerdo con estos Términos. Está prohibido:</p>
            <ul>
              <li>Violar leyes o regulaciones locales, nacionales o internacionales.</li>
              <li>Transmitir material publicitario no solicitado o no autorizado.</li>
              <li>Suplantar a cualquier persona o entidad.</li>
              <li>Interferir o intentar interferir con el funcionamiento adecuado del sitio web.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Registro de Usuario</h2>
            <p>
              Para acceder a ciertas funcionalidades, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran bajo su cuenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contenido del Usuario</h2>
            <p>Al subir o publicar contenido en nuestro sitio, usted:</p>
            <ul>
              <li>Garantiza que posee o tiene los derechos para usar dicho contenido.</li>
              <li>Otorga a Agencias Suiza una licencia para usar, reproducir y mostrar dicho contenido en relación con la prestación de nuestros servicios.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Propiedad Intelectual</h2>
            <p>
              Todos los derechos de propiedad intelectual del sitio web y su contenido, excluyendo el contenido del usuario, son propiedad de Agencias Suiza o sus licenciantes. Queda prohibido el uso de cualquier material del sitio sin nuestro consentimiento previo por escrito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley, Agencias Suiza no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos o uso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Enlaces a Terceros</h2>
            <p>
              Nuestro sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o prácticas de estos sitios y no asumimos responsabilidad alguna por ellos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en esta página. Es su responsabilidad revisar estos Términos periódicamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de Suiza, sin tener en cuenta sus conflictos de leyes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contacto</h2>
            <p>Si tiene preguntas sobre estos Términos, contáctenos en:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:contacto@agenciassuiza.com">contacto@agenciassuiza.com</a></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
