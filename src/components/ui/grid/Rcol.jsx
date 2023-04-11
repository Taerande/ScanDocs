import React from 'react';
import './grid.css';

const Rcol = ({ children, cols, style }) => {
  return (
    <div className={`col col-${cols}`} style={style}>
      {children}
    </div>
  );
};

export default Rcol;