import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleMapComponent from '../components/GoogleMap';
import Filters from '../components/Filters';
import { supabase } from '../lib/supabaseClient';

export default function Agencies({ agencies: initialAgencies }) {
  const [filteredAgencies, setFilteredAgencies] = useState(initialAgencies);

  const handleFiltersChange = ({ ciudades, idiomas, sectores, sociedades }) => {
    let filtered = initialAgencies;

    // Filtrar por sociedades
    if (sociedades && sociedades.length > 0) {
      filtered = filtered.filter(agency => 
        sociedades.includes(agency.sociedad)
      );
    }

    // Filtrar por ciudades
    if (ciudades && ciudades.length > 0) {
      filtered = filtered.filter(agency => 
        ciudades.some(ciudad => agency.direccion?.includes(ciudad))
      );
    }

    // Filtrar por idiomas
    if (idiomas && idiomas.length > 0) {
      filtered = filtered.filter(agency =>
        idiomas.some(idioma => 
          agency.idiomas?.includes(idioma)
        )
      );
    }

    // Filtrar por sectores
    if (sectores && sectores.length > 0) {
      filtered = filtered.filter(agency =>
        sectores.some(sector =>
          agency.area_especializacion?.includes(sector)
        )
      );
    }

    setFilteredAgencies(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Agencias en Suiza - Mapa</title>
        <meta name="description" content="Encuentra agencias de trabajo temporal en Suiza" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Filters onFiltersChange={handleFiltersChange} />

        <div className="rounded-lg overflow-hidden shadow-lg">
          <GoogleMapComponent agencies={filteredAgencies} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: agencies, error } = await supabase
    .from('agencias')
    .select('*');

  if (error) {
    console.error('Error fetching agencies:', error);
    return {
      props: {
        agencies: []
      }
    };
  }

  return {
    props: {
      agencies
    }
  };
}
