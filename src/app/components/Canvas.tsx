import Player from '@/classes/Player';
import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Get the canvas context for drawing
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    const cr = canvasRef.current;

    // set the canvas width
    cr.width = 1024;
    cr.height = 576;

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 100, 100);

    const player = new Player(ctx, cr);
    console.log("player = ", player.height);


    function animate() {
      requestAnimationFrame(animate);

      const currentCtx = canvasRef.current?.getContext("2d");
      if(!currentCtx) return;

      currentCtx.fillStyle = 'white';
      ctx?.fillRect(0, 0, cr.width, cr.height);

      player.draw();
      player.update()

      // ctx?.clearRect(0, 0, canvasRef?.width ?? 0, canvasRef?.height ?? 0);
    }

    animate();
  }, [canvasRef]);












  return <div>
    <canvas ref={canvasRef}></canvas>
  </div>
};

export default Canvas;
