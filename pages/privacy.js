// pages/privacy.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Política de Privacidad - Agencias Suiza</title>
        <meta name="description" content="Política de privacidad de Agencias Suiza" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg">
          <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>


          <p className="mb-8">
            En Agencias Suiza ("nosotros", "nuestro", "la Plataforma"), nos comprometemos a proteger y respetar su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información personal cuando utiliza nuestro sitio web y servicios.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
            <p>Podemos recopilar y procesar los siguientes datos personales sobre usted:</p>
            <ul>
              <li>
                <strong>Información proporcionada por usted:</strong> Datos que nos facilita al registrarse, crear un CV, o comunicarse con agencias. Esto incluye su nombre, correo electrónico, número de teléfono, experiencia laboral, educación y cualquier otra información que decida proporcionar.
              </li>
              <li>
                <strong>Información recopilada automáticamente:</strong> Detalles sobre sus visitas a nuestro sitio web, como dirección IP, tipo de navegador, páginas visitadas y tiempo de navegación.
              </li>
              <li>
                <strong>Cookies y tecnologías similares:</strong> Utilizamos cookies para mejorar su experiencia y recopilar información sobre cómo utiliza nuestro sitio web.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
            <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
            <ul>
              <li><strong>Prestación de servicios:</strong> Proporcionar y gestionar nuestros servicios, incluyendo el generador de CV y la conexión con agencias.</li>
              <li><strong>Personalización:</strong> Adaptar nuestro contenido y ofertas a sus intereses.</li>
              <li><strong>Comunicación:</strong> Enviarle notificaciones, responder a sus consultas y proporcionarle información relevante.</li>
              <li><strong>Mejora del servicio:</strong> Analizar y mejorar nuestros servicios y la experiencia del usuario.</li>
              <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulaciones aplicables.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Divulgación de su Información</h2>
            <p>Podemos compartir su información personal con:</p>
            <ul>
              <li><strong>Agencias de trabajo:</strong> Cuando decide contactar o enviar su CV a través de nuestra plataforma.</li>
              <li><strong>Proveedores de servicios:</strong> Terceros que nos ayudan a operar nuestro sitio web y servicios, siempre bajo acuerdos de confidencialidad.</li>
              <li><strong>Autoridades legales:</strong> Si es requerido por ley o para proteger nuestros derechos legales.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Seguridad de los Datos</h2>
            <p>Implementamos medidas de seguridad adecuadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Estas incluyen:</p>
            <ul>
              <li><strong>Encriptación:</strong> Uso de tecnología SSL para proteger datos sensibles.</li>
              <li><strong>Acceso restringido:</strong> Solo personal autorizado puede acceder a su información.</li>
              <li><strong>Monitorización:</strong> Revisiones y actualizaciones periódicas de nuestras políticas de seguridad.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Retención de Datos</h2>
            <p>Conservamos sus datos personales únicamente durante el tiempo necesario para cumplir con los fines para los cuales fueron recopilados, o según lo requiera la ley.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Sus Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li><strong>Acceder:</strong> Solicitar una copia de los datos personales que tenemos sobre usted.</li>
              <li><strong>Rectificar:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong>Eliminar:</strong> Solicitar la eliminación de sus datos personales.</li>
              <li><strong>Restringir:</strong> Limitar el procesamiento de sus datos en ciertas circunstancias.</li>
              <li><strong>Oponerse:</strong> Oponerse al procesamiento de sus datos por motivos legítimos.</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y comúnmente utilizado.</li>
            </ul>
            <p>Para ejercer estos derechos, contáctenos en <a href="mailto:contacto@agenciassuiza.com">contacto@agenciassuiza.com</a>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Transferencias Internacionales</h2>
            <p>Sus datos pueden ser transferidos y almacenados fuera de su país de residencia. Tomamos medidas para garantizar que sus datos sean tratados de manera segura y de acuerdo con esta política.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Cambios en esta Política</h2>
            <p>Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos publicando la nueva política en esta página.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
            <p>Si tiene preguntas o inquietudes sobre nuestra Política de Privacidad, contáctenos en:</p>
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
