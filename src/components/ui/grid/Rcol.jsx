import React from 'react';
import './grid.css';

const Rcol = ({ children, cols }) => {
  return (
    <div className={`col col-${cols}`}>
      {children}
    </div>
  );
};

export default Rcol;