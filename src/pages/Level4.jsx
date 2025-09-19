import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Level4({ progress, setProgress }) {
  const navigate = useNavigate();
 
  const elements = [
    { id: "username", label: "Username", accessible: true },
    { id: "password", label: "Password", accessible: true },
    { id: "newsletter", label: "Pretplati se na newsletter", accessible: true },
    { id: "theme-radio", label: "Tema", accessible: true },
    { id: "phone", label: "Broj telefona", accessible: false },
    { id: "country", label: "Država", accessible: true },
    { id: "custom-dropdown", label: "Preferirani način kontakta", accessible: false },
    { id: "about", label: "O vama", accessible: true },
    { id: "submit", label: "Pošalji", accessible: true },
    { id: "fake-submit", label: "Pošalji povratne informacije", accessible: false },
  ];

  const [visited, setVisited] = useState(new Set());
  const [marked, setMarked] = useState({});
  const [lastKey, setLastKey] = useState(null);

  // keyboard tracking
  useEffect(() => {
    const handleKeyDown = (e) => setLastKey(e.key);
    const handleFocus = (e) => {
      const id = e.target.getAttribute("data-id");
      if (id && lastKey === "Tab" && !visited.has(id)) {
        setVisited((prev) => new Set(prev).add(id));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [lastKey, visited]);

  const handleMark = (id) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;
    if (element.accessible) {
      setMarked((prev) => ({ ...prev, [id]: "wrong" }));
    } else {
      setMarked((prev) => ({ ...prev, [id]: "correct" }));
    }
  };

   const total = elements.length;
  const totalInaccessible = elements.filter((el) => !el.accessible).length;

  const visitedAccessible = Array.from(visited).filter((id) => {
    const el = elements.find((e) => e.id === id);
    return el?.accessible;
  }).length;

  const foundInaccessible = Object.values(marked).filter((m) => m === "correct").length;

  const progressCount = visitedAccessible + foundInaccessible;
  const progressPercent = Math.round((progressCount / total) * 100);

  const allMarked = foundInaccessible === totalInaccessible;
  const canProceed = progressPercent === 100 && allMarked;


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-8xl mx-auto p-8 space-y-8">
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 ">
    Level 4: Lov tastaturom na nedostupne elemente
  </h1>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Tvoj zadatak: istraži ovaj obrazac koristeći samo tipku <kbd className="px-1 py-0.5 bg-gray-200 rounded">Tab</kbd> i pronađi elemente koji <strong>nisu dostupni preko tipkovnice</strong>.  
    Kada pronađeš takve elemente, klikni na dugme "Report" u bočnoj traci.  
    Ovim zadatkom ćeš bolje razumjeti stvarne izazove pristupačnosti i naučiti kako kreirati web aplikacije koje su jednostavne i pristupačne za sve korisnike.  
    Pazi: neki elementi su tu samo za prikaz i ne mogu se fokusirati – pronađi ih sve da bi završio nivo!
  </p>
</header>


      <div className="flex gap-6">
        {/* Main Form */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 space-y-8">
          <form className="grid grid-cols-2 gap-6">
            {/* Username */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                data-id="username"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Unesite username"
              />
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                data-id="password"
                type="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Unesite password"
              />
            </div>

            {/* Phone Number (NOT tabbable) */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Broj telefona</label>
              <div
                data-id="phone"
                tabIndex={-1}
                className="w-full p-2 border rounded-md text-gray-500"
              >
                +123 45 678 910
              </div>
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Država</label>
              <select
                data-id="country"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>USA</option>
                <option>Germany</option>
                <option>Bosnia</option>
                <option>Serbia</option>
                <option>Croatia</option>
              </select>
            </div>

            {/* Tema Radio */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Tema</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input data-id="theme-radio" type="radio" name="theme" /> Svijetla
                </label>
                <label className="flex items-center gap-2">
                  <input data-id="theme-radio" type="radio" name="theme" /> Tamna
                </label>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input data-id="newsletter" type="checkbox" /> Prijavi se na newsletter
              </label>
            </div>

            {/* Custom Dropdown (NOT tabbable) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Preferirani način kontakta</label>
              <div
                data-id="custom-dropdown"
                tabIndex={-1}
                className="p-2 border rounded-md text-gray-500"
              >
                Email ▼
              </div>
            </div>

            {/* About */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">O vama</label>
              <textarea
                data-id="about"
                rows={3}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Recite nam nešto o sebi..."
              />
            </div>

            {/* Submit */}
            <div className="col-span-1">
              <button
                data-id="submit"
                type="button"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Pošalji
              </button>
            </div>

            {/* Fake Submit (NOT tabbable) */}
            <div className="col-span-1">
              <div
                data-id="fake-submit"
                tabIndex={-1}
                className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-md text-center"
              >
                Pošalji povratne informacije
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Meni</h2>
          <p className="text-sm text-gray-600">
              Progres: {progressCount}/{total} ({progressPercent}%)
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <h3 className="font-medium mt-4">Prijavi elemente:</h3>
          <ul className="space-y-2">
            {elements.map((el) => (
              <li key={el.id} className="flex items-center justify-between gap-2">
                <span className="text-sm">{el.label}</span>
                <button
                  onClick={() => handleMark(el.id)}
                  disabled={marked[el.id]}
                  className={`px-2 py-1 text-xs rounded ${
                    marked[el.id] === "correct"
                      ? "bg-green-200 text-green-700"
                      : marked[el.id] === "wrong"
                      ? "bg-red-200 text-red-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {marked[el.id] === "correct"
                    ? "✅ Correct"
                    : marked[el.id] === "wrong"
                    ? "❌ Wrong"
                    : "Report"}
                </button>
              </li>
            ))}
          </ul>

          {/* Locked / Unlocked Next Level */}
          <motion.button
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
            disabled={!canProceed}
            onClick={() => {
              setProgress((prev) => ({ ...prev, level4: true }));
              navigate("/roadmap"); 
            }}
            className={`mt-6 w-full px-4 py-2 rounded-md ${
              canProceed
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {canProceed ? "Nastavi dalje" : "Zaključano!"}
          </motion.button>
        </div>
      </div>
    </div>
  </div>
  );
}
