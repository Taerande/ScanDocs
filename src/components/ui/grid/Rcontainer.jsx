import React from 'react';
import './grid.css'

const Rcontainer = ({ children, style }) => {
  return (
    <div className="container" style={style}>
      {children}
    </div>
  );
};

export default Rcontainer;