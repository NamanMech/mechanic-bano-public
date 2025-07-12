import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'; // ✅ required for Vite + pdfjs-dist@3.x

const PDFViewer = ({ url }) => {
  const canvasRef = useRef();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

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
        const viewport = page.getViewport({ scale: 1.1 });
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

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '6px', padding: '10px' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          {totalPages > 1 && (
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                ◀ Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Next ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PDFViewer;
