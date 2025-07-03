import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ siteName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <h1>{siteName}</h1>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/videos" onClick={closeMenu}>Videos</Link>
            <Link to="/pdfs" onClick={closeMenu}>PDFs</Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <nav className="desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/pdfs">PDFs</Link>
      </nav>
    </header>
  );
}
