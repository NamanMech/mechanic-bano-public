// src/components/Spinner.jsx 

import React from 'react';

export default function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="loader"></div>
    </div>
  );
}
