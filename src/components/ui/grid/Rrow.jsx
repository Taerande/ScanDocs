import React from 'react';
import './grid.css'

const Rrow = ({ children, cols }) => {
  return (
    <div className={`row row-${cols}`}>
      {children}
    </div>
  );
};

export default Rrow;