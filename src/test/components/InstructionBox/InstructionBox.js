// InstructionBox.js
import React from 'react';
import './InstructionBox.css';

const InstructionBox = () => {
  return (
    <div className="instruction-box">
      <p>Click on the valves to toggle them on/off.</p>
      <p>Changes will be replicated in the physical setup.</p>
    </div>
  );
};

export default InstructionBox;
