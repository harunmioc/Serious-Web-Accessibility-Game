import React, { useState, useEffect } from 'react';
import { Search, Menu, User, ShoppingCart, Star, Bold } from 'lucide-react';
import colorBlind from 'color-blind';
import { useNavigate } from 'react-router-dom';

const visionModes = [
  { id: 'normal', name: 'Normal', description: 'Standardna vizija bez nedostataka u boji ili problemima s kontrastom.' },
  { id: 'protanopia', name: 'Protanopia', description: 'Crveno-zeleni daltonizam: poteškoće u razlikovanju crvenih tonova.' },
  { id: 'deuteranopia', name: 'Deuteranopia', description: 'Crveno-zeleni daltonizam: poteškoće u razlikovanju zelenih tonova.' },
  { id: 'tritanopia', name: 'Tritanopia', description: 'Plavo-žuti daltonizam: poteškoće u razlikovanju plavih tonova.' },
  { id: 'low-contrast', name: 'Nizak kontrast', description: 'Smanjeni kontrast čini tekst i elemente težim za vidjeti.' },
  { id: 'monochrome', name: 'Monohromatski', description: 'Sve boje izgledaju kao nijanse sive.' },
];

const allModes = visionModes.map(mode => mode.id);

const issues = [
  {
    id: 'header-contrast',
    label: 'Tekst u zaglavlju',
    description: {
      normal: 'Bijeli tekst na tamnosivoj (#1f2937) pozadini je jasan i čitljiv.',
      protanopia: 'Tamnosiva pozadina i bijeli tekst ostaju čitljivi, ali crveni tonovi u ikonama (ako ih ima) mogu se činiti mutnijim.',
      deuteranopia: 'Pozadina i tekst i dalje su vidljivi, ali zelenkasti tonovi (ako se pojave) se gube ili stapaju.',
      tritanopia: 'Tamnoplava pozadina može dobiti sivkasto zelenkasti ton, tekst ostaje bijel i čitljiv.',
      'low-contrast': 'Tamnosiva i bijela kombinacija gubi dio kontrasta, tekst je nešto teže čitljiv za osobe s nižim kontrastom.',
      monochrome: 'Sve boje postaju nijanse sive, pa tekst i pozadina su i dalje kontrastni, ali boje ikona se stapaju u sive tonove.',
    }
  },
  {
    id: 'nav-contrast',
    label: 'Navigacijski linkovi',
    description: {
      normal: 'Bijeli tekst linkova na tamnosivoj (#1f2937) pozadini je jasan i lako čitljiv.',
      protanopia: 'Linkovi ostaju vidljivi, ali plava boja Menija može izgledati tamnije ili mutnije.',
      deuteranopia: 'Bijeli linkovi i tamnosiva pozadina su čitljivi, plavi ton Menija može izgubiti nijansu.',
      tritanopia: 'Plava ikona i bijeli tekst ostaju vidljivi, ali plava može izgledati zelenkasto ili sivo-plavo.',
      'low-contrast': 'Tamnosiva i bijeli tekst su još uvijek čitljivi, ali kontrast se smanjuje, teže je uočiti detalje.',
      monochrome: 'Sve se pretvara u sive tonove, linkovi i ikone ostaju vidljivi zbog kontrasta svijetlo-tamno.',
    }
  },
  {
    id: 'price-contrast',
    label: 'Cijena proizvoda',
    description: {
      normal: 'Zelena cijena (#059669) na bijeloj pozadini je lako uočljiva i privlači pažnju.',
      protanopia: 'Zelena boja može izgledati tamnije ili smeđe, ali i dalje je čitljiva na bijeloj pozadini.',
      deuteranopia: 'Zelena cijena može se stapati sa bijelom pozadinom, postaje manje uočljiva.',
      tritanopia: 'Zelena ostaje vidljiva, ali oslanjanje samo na boju za isticanje je rizično.',
      'low-contrast': 'Smanjeni kontrast čini cijenu manje uočljivom, ali tekst ostaje čitljiv.',
      monochrome: 'Zelena postaje siva, kontrast s bijelom pozadinom se smanjuje, cijena je teže uočljiva.',
    }
  },
  {
    id: 'warning-contrast',
    label: 'Poruka upozorenja',
    description: {
      normal: 'Crvena poruka (#991b1b ili #fecaca) jasno označava upozorenje.',
      protanopia: 'Crvena može izgledati smeđe, ali tekst ostaje čitljiv, signal upozorenja je slabiji.',
      deuteranopia: 'Crvena se može činiti tamnijom ili mutnom, tekst se i dalje vidi, ali signal upozorenja je slabiji.',
      tritanopia: 'Crvena poruka može biti izblijedjela, znak upozorenja postaje manje upečatljiv.',
      'low-contrast': 'Smanjeni kontrast otežava čitanje poruke i smanjuje osjećaj hitnosti.',
      monochrome: 'Crvena postaje siva i može se stopiti s drugim elementima, poruka je manje uočljiva.',
    }
  },
  {
    id: 'button-contrast',
    label: 'Glavno dugme',
    description: {
      normal: 'Plavo dugme (#2563eb) sa bijelim tekstom je jasno i prepoznatljivo.',
      protanopia: 'Plava boja može izgledati prigušeno, dugme je i dalje vidljivo ali manje upečatljivo.',
      deuteranopia: 'Dugme gubi malo intenzitet plave, tekst ostaje čitljiv.',
      tritanopia: 'Plavo dugme može izgledati zelenkasto ili sivo-plavo, ali je prepoznatljivo.',
      'low-contrast': 'Kontrast se smanjuje, dugme se malo stapa s pozadinom.',
      monochrome: 'Plava postaje siva, dugme je i dalje vidljivo zbog svjetline teksta i pozadine.',
    }
  },
  {
    id: 'secondary-button',
    label: 'Sekundarno dugme',
    description: {
      normal: 'Dugme sa plavim obrubom (#3b82f6) i bijelim tekstom je vidljivo i jasno definisano.',
      protanopia: 'Plavi obrub može izgledati mutno, tekst ostaje čitljiv.',
      deuteranopia: 'Plava linija i bijeli tekst se stapaju s pozadinom, dugme je manje upečatljivo.',
      tritanopia: 'Plava linija može izgledati zelenkasto ili sivo, dugme je i dalje prepoznatljivo.',
      'low-contrast': 'Smanjen kontrast čini dugme manje uočljivim.',
      monochrome: 'Sve postaje sive nijanse, dugme se razlikuje uglavnom po svjetlini obruba i teksta.',
    }
  },
  {
    id: 'newsletter-contrast',
    label: 'Newsletter kutija',
    description: {
      normal: 'Tamnozelena pozadina (#059669) sa bijelim tekstom je čitljiva i ugodna za oko.',
      protanopia: 'Pozadina može izgledati tamno smeđe, tekst ostaje čitljiv.',
      deuteranopia: 'Tamnozelena pozadina može izgubiti ton, ali tekst ostaje vidljiv.',
      tritanopia: 'Zelena ostaje vidljiva, ali može izgledati drugačije od originala.',
      'low-contrast': 'Smanjeni kontrast otežava čitanje bijelog teksta.',
      monochrome: 'Sve boje postaju sive, ali tekst ostaje kontrastan prema pozadini.',
    }
  },
  {
    id: 'newsletter-button',
    label: 'Dugme za prijavu',
    description: {
      normal: 'Bijelo dugme sa plavim tekstom (#2563eb) je jasno i uočljivo.',
      protanopia: 'Plavi tekst može izgledati mutno, dugme je i dalje čitljivo.',
      deuteranopia: 'Plavi tekst gubi ton, ali kontrast s bijelom pozadinom ostaje dovoljan.',
      tritanopia: 'Plavi tekst može izgledati prigušeno ili zelenkasto, dugme ostaje vidljivo.',
      'low-contrast': 'Smanjeni kontrast čini tekst manje uočljivim.',
      monochrome: 'Sve boje postaju sive, dugme je čitljivo zahvaljujući svjetlini teksta.',
    }
  },
];



const allIssues = issues.map(issue => issue.id);

function getSimulatedColor(color, mode) {
  if (mode === 'normal') return color;

  const namedColors = {
    'white': '#ffffff', 'black': '#000000',
    'blue-600': '#2563eb', 'blue-500': '#3b82f6',
    'green-600': '#059669',
    'yellow-400': '#facc15',
    'gray-800': '#1f2937', 'gray-600': '#4b5563',
    'red-800': '#991b1b', 'red-200': '#fecaca',
  };

  const hex = namedColors[color] || color;

  if (mode === 'low-contrast') {
    const toGrayscale = c => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      const factor = 0.5;
      const newLum = lum * factor + 0.5 * (1 - factor);
      const newColor = Math.round(newLum * 255);
      return '#' + newColor.toString(16).padStart(2, '0').repeat(3);
    };
    return toGrayscale(hex);
  }
  if (mode === 'monochrome') return colorBlind.achromatopsia(hex);

  return colorBlind[mode](hex);
}

export const Level3 = ({ progress, setProgress }) => {
  const [selectedMode, setSelectedMode] = useState('normal');
  const [educationalText, setEducationalText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [revealedIssues, setRevealedIssues] = useState(new Set());
  const [visitedModes, setVisitedModes] = useState(new Set());
    const navigate = useNavigate();

  useEffect(() => {
    setEducationalText('');
    setShowHint(false);
  }, [selectedMode]);

  const handleModeChange = (modeId) => {
    setSelectedMode(modeId);
    setVisitedModes(prev => new Set(prev).add(modeId));
  };

  const isNextLevelUnlocked = () => {
    const nonNormalModes = allModes.filter(modeId => modeId !== 'normal');
    return nonNormalModes.every(modeId => visitedModes.has(modeId));
  };
  
  const revealIssue = (issueId) => {
    const issue = issues.find(i => i.id === issueId);
    setEducationalText(
      `Problem "${issue.label}"\n${issue.description[selectedMode] || issue.description['normal']}`
    );
    if (selectedMode !== 'normal' && !revealedIssues.has(issueId)) {
        setRevealedIssues(prev => new Set(prev).add(issueId));
    }
  };

  const getElementColor = (defaultColor) => {
    return getSimulatedColor(defaultColor, selectedMode);
  };
  
  const issuesInCurrentMode = selectedMode === 'normal'
    ? []
    : allIssues.filter(issueId => {
        const issue = issues.find(i => i.id === issueId);
        return issue.description[selectedMode] !== issue.description['normal'];
    });

  const unrevealedIssuesInMode = issuesInCurrentMode
    .filter(issueId => !revealedIssues.has(issueId))
    .map(issueId => issues.find(i => i.id === issueId));
    

  return (
     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full  mx-auto p-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            Level 3: Vizuelna Pristupačnost
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-4">
            U ovom nivou ćete otkriti kako web stranica izgleda osobama sa različitim
            oblicima <span className="font-bold">daltonizma</span> ili kada je <span className="font-bold">kontrast</span> smanjen.
            <br /><br />
            Vaš zadatak je da pažljivo pregledate stranicu u svim ponuđenim modovima
            i pronađete elemente koji nisu dovoljno jasni ili bi mogli stvarati problem
            u čitanju i korištenju stranice. Kliknite na te elemente i označite ih kao
            problematične.
            <br /><br />
            Pokušajte pronaći sve skrivene izazove i edukujte se o pristupačnosti kroz objašnjenja sa strane.
            Kada posjetite sve modove i otkrijete sve probleme, moći ćete preći na sljedeći nivo!
          </p>
        </header>

      <div className="flex space-x-8 w-full">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex-1 w-full">
          {/* Header */}
          <div
            className="px-8 py-6 flex items-center justify-between"
            style={{
              background: getElementColor('#1f2937'),
              color: getElementColor('#ffffff'),
              cursor: selectedMode !== 'normal' ? 'pointer' : 'default',
            }}
            onClick={selectedMode !== 'normal' ? () => revealIssue('header-contrast') : undefined}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">TechStore</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5" />
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* Navigation */}
          <div
            className="px-8 py-4 border-b border-gray-200 flex space-x-8 items-center cursor-pointer"
            style={{
              background: getElementColor('#1f2937'),
              color: getElementColor('#ffffff'),
            }}
            onClick={selectedMode !== 'normal' ? () => revealIssue('nav-contrast') : undefined}
          >
            <Menu className="w-5 h-5" />
            {['Početna', 'Proizvodi', 'O nama', 'Kontakt'].map((link) => (
              <span key={link} className="font-medium">{link}</span>
            ))}
          </div>

          {/* Main Content */}
          <div className="px-8 py-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <img
                src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Laptop computer"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Laptop Pro</h2>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4" style={{ color: getSimulatedColor('#facc15', selectedMode) }} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(128 recenzija)</span>
              </div>

              <div className="mb-4">
                <span
                  className="text-3xl font-bold cursor-pointer"
                  style={{ color: getElementColor('#059669') }}
                  onClick={selectedMode !== 'normal' ? () => revealIssue('price-contrast') : undefined}
                >
                  $1,299
                </span>
                <span className="text-lg text-gray-500 line-through ml-2">$1,599</span>
              </div>

              <div
                className="p-3 rounded-lg mb-4 cursor-pointer"
                style={{
                  background: getSimulatedColor('#fecaca', selectedMode),
                  border: `2px solid ${getElementColor('#fecaca')}`,
                  color: getElementColor('#991b1b'),
                }}
                onClick={selectedMode !== 'normal' ? () => revealIssue('warning-contrast') : undefined}
              >
                <p className="text-sm font-medium">Još samo 3 komada na stanju!</p>
              </div>

              <div className="flex space-x-4">
                <button
                  className="px-6 py-3 rounded-lg font-medium cursor-pointer"
                  style={{
                    background: getElementColor('#2563eb'),
                    color: getElementColor('#ffffff'),
                  }}
                  onClick={selectedMode !== 'normal' ? () => revealIssue('button-contrast') : undefined}
                >
                  Dodaj u korpu
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium cursor-pointer"
                  style={{
                    border: `2px solid ${getElementColor('#3b82f6')}`,
                    color: getElementColor('#3b82f6'),
                  }}
                  onClick={selectedMode !== 'normal' ? () => revealIssue('secondary-button') : undefined}
                >
                  Sačuvaj za kasnije
                </button>
              </div>

              {/* Newsletter */}
              <div
                className="mt-6 p-4 rounded-lg cursor-pointer"
                style={{ background: getElementColor('#059669') }}
                onClick={selectedMode !== 'normal' ? () => revealIssue('newsletter-contrast') : undefined}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: getElementColor('#ffffff') }}>
                  Newsletter
                </h3>
                <p className="text-sm mb-4" style={{ color: getElementColor('#ffffff') }}>
                  Primajte najnovije ponude i vijesti iz svijeta tehnologije!
                </p>
                <input 
                  type="email" 
                  placeholder="Unesite vašu e-mail adresu" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
                  style={{ color: getElementColor('#1f2937') }}
                />
                <button
                  className="w-full py-2 rounded-md text-sm font-medium cursor-pointer"
                  style={{
                    background: getElementColor('#ffffff'),
                    color: getElementColor('#2563eb'),
                  }}
                  onClick={selectedMode !== 'normal' ? () => revealIssue('newsletter-button') : undefined}
                >
                  Pretplati se
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Panel */}
        <div className="w-96 p-6 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Odaberite mod vizije</h3>
              <div className="mb-4 p-3 rounded bg-gray-50 border border-gray-200 text-sm">
    <b>{visionModes.find(m => m.id === selectedMode)?.name}:</b>
    <br />
    {visionModes.find(m => m.id === selectedMode)?.description}
  </div>
              <p className="text-gray-600 mb-4 text-sm">*Normalni mod je osnovni nivo i on nema problema za otkrivanje.</p>
              <div className="flex flex-wrap gap-2">
                {visionModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
                    className={`px-3 py-1 rounded-md font-medium text-sm transition-all duration-300 ${
                      selectedMode === mode.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    } ${visitedModes.has(mode.id) ? 'border-2 border-green-500' : ''}`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>
            
            <hr className="border-t border-gray-200" />
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Pronađeni problemi</h3>
              <div className="space-y-2">
                {revealedIssues.size === 0 && (
                  <div className="text-gray-500 text-sm">Kliknite na elemente na stranici da biste otkrili probleme.</div>
                )}
                {[...revealedIssues].map((issueId) => {
                  const issue = issues.find(i => i.id === issueId);
                  return (
                    <div key={issueId} className="w-full text-left p-3 rounded-lg border border-gray-300 bg-gray-50">
                      {issue.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-t border-gray-200" />

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Edukacija</h3>
              <div className="p-4 rounded-lg bg-gray-50 min-h-[120px] whitespace-pre-line text-sm border border-gray-200">
                {educationalText || 'Kliknite na element kako biste vidjeli zašto je to problem.'}
              </div>
            </div>

            <button
              className="mt-4 w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors duration-200"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Sakrij savjete' : 'Prikaži savjete'}
            </button>
            {showHint && (
              <div className="mt-2 p-3 border rounded-lg bg-gray-100 text-sm">
                <b>Neotkriveni problemi u ovom modu:</b>
                <br/>
                {selectedMode === 'normal'
                  ? 'U normalnom modu nema problema s pristupačnošću.'
                  : unrevealedIssuesInMode.map(i => i.label).join(', ') || 'Svi problemi u ovom modu su otkriveni!'}
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              className={`w-full py-3 rounded-md font-bold text-lg transition-all duration-300 ${
                isNextLevelUnlocked() ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isNextLevelUnlocked()}
              onClick={() => {
                if (isNextLevelUnlocked()) {
                  setTimeout(() => setProgress(prev => ({ ...prev, level3: true })), 0);
                  navigate("/roadmap"); 
                }
              }}
            >
              Nastavi dalje
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
);
};