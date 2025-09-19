/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Level5({progress, setProgress }) {
  const navigate = useNavigate();
  const buttons = [
    { id: "btn1", label: "Dugme 1", size: "w-6 h-8" },
    { id: "btn2", label: "Dugme 2", size: "w-12 h-14" },
    { id: "btn3", label: "Dugme 3", size: "w-12 h-16" },
    { id: "btn4", label: "Dugme 4", size: "w-20 h-20" },
    { id: "btn5", label: "Dugme 5", size: "w-8 h-8" },
    { id: "btn6", label: "Dugme 6", size: "w-8 h-8" },
    { id: "btn7", label: "Dugme 7", size: "w-12 h-10" },
    { id: "btn8", label: "Dugme 8", size: "w-8 h-8" },
  ];

  const [clicked, setClicked] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shakyPos, setShakyPos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef(mousePos);

  // Funkcija koja provjerava da li se dva pravougaonika preklapaju
  function isOverlapping(newPos, existingPos, btnSize) {
    return existingPos.some(pos => {
      const dx = Math.abs(newPos.left - pos.left);
      const dy = Math.abs(newPos.top - pos.top);
      return dx * window.innerWidth / 100 < btnSize.width && dy * window.innerHeight / 100 < btnSize.height;
    });
  }

  // Random pozicije bez preklapanja
  const [positions] = useState(() => {
    const posArr = [];
    buttons.forEach(btn => {
      const btnWidth = parseInt(btn.size.split(" ")[0].replace("w-", "")) * 4; // aproksimacija Tailwind
      const btnHeight = parseInt(btn.size.split(" ")[1].replace("h-", "")) * 4;
      let newPos;
      let attempts = 0;
      do {
        newPos = {
          top: Math.random() * 70 + 5, // 5-75%
          left: Math.random() * 70 + 5
        };
        attempts++;
        if(attempts > 100) break; // fallback
      } while(isOverlapping(newPos, posArr, { width: btnWidth, height: btnHeight }));
      posArr.push(newPos);
    });
    return posArr;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const pos = { x: e.clientX, y: e.clientY };
      setMousePos(pos);
      mouseRef.current = pos; // uvijek drži zadnju poziciju
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame;
    let t = 0;

    const jitter = () => {
      const base = mouseRef.current;
      t += 0.07; // sporo pomjeranje
      const offsetX = Math.sin(t) * 14;
      const offsetY = Math.cos(t * 0.8) * 12;

      setShakyPos({
        x: base.x + offsetX,
        y: base.y + offsetY,
      });

      animationFrame = requestAnimationFrame(jitter);
    };

    animationFrame = requestAnimationFrame(jitter);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleClick = (id) => {
    setClicked((prev) => ({ ...prev, [id]: true }));
  };

  const total = buttons.length;
  const completed = Object.values(clicked).filter(Boolean).length;
  const progressPercent = Math.round((completed / total) * 100);
  const canProceed = completed === total;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center cursor-none">
      <div className="w-full max-w-7xl mx-auto p-8 space-y-8">
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 ">
    Level 5: Igra sa nestabilnim mišom
  </h1>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Vaš zadatak: pokušajte kliknuti sva dugmad u prostoru igre.<br></br>
    Neka dugmad su mala i teže se klikću kada miš "drhti". Ovo simulira stvarne izazove pristupačnosti kod korisnika koji imaju poteškoće sa motorikom ili preciznim kretanjem miša.  
    <br></br>
    Cilj je kliknuti <strong>sva dugmad</strong> da bi završili nivo i napredovali.  <br></br>
    Obrati pažnju: vaša dugmad se nasumično raspoređuju, a crveni pokazivač miša pokazuje kako "drhtanje" utiče na interakciju.  
    Ovim zadatkom ćete bolje razumjeti koliko veličina i pozicioniranje elemenata utiču na pristupačnost web aplikacija.
  </p>
</header>


      <div className="flex gap-6">
        {/* Main Game */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden min-h-[500px] cursor-none">
          {buttons.map((btn, index) => {
            const btnWidth = parseInt(btn.size.split(" ")[0].replace("w-", "")) * 4;
            const btnHeight = parseInt(btn.size.split(" ")[1].replace("h-", "")) * 4;
            const fontSize = Math.min(btnWidth, btnHeight) / 3; // font proporcionalan dugmetu

            return (
             <motion.button
                key={btn.id}
                onClick={() => handleClick(btn.id)}
                className={`${btn.size} flex items-center justify-center rounded-md font-medium transition-colors absolute bg-blue-600 text-white hover:bg-blue-700 hover:cursor-none`}
                style={{
                    top: `${positions[index].top}%`,
                    left: `${positions[index].left}%`,
                    fontSize: `${fontSize}px`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                >
                {clicked[btn.id] ? "OK!" : btn.label}
            </motion.button>

            );
          })}

          {/* Shaky mouse indicator */}
          <motion.div
            className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none opacity-70"
            style={{
              left: shakyPos.x,
              top: shakyPos.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Meni</h2>
          <p className="text-sm text-gray-600">
            Progres: {completed}/{total} ({progressPercent}%)
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Locked / Unlocked Next Level */}
          <motion.button
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
            disabled={!canProceed}
            onClick={() => {
              navigate("/roadmap");
              setProgress((prev) => ({ ...prev, level5: true }));
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
