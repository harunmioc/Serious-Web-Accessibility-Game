import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300 p-8">
      {/* Naslov */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 text-center"
      >
        Serious Game: Web Pristupačnost
      </motion.h1>

      {/* Podnaslov / opis */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8 max-w-2xl text-center text-lg md:text-xl text-blue-800"
      >
        Dobrodošli u interaktivni svijet <strong>web pristupačnosti</strong>!  
        Kroz ovu edukativnu igru naučit ćete kako dizajnirati web stranice koje su dostupne svima, 
        uključujući osobe sa vizuelnim i drugim poteškoćama.  
        <br></br>Osvojite bedževe, otključajte nivoe i testirajte svoje znanje kroz izazove i mini igre!
      </motion.p>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/roadmap")}
        className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 font-semibold text-lg transition-colors"
      >
        Započni igru
      </motion.button>

      {/* Dodatni vizualni elementi */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-12 text-blue-700 text-center max-w-md"
      >
        Savjet: Eksperimentišite sa svim nivoima i izazovima.  
        Svaka odluka i podešavanje može učiniti web pristupačnijim!
      </motion.div>
    </div>
  );
}
