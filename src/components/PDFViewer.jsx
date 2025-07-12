import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js';

const PDFViewer = ({ url }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('PDF fetch failed');
        const buffer = await res.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setPage(1);
      } catch (err) {
        setError('Failed to render PDF.');
        console.error(err.message);
      }
    };

    fetchPDF();
  }, [url]);

  useEffect(() => {
    const render = async () => {
      if (!pdfDoc) return;
      const pageObj = await pdfDoc.getPage(page);
      const viewport = pageObj.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await pageObj.render({ canvasContext: context, viewport }).promise;
    };

    render();
  }, [pdfDoc, page]);

  const enterFull = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div ref={containerRef} style={{ textAlign: 'center' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', border: '1px solid #ccc', borderRadius: '8px' }} />
      
      {totalPages > 1 && (
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>◀</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>▶</button>
        </div>
      )}

      <div style={{ marginTop: '8px' }}>
        <button onClick={enterFull}>Enter Fullscreen</button>
      </div>
    </div>
  );
};

export default PDFViewer;
