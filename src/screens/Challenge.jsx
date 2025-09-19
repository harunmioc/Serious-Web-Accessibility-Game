import React, { useState } from 'react';
import '../styles/Challenge.css';
import { contrastRatio } from '../utils/colorUtils';

function Challenge() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [contrast, setContrast] = useState(null);
  const [result, setResult] = useState('');

  function calculateContrast() {
    const ratio = contrastRatio(foreground, background);
    setContrast(ratio.toFixed(2));

    if (ratio >= 7) {
      setResult('AAA');
    } else if (ratio >= 4.5) {
      setResult('AA');
    } else {
      setResult('FAIL');
    }
  }

  return (
    <div className="challenge-container">
      <div className="challenge-box">
        <h2>Testiraj kontrast boja</h2>

        <div className="color-picker-group">
          <div className="color-picker">
            <label>Boja teksta</label>
            <br />
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
            />
            <div className="color-preview">{foreground}</div>
          </div>
          <div className="color-picker">
            <label>Boja pozadine</label>
            <br />
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
            <div className="color-preview">{background}</div>
          </div>
        </div>

        <button className="test-button" onClick={calculateContrast}>
          Testiraj kontrast
        </button>

        {contrast && (
          <div className="result-box">
            <p>Kontrast odnos: <strong>{contrast}:1</strong></p>
            <p className={`result-text ${
              result === 'FAIL' ? 'error' : 'success'
            }`}>
              {result === 'AAA' && '✔ Odličan kontrast (AAA)'}
              {result === 'AA' && '✔ Dobar kontrast (AA)'}
              {result === 'FAIL' && '✘ Nedovoljan kontrast'}
            </p>
            <div
              className="preview-text"
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              Primjer teksta sa odabranim bojama
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Challenge;
