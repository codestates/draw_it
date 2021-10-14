import React from 'react';
import '../styles/Palette.css';

const Palette = ({ changeLineWidth, changeBrushColor, fillCanvas }) => {
  const color = Array(12).fill(0);
  return (
    <div id="palette">
      <div className="input_range">
        <h3 className="text">붓 크기 선택하기</h3>
        <input
          type="range"
          min="0.1"
          max="30"
          step="0.1"
          onChange={changeLineWidth}
        />
      </div>
      <h3 className="text">붓 컬러 선택하기</h3>
      <div className="palette_color_picker">
        {color.map((_, i) => (
          <div
            className="palette_color"
            onClick={changeBrushColor}
            tabIndex="0"
            key={i}
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
