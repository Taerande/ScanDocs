import React from 'react';
import './grid.css'

const Rcontainer = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default Rcontainer;