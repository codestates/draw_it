import React from 'react';
import '../styles/Palette.css';

const Palette = ({ changeLineWidth, changeBrushColor }) => {
  return (
    <div className="palette">
      <input
        type="range"
        min="0.1"
        max="7"
        step="0.1"
        onChange={changeLineWidth}
      />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
      <button className="palette_color" onClick={changeBrushColor} />
    </div>
  );
};

export default Palette;
