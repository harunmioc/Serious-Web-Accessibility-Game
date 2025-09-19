import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import finalBadge from "../assets/finalBadge.png";

export default function Final({ progress }) {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Izračun ukupnog score-a iz oba kviza
  const totalScore = (progress.quiz1Score || 0) + (progress.quiz2Score || 0);

  useEffect(() => {
    // Pokreće animaciju kada se stranica učita
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Čestitamo!</h1>
      <p className="text-lg mb-4 text-center">
        Završili ste sve nivoe i kvizove. Pogledajte svoj završni bedž i ukupni rezultat!
      </p>

      <div
        className={`w-48 h-48 mb-6 transition-transform duration-1000 ${
          animate ? "scale-100 rotate-0" : "scale-0 rotate-[-360deg]"
        }`}
      >
        <img src={finalBadge} alt="Final Badge" className="w-full h-full object-contain" />
      </div>

      <p className="text-xl font-semibold mb-2">
        Ukupan score na kvizovima: {totalScore} / 10
      </p>

      <button
        onClick={() => navigate("/roadmap")}
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
      >
        Nazad na roadmap
      </button>
    </div>
  );
}
