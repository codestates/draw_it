import React from 'react';
import '../styles/Palette.css';

const Palette = ({ changeLineWidth, changeBrushColor, fillCanvas }) => {
  const color = Array(12).fill(0);
  return (
    <div className="palette">
      <input
        type="range"
        min="0.1"
        max="20"
        step="0.1"
        onChange={changeLineWidth}
      />
      <div className="palette_color_picker">
        {color.map(() => (
          <div
            className="palette_color"
            onClick={changeBrushColor}
            tabIndex="0"
          />
        ))}
      </div>
      <div>
        <div className="palette_fill" onClick={fillCanvas}>
          채우기
        </div>
      </div>
    </div>
  );
};

export default Palette;
