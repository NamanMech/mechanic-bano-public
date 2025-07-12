import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFViewer = ({ url }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch PDF');
        const buffer = await response.arrayBuffer();
        const pdfData = new Uint8Array(buffer);

        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
      } catch (err) {
        console.error('PDF load error:', err.message);
        setError('Cannot render PDF. Please check the file link.');
      }
    };

    loadPDF();
  }, [url]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc) return;
      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.0 }); // 👈 Adjust scale if needed
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        console.error('Render error:', err.message);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage]);

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement
      ) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        textAlign: 'center',
        marginTop: '15px',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        maxWidth: '100%',
      }}
    >
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div
            style={{
              overflowX: 'auto',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              background: '#fff',
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '6px',
              }}
            />
          </div>

          {/* Page Controls */}
          {totalPages > 1 && (
            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                ◀ Prev
              </button>
              <span style={{ fontSize: '14px' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Next ▶
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <div style={{ marginTop: '10px' }}>
            <button onClick={toggleFullScreen}>
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;
