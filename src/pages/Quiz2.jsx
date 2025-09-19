import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Quiz2({ progress, setProgress }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      q: "Koja je osnovna svrha visokog kontrasta u dizajnu teksta?",
      options: [
        "Olakšati čitanje korisnicima sa slabijim vidom",
        "Učiniti stranicu vizuelno privlačnijom",
        "Smanjiti veličinu fajla stranice",
        "Povećati brzinu učitavanja stranice"
      ],
      answer: 0,
    },
    {
      q: "Kako letter spacing (razmak slova) utiče na čitljivost?",
      options: [
        "Smanjuje čitljivost",
        "Nema nikakav uticaj",
        "Učini tekst zanimljivijim ali ne čitljivijim",
        "Povećava preglednost i smanjuje naprezanje očiju",
      ],
      answer: 3,
    },
    {
      q: "Koji tip daltonizma otežava razlikovanje crvene i zelene boje?",
      options: [
        "Tritanopia",
        "Protanopia",
        "Monochrome",
        "Deuteranopia"
      ],
      answer: 1,
    },
    {
      q: "Koja praksa NE poboljšava pristupačnost teksta na web stranici?",
      options: [
        "Povećanje fonta",
        "Korištenje visokog kontrasta",
        "Veći razmak slova",
        "Dodavanje animacija i svijetlih pozadinskih boja"
      ],
      answer: 3,
    },
    {
      q: "Zašto je važno testirati tekst u različitim veličinama fonta i kontrastima?",
      options: [
        "Da bi stranica izgledala modernije",
        "Da bi svi korisnici mogli lako čitati i koristiti sadržaj",
        "Da bi boje bile intenzivnije",
        "Da bi se smanjio broj klikova"
      ],
      answer: 1,
    }
  ];

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;

    setFeedback(isCorrect ? "Tačno!" : "Netačno!");

    setTimeout(() => {
      setFeedback("");
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setScore(newScore);
        setShowModal(true); // pokaži modal
      }
    }, 800);

    setScore(newScore);
  };

  const handleModalOk = () => {
    setShowModal(false);
    // Update progress ali kviz može opet biti otvoren
    setProgress(prev => ({
      ...prev,
      quiz2: true,
      quiz2Score: score
    }));
    // Reset kviza ako želiš da ga korisnik može ponovno uraditi
    setCurrent(0);
    setScore(0);
    setFeedback("");
    navigate("/roadmap");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            Kviz: Principi vizuelne pristupačnosti
          </h1>
          <p className="text-lg md:text-xl text-blue-800">
            Testirajte svoje razumijevanje pristupačnosti, boja i čitljivosti teksta.
          </p>
        </header>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full flex flex-col space-y-6">
          <p className="text-gray-700 font-semibold">
            Pitanje {current + 1} od {questions.length}
          </p>

          <div className="text-lg font-medium">{questions[current].q}</div>

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
            <p className="mt-2 font-semibold text-lg text-center">{feedback}</p>
          )}

          <p className="text-gray-600 text-center">Trenutni rezultat: {score}</p>
        </div>
      </div>

      {/* Modal sa blur pozadinom */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

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
