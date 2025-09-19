import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
   <header className="bg-gray-800 text-white py-4 shadow-md fixed top-0 w-full z-10">
  <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
    <h1 className="text-2xl font-bold tracking-tight">WCAG Kontrast App</h1>
    <div className="flex gap-4">
      <Link
        className="px-4 py-2 rounded hover:bg-yellow-300 hover:text-gray-900 transition"
        href="/"
      >
        Home
      </Link>
      <Link
        className="px-4 py-2 rounded hover:bg-yellow-300 hover:text-gray-900 transition"
        to="/challenge"
      >
        Testiraj Kontrast
      </Link>
      <Link
        className="px-4 py-2 rounded hover:bg-yellow-300 hover:text-gray-900 transition"
        to="/simulation"
      >
        Simulacija
      </Link>
      <Link
        className="px-4 py-2 rounded hover:bg-yellow-300 hover:text-gray-900 transition"
        to="/scoreboard"
      >
        Tabela Rezultata
      </Link>
    </div>
  </nav>
</header>

  );
}

export default Header;
