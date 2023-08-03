import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef) return;

    // Get the canvas context for drawing
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    // Set the canvas size
    canvasRef.width = 1024; // Change this to your desired width
    canvasRef.height = 576; // Change this to your desired height

    // Draw something on the canvas (e.g., a red rectangle)
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, canvasRef.width, canvasRef.height); // Change the coordinates and size as per your requirement

  }, [canvasRef]);

  return <div>
    <canvas ref={setCanvasRef}></canvas>
  </div>
};

export default Canvas;
