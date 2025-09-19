// Level2.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  MessageCircle,
  Share2,
  Tag,
  Check,
  X,
} from "lucide-react";

// ========================
// DROPDOWN ZA TAGOVE
// ========================
const HTML_TAGS = [
  "header",
  "nav",
  "main",
  "aside",
  "footer",
  "section",
  "article",
];

const WebpageSection = ({
  id,
  correctTag,
  selectedTag,
  onTagSelect,
  children,
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCorrect = selectedTag === correctTag;
  const isAnswered = !!selectedTag; // korisnik je bar nešto izabrao

  return (
    <div
      className={`relative group transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      <div
        className={`border-2 transition-all duration-300 ${
          !isAnswered && !isHovered
            ? "border-transparent"
            : !isAnswered && isHovered
            ? "border-blue-400 border-dashed"
            : isCorrect
            ? "border-green-500"
            : "border-red-500"
        }`}
      >
        {children}
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          !isAnswered && !isHovered
            ? "opacity-0"
            : !isAnswered && isHovered
            ? "opacity-100 bg-blue-50/80"
            : isCorrect
            ? "opacity-100 bg-green-50/80"
            : "opacity-100 bg-red-50/80"
        }`}
      >
        {(isHovered || isAnswered) && (
          <div className="relative z-50">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-all ${
                !isAnswered
                  ? "bg-white hover:bg-blue-50 border-2 border-blue-400 text-blue-700"
                  : isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span className="font-mono text-sm">
                {selectedTag ? `<${selectedTag}>` : "Select tag"}
              </span>
              {isAnswered &&
                (isCorrect ? (
                  <Check className="w-4 h-4 ml-2" />
                ) : (
                  <X className="w-4 h-4 ml-2" />
                ))}
            </button>

            {isDropdownOpen && (
              <div
                className={`absolute ${
                  id === "footer" ? "bottom-full mb-2" : "top-full mt-2"
                } left-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[140px]`}
              >
                {HTML_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      onTagSelect(id, tag);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors font-mono text-sm border-b border-gray-100 last:border-b-0"
                  >
                    &lt;{tag}&gt;
                  </button>
                ))}
              </div>
            )}

            {isAnswered && !isCorrect && (
              <div className="absolute top-full left-0 mt-2 bg-green-500 text-white px-3 py-1 rounded text-xs font-mono">
                Correct: &lt;{correctTag}&gt;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ========================
// SIMULIRANA WEB STRANICA
// ========================
const SimulatedWebpage = ({ selectedTags, onTagSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-visible relative border border-gray-200 max-w-6xl mx-auto mt-8">
      {/* Browser Chrome */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 mx-4 text-sm text-gray-600 truncate">
          https://example-blog.com/article/semantic-html
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        {/* Header */}
        <WebpageSection
          id="header"
          correctTag="header"
          selectedTag={selectedTags.header || ""}
          onTagSelect={onTagSelect}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 h-32 flex items-center relative">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-bold">TechBlog</h1>
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5" />
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </WebpageSection>

        {/* Navigation */}
        <WebpageSection
          id="nav"
          correctTag="nav"
          selectedTag={selectedTags.nav || ""}
          onTagSelect={onTagSelect}
        >
          <div className="bg-gray-50 px-8 py-3 border-b border-gray-200 flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Articles
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Tutorials
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </a>
          </div>
        </WebpageSection>

        <div className="flex">
          {/* Main */}
          <WebpageSection
            id="main"
            correctTag="main"
            selectedTag={selectedTags.main || ""}
            onTagSelect={onTagSelect}
            className="flex-1"
          >
            <div className="px-8 py-8">
              <article className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Understanding Semantic HTML: A Complete Guide
                </h2>
                <p className="text-gray-600 mb-4">
                  Semantic HTML is the backbone of accessible web development.
                </p>
                <p className="text-gray-600 mb-4">
                  Elements like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;,
                  &lt;aside&gt; and &lt;footer&gt; give meaning to the page.
                </p>
                <img
                  src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Code example"
                  className="rounded-lg w-full mb-6"
                />
                <p className="text-gray-600 mb-6">
                  This article explores why semantic tags matter.
                </p>
              </article>
            </div>
          </WebpageSection>

          {/* Sidebar */}
          <WebpageSection
            id="aside"
            correctTag="aside"
            selectedTag={selectedTags.aside || ""}
            onTagSelect={onTagSelect}
            className="w-80"
          >
            <div className="bg-gray-50 px-6 py-8 border-l border-gray-200">
              <h3 className="text-lg font-bold mb-4">Popular Articles</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>CSS Grid vs Flexbox</li>
                <li>JavaScript ES2024 Features</li>
                <li>React Performance Tips</li>
              </ul>
            </div>
          </WebpageSection>
        </div>

        {/* Footer */}
        <WebpageSection
          id="footer"
          correctTag="footer"
          selectedTag={selectedTags.footer || ""}
          onTagSelect={onTagSelect}
        >
          <div className="bg-gray-800 text-white px-8 py-6">
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-2">TechBlog</h4>
                <p className="text-gray-300">
                  Your go-to resource for web tutorials and news.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Quick Links</h4>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </WebpageSection>
      </div>
    </div>
  );
};

// ========================
// LEVEL 2
// ========================
const Level2 = ({ progress, setProgress }) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState({});

  const correctTagMap = {
    header: "header",
    nav: "nav",
    main: "main",
    aside: "aside",
    footer: "footer",
  };

  const handleTagSelect = (sectionId, tag) => {
    setSelectedTags((prev) => ({ ...prev, [sectionId]: tag }));
  };

  const allCorrect =
    Object.keys(correctTagMap).every(
      (key) => selectedTags[key] === correctTagMap[key]
    );

  useEffect(() => {
  if (allCorrect && !progress.level2) {
    setProgress((prev) => ({ ...prev, level2: true }));
  }
}, [allCorrect, progress.level2, setProgress]);

  return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-8 space-y-8">
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 ">
        Level 2: Uloga Semantičkih HTML Tagova
      </h1>
     <p className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-4">
  U ovom nivou naučit ćete kako se koriste <span className="font-bold">semantički HTML tagovi</span> da bi se jasno
  označili različiti dijelovi web stranice.
  <br /><br />
  Semantički tagovi kao što su 
  <code className="bg-gray-200 px-1 rounded font-mono">&lt;header&gt;</code>, 
  <code className="bg-gray-200 px-1 rounded font-mono">&lt;nav&gt;</code>, 
  <code className="bg-gray-200 px-1 rounded font-mono">&lt;main&gt;</code>, 
  <code className="bg-gray-200 px-1 rounded font-mono">&lt;aside&gt;</code> i 
  <code className="bg-gray-200 px-1 rounded font-mono">&lt;footer&gt;</code> 
  daju smisao strukturi stranice i pomažu korisnicima i pretraživačima da bolje 
  razumiju njen sadržaj.
  <br /><br />
  Vaš zadatak je da kliknete na označene dijelove web stranice i odaberete
  odgovarajući HTML tag za svaki od njih. Ako odaberete <span className="font-bold">tačan tag</span>, dio će biti
  označen zeleno, a ako pogriješite, vidjet ćete tačan odgovor kako bi mogli učiti
  iz greške.
  <br /><br />
  Kada tačno označite sve dijelove, nivo će biti završen i moći ćete preći dalje.
</p>

    </header>

    {allCorrect && (
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/roadmap")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
        Nastavi dalje
        </button>
      </div>
    )}

    <SimulatedWebpage
      selectedTags={selectedTags}
      onTagSelect={handleTagSelect}
    />
  </div>
</div>
);
};

export default Level2;
