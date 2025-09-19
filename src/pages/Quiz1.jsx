import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Quiz1({ progress, setProgress }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  const questions = [
    { q: "Šta znači WCAG?", options: ["Web Content Accessibility Guidelines", "World Creative Accessibility Guide", "Web Color And Graphics"], answer: 0 },
    { q: "Koji element se koristi za opis slike?", options: ["alt atribut", "title atribut", "href atribut"], answer: 0 },
    { q: "Koja boja je dobra za visok kontrast teksta?", options: ["Crna na bijeloj pozadini", "Siva na bijeloj pozadini", "Plava na plavoj pozadini"], answer: 0 },
    { q: "Koja veličina fonta se preporučuje za čitljivost?", options: ["12px ili veće", "8px", "6px"], answer: 0 },
    { q: "Šta je semantički HTML?", options: ["Korištenje tagova prema značenju sadržaja", "Korištenje samo div i span tagova", "Skrivanje sadržaja u komentarima"], answer: 0 },
  ];

  // Resetuj kviz svaki put kada se komponenta mounta
  useEffect(() => {
    setScore(0);
    setCurrent(0);
    setFeedback("");
    setShowModal(false);
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;

    setFeedback(isCorrect ? "Tačno!" : "Netačno!");

    setScore(newScore);

    setTimeout(() => {
      setFeedback("");
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        // kraj kviza → pokaži modal
        setShowModal(true);
      }
    }, 800);
  };

  const handleModalOk = () => {
  setShowModal(false); // prvo zatvori modal
  setProgress(prev => ({
    ...prev,
    quiz1: true,
    quiz1Score: score,
  }));
  navigate("/roadmap"); // zatim navigiraj
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl mx-auto p-8 flex flex-col space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            Uvodni Kviz
          </h1>
          <p className="text-lg md:text-xl text-blue-800">
            Odgovorite na jednostavna pitanja kako biste započeli svoj put kroz igru.
          </p>
        </header>

        {/* Quiz Card */}
        <div className="bg-blue-50 rounded-2xl shadow-2xl border border-blue-100 p-8 w-full flex flex-col space-y-6">
          <p className="text-blue-800 font-semibold">
            Pitanje {current + 1} od {questions.length}
          </p>

          <div className="text-lg font-medium text-blue-900">{questions[current].q}</div>

          <div className="flex flex-col gap-3">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <p className="mt-2 font-semibold text-lg text-center text-blue-900">{feedback}</p>
          )}

          <p className="text-blue-700 text-center">Trenutni rezultat: {score}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blur background */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">Kviz završen!</h2>
            <p className="text-blue-800">Tačni odgovori: {score} / {questions.length}</p>
            <button
              onClick={handleModalOk}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
