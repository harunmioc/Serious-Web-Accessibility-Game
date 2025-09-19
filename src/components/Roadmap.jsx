import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import badgeQuiz1 from "../assets/badgeQuiz1.png";
import badge1 from "../assets/badge1.png";
import badge2 from "../assets/badge2.png";
import badge3 from "../assets/badge3.png";
import badge4 from "../assets/badge4.png";
import badge5 from "../assets/badge5.png";
import badge6 from "../assets/badge6.png";
import badgeQuiz2 from "../assets/badgeQuiz2.png";

export default function Roadmap({ progress }) {
  const navigate = useNavigate();

  console.log(progress);
  const steps = [
    { id: "quiz1", title: "Kviz 1", completed: progress.quiz1, badge: badgeQuiz1, path: "/quiz1" },
    { id: 1, title: "Level 1: ALT Tekst", completed: progress.level1, badge: badge1, path: "/level1" },
    { id: 2, title: "Level 2: Semantički HTML", completed: progress.level2, badge: badge2, path: "/level2" },
    { id: 3, title: "Level 3: Vizuelna pristupačnost", completed: progress.level3, badge: badge3, path: "/level3" },
    { id: 4, title: "Level 4: Lov tastaturom", completed: progress.level4, badge: badge4, path: "/level4" },
    { id: 5, title: "Level 5: Nestabilni miš", completed: progress.level5, badge: badge5, path: "/level5" },
    { id: 6, title: "Level 6: Slab vid", completed: progress.level6, badge: badge6, path: "/level6" },
    { id: "quiz2", title: "Kviz 2", completed: progress.quiz2, badge: badgeQuiz2, path: "/quiz2" },
  ];

  const isUnlocked = (index) => {
    if (index === 0) return true;
    return steps[index - 1].completed;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-300 p-8">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 text-center"
      >
        Vaši bedževi i napredak kroz nivoe
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 justify-center items-center w-full max-w-6xl">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`w-36 h-36 rounded-full overflow-hidden border-4 shadow-lg relative ${
                step.completed ? "border-green-500" : "border-gray-300"
              }`}
            >
              <img
                src={step.badge}
                alt={`Bedž za ${step.title}`}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  step.completed ? "filter-none scale-105 animate-pulse" : "filter grayscale scale-95"
                }`}
              />
              {step.completed && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </motion.div>

            <p className="mt-3 font-semibold text-lg md:text-xl text-blue-900 text-center">{step.title}</p>

            <motion.button
              whileHover={{ scale: isUnlocked(index) ? 1.05 : 1, backgroundColor: isUnlocked(index) ? "#2563eb" : undefined }}
              whileTap={{ scale: isUnlocked(index) ? 0.95 : 1 }}
              onClick={() => navigate(step.path)}
              disabled={!isUnlocked(index)}
              className={`mt-3 px-6 py-3 rounded-xl text-white font-semibold w-40 transition-all duration-300
                ${isUnlocked(index) ? "bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-md" : "bg-gray-400 cursor-not-allowed opacity-70"}`}
            >
              {isUnlocked(index) ? "Otvori" : "Zaključano"}
            </motion.button>
          </div>
        ))}
      </div>

      {steps.every((s) => s.completed) && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-col items-center"
        >
          <p className="text-green-600 font-bold text-3xl mb-6 animate-pulse">
            Čestitamo! Završili ste sve nivoe i kvizove!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/final")}
            className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-2xl shadow-xl transition-all duration-300"
          >
            Pogledaj završni bedž! 
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
