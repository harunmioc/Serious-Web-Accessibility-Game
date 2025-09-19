import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/sportWebsite.jpg";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import logo from "../assets/logo.jpg";
import product3 from "../assets/product3.jpg";
import sportTeam from "../assets/sportTeam.jpg";

const imagesDataInitial = [
  { id: 1, src: hero, type: "hero", alt: "", completed: false },
  { id: 2, src: product1, type: "jacket", alt: "", completed: false },
  { id: 3, src: product2, type: "sneakers", alt: "", completed: false },
  { id: 4, src: logo, type: "logo", alt: "", completed: false },
  { id: 5, src: product3, type: "backpack", alt: "", completed: false },
  { id: 6, src: sportTeam, type: "team", alt: "", completed: false }
];

const keywords = {
  hero: ["ilustracija", "sajt", "web", "internet", "stranica", "online", "kupovina", "prodaja", "sportska", "oprema", "trgovina", "shop", "sport", "e-commerce", "naslovna", "banner", "digitalna", "platforma", "hero", "sekcija", "vizual", "reklama", "sportski shop", "trgovina opreme", "web sajt", "stranica za kupovinu", "proavnica"],
  jacket: ["jakna", "crvena jakna", "bomber", "bomber jakna", "sportska jakna", "zimska jakna", "proljetna jakna", "kaput", "odjeća", "odjeca", "odjevni artikl", "kapuljača", "hoodie", "duks", "outdoor jakna", "moderna jakna", "stil", "karirana", "karirani dezen", "unutrašnjost karirana", "unutra karirano", "unutrašnja postava", "unutrašnja tkanina", "postava", "dva džepa", "džepovi sa strane", "dva bočna džepa", "bočni džepovi", "zatvarač", "zip", "zatvaranje zipom", "moda", "fashion", "garderoba", "muška jakna", "ženska jakna", "sportswear", "streetwear"],
  sneakers: ["patike", "tenisice", "adidas", "adidas patike", "bijele patike", "sportske patike", "trkačke patike", "running shoes", "obuća", "sportske cipele", "obuca", "udobne patike", "moderni dizajn", "lagane patike", "bijele tenisice", "bijela boja", "gumeni đon", "trčanje", "sport", "outdoor", "asfalt", "beton", "betonska podloga", "trening", "atletske patike", "casual stil", "vezice", "vezana obuća", "sportski brend", "markirane patike", "adidas obuća"],
  logo: ["", "amazon", "amazon logo", "logotip", "oznaka", "brand", "brend", "marka", "logo kompanije", "simbol", "ikonica", "poznati logo", "prepoznatljiv logo", "trgovina", "online trgovina", "internet shop", "web shop", "kupovina", "prodaja", "korporacija", "firma", "digitalni logo", "crni natpis", "narandžasta strelica", "osmijeh", "strelica ispod", "slovo a", "tekstualni logo"],
  backpack: ["ruksak", "plavi ruksak", "planinarski ruksak", "sportski ruksak", "torba", "ranac", "outdoor torba", "kamp ruksak", "kamp torba", "putni ruksak", "džepovi", "bočni džepovi", "zatvarač", "zip zatvarač", "zipper", "veliki ruksak", "kapacitet", "naramenice", "ergonomske naramenice", "udobne naramenice", "vezice", "vezice preko ruksaka", "zatezne trake", "kompresione trake", "sportska torba", "oprema za planinarenje", "outdoor oprema", "izdržljiv", "otporan", "šator", "kamp oprema"],
  team: ["tim", "sportski tim", "ekipa", "sportisti", "igraci", "muškarci", "četiri muškarca", "američki fudbal", "ragbi", "ragbi lopta", "lopta u rukama", "plavi dresovi", "dresovi", "uniforme", "igralište", "teren", "stadion", "grupa sportista", "zajedno", "zajednica", "tim u plavom", "mladi sportisti", "prijatelji", "takmičenje", "trening", "sportski događaj", "grupna fotografija", "zajedništvo", "sport", "energija", "snaga", "momčad", "fudbalski tim"]
};

// eslint-disable-next-line no-unused-vars
const Level1 = ({ progress, setProgress }) => {
  const [images, setImages] = useState(imagesDataInitial);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const saveAlt = (id, text, type) => {
    const requiredKeywords = keywords[type];
    const isValid = requiredKeywords.some((kw) => text.toLowerCase().includes(kw));

    if (!isValid) {
      setError((prev) => ({ ...prev, [id]: "ALT tekst nije dovoljno opisan. Pokušajte dodati ključne riječi." }));
      return;
    }

    const updated = images.map((img) =>
      img.id === id ? { ...img, alt: text, completed: true } : img
    );

    setImages(updated);
    setError((prev) => ({ ...prev, [id]: "" }));

    if (updated.every((img) => img.completed)) {
      setProgress((prev) => ({ ...prev, level1: true }));
    }
  };

  const allCompleted = images.every((img) => img.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-8 space-y-8">
        <header className="text-center space-y-4 max-w-4xl mx-auto">
  <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
    Level 1: Opisivanje slika pomoću ALT teksta
  </h1>

  <div className="text-gray-700 text-lg md:text-xl space-y-4">
    <p>
      ALT tekst (<span className="font-semibold">alternative text</span>) opisuje sadržaj slike i omogućava 
      korisnicima sa oštećenjem vida, kao i čitačima ekrana, da razumiju šta se nalazi na slici.
    </p>

    <ul className="list-disc list-inside space-y-1">
      <li>Svaka slika treba da ima <span className="font-semibold">jasan, kratak i precizan opis</span>.</li>
      <li>Opis mora sadržavati <span className="font-semibold">ključne riječi</span> koje najbolje predstavljaju ono što se vidi.</li>
      <li>Ako je slika <span className="italic">dekorativna (npr. logo)</span>, ALT tekst može ostati prazan (<code>alt=""</code>).</li>
    </ul>

    <p className="font-medium">
      Kada unesete ALT tekst za sve slike i one budu validirane, nivo će biti završen!
    </p>
  </div>
</header>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-64 object-contain border rounded-md mb-3"
              />
              <input
                type="text"
                placeholder="Unesite ALT tekst..."
                value={img.alt}
                onChange={(e) => {
                  const text = e.target.value;
                  setImages((prev) =>
                    prev.map((i) => (i.id === img.id ? { ...i, alt: text } : i))
                  );
                }}
                onBlur={(e) => saveAlt(img.id, e.target.value, img.type)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              {error[img.id] && <p className="text-red-600 mt-2 font-medium">{error[img.id]}</p>}
              {img.completed && <p className="text-green-600 mt-2 font-semibold animate-pulse">✅ ALT tekst validiran!</p>}
            </div>
          ))}
        </div>

        {/* Dugme na dnu, centrirano ispod svih slika */}
        <div className="w-full flex justify-center mt-12">
          <button
            onClick={() => navigate("/roadmap")}
            disabled={!allCompleted}
            className={`w-full max-w-md px-6 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300
              ${allCompleted ? "bg-green-600 hover:bg-green-500 cursor-pointer shadow-lg" : "bg-gray-400 cursor-not-allowed opacity-70"}`}
          >
            Nastavi dalje
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level1;
