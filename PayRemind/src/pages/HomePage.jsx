import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0d0f18] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 bg-[#0d0f18]">
        <h1 className="text-2xl font-bold">PayRemind</h1>
        <div className="flex gap-4">
          <Link to="/register" className="text-[#8fa3ff] hover:text-white">
            Registrarse
          </Link>
          <Link to="/login" className="text-[#8fa3ff] hover:text-white">
            Iniciar sesión
          </Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/service/active"
            className="bg-[#8fa3ff] hover:bg-[#7a92ff] text-[#0d0f18] py-4 px-6 rounded-lg text-center transition-colors duration-300"
          >
            Servicios Activos
          </Link>
          <Link
            to="/service/overdue"
            className="bg-[#8fa3ff] hover:bg-[#7a92ff] text-[#0d0f18] py-4 px-6 rounded-lg text-center transition-colors duration-300"
          >
            Servicios Vencidos
          </Link>
          <Link
            to="/service/paid"
            className="bg-[#8fa3ff] hover:bg-[#7a92ff] text-[#0d0f18] py-4 px-6 rounded-lg text-center transition-colors duration-300"
          >
            Servicios Pagados
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
