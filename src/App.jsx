import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Videos from './pages/videos';
import Pdf from './pages/pdf';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Mechanic Bano - Bike Repair Tutorials</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/videos" style={{ marginRight: '15px' }}>Videos</Link>
          <Link to="/pdfs">PDFs</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/pdfs" element={<Pdf />} />
        </Routes>
      </div>
    </Router>
  );
}
