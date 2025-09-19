/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Level6({ progress, setProgress }) {
  const [fontSize, setFontSize] = useState(10);
  const [contrast, setContrast] = useState(false);
  const [fontFamily, setFontFamily] = useState("serif");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [feedback, setFeedback] = useState(
    "Podesite opcije sa strane kako biste poboljšali čitljivost!"
  );
const navigate = useNavigate();

  useEffect(() => {
    // Ako su sve postavke dovoljno podešene, tekst je najčitljiviji
    if (fontSize >= 16 && contrast && letterSpacing >= 1.5) {
      setFeedback("Savršeno! Tekst je sada vrlo čitljiv!");
    } 
    // Ako je barem jedna opcija poboljšana
    else if (fontSize >= 13 && contrast || letterSpacing >= 1) {
      setFeedback("Tekst je lakše čitati!");
    } 
    // Ako su postavke još uvijek slabe
    else {
      setFeedback("Još uvijek teško čitljivo...");
    }
  }, [fontSize, contrast, letterSpacing]);

  const handleNextLevel = () => {
    navigate("/roadmap");
    setProgress((prev) => ({ ...prev, level6: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-8 space-y-8">
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 ">
    Simulacija slabog vida
  </h1>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Dobrodošli u ovaj izazov čitljivosti! Tekst koji vidite je namjerno mali i mutan kako bi dočarao poteškoće koje osobe sa slabijim vidom mogu imati.
    Vaš zadatak je da pomoću <strong>alata sa bočne trake</strong> prilagodite prikaz teksta i učinite ga što čitljivijim.
    <br></br><b>Možete:</b> Povećati veličinu fonta, uključiti visoki kontrast, promijeniti stil slova (font) ili povećati razmak između slova.
    <br></br>Eksperimentišite sa svim opcijama i pratite kako male promjene značajno poboljšavaju čitljivost.
    Cilj je postići optimalnu vidljivost i osjećati razliku u percepciji teksta. Uživajte u igri i istraživanju!
  </p>
</header>


      <div className="flex gap-6">
        {/* Main Game Area */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden min-h-[500px]">
         <div
  className="p-4 rounded-lg w-full h-full flex flex-col items-start justify-start"
  style={{
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    letterSpacing: `${letterSpacing}px`,
    color: contrast ? "#111" : "#555", // slab kontrast simulacija
    filter: `blur(${Math.max(
      6 * (1 - 0.7 * Math.min(fontSize / 16, 1) 
               - 0.2 * (contrast ? 1 : 0) 
               - 0.2 * Math.min(letterSpacing / 2, 1)
             ), 
      0
    )}px)`,
    transition: "all 0.3s ease",
  }}
>

            <p>
              Dobrodošli u ovu simulaciju slabog vida. Tekst koji vidite je namjerno malen i mutan kako bi prikazao poteškoće s čitanjem pri određenim vizualnim oštećenjima.
              Vaš zadatak je koristiti alate sa strane kako biste poboljšali čitljivost. Povećajte veličinu fonta, uključite visok kontrast, promijenite stil slova ili povećajte razmak između slova.
            </p>
            <p>
              Kako prilagođavate postavke, tekst bi trebao postati jasniji i lakši za čitanje.
              Obratite pažnju na detalje jer male promjene mogu napraviti veliku razliku.
              Cilj je postići optimalnu čitljivost i osjetiti kako različite postavke utiču na percepciju teksta.
              Nastavite eksperimentisati dok ne postignete stanje gdje je tekst ugodan za čitanje.
            </p>
            <p className="mt-4 font-semibold">{feedback}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Alati za pristupačnost</h2>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Veličina fonta: {fontSize}px
            </label>
            <input
              type="range"
              min={10}
              max={20}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={contrast}
              onChange={(e) => setContrast(e.target.checked)}
              id="contrastToggle"
              className="accent-blue-600"
            />
            <label htmlFor="contrastToggle" className="text-sm text-gray-700">
              Visoki kontrast
            </label>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Font</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full border rounded-md p-1"
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans-serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          {/* Letter Spacing */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Razmak slova: {letterSpacing}px
            </label>
            <input
              type="range"
              min={0}
              max={4}
              step={0.5}
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Next Level */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextLevel}
            disabled={!(fontSize >= 16 && contrast && letterSpacing >= 2)}
            className={`mt-6 w-full px-4 py-2 rounded-md ${
              fontSize >= 16 && contrast && letterSpacing >= 2
                ? "bg-green-600 text-white cursor-pointer"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            Nastavi dalje
          </motion.button>
        </div>
      </div>
    </div>
    </div>
  );
}
