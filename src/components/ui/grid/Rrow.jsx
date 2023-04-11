import React from 'react';
import './grid.css'

const Rrow = ({ children, cols, style }) => {
  return (
    <div className={`row row-${cols}`} style={style}>
      {children}
    </div>
  );
};

export default Rrow;