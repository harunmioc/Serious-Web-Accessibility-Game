import React, { useState } from 'react';

const GameUI = () => {
  const [theme, setTheme] = useState('electricBlue'); // default theme

  const themes = {
    ruiner: {
      background: '#1a1a1a',
      primary: '#ff0000',
      secondary: '#660000',
      accent: '#ff6666',
    },
    electricBlue: {
      background: '#0a0a0a',
      primary: '#00bfff',
      secondary: '#1e90ff',
      accent: '#87cefa',
    },
    funTimesPink: {
      background: '#ffe6f1',
      primary: '#ff69b4',
      secondary: '#ff1493',
      accent: '#ffb6c1',
    },
  };

  const currentTheme = themes[theme];

  return (
    <div style={{ backgroundColor: currentTheme.background, color: currentTheme.primary }}>
      <h1>Dobrodošli u igru!</h1>
      <button
        style={{
          backgroundColor: currentTheme.secondary,
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={() => setTheme(theme === 'ruiner' ? 'electricBlue' : theme === 'electricBlue' ? 'funTimesPink' : 'ruiner')}
      >
        Promeni temu
      </button>
      <div style={{ marginTop: '20px' }}>
        <p>Trenutna tema: {theme}</p>
        <p>Ova tema koristi boje: {JSON.stringify(currentTheme)}</p>
      </div>
    </div>
  );
};

export default GameUI;
