import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CVGenerator from '../components/CVGenerator';

export default function CVGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Generador de CV - Agencias Suiza</title>
        <meta name="description" content="Crea tu CV profesional personalizado" />
      </Head>

      <Header />

      <main className="flex-grow">
        <CVGenerator />
      </main>

      <Footer />
    </div>
  );
}