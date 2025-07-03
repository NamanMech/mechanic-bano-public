import React from 'react';
import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <motion.div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '6px solid transparent',
          borderTop: '6px solid #ff3d00',
          borderRight: '6px solid #4caf50',
          borderBottom: '6px solid #2196f3',
          borderLeft: '6px solid #ffeb3b',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
}
