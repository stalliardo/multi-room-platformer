import Player from '@/classes/Player';
import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keys = {
    w: {
      pressed: false
    },
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
  }

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

    function animate() {
      requestAnimationFrame(animate);

      const currentCtx = canvasRef.current?.getContext("2d");
      if (!currentCtx) return;

      currentCtx.fillStyle = 'white';
      ctx?.fillRect(0, 0, cr.width, cr.height);

      player.velocity.x = 0;

      if (keys.d.pressed) player.velocity.x = 5; 
      else if (keys.a.pressed) player.velocity.x = -5;
      
      player.draw();
      player.update()
      // ctx?.clearRect(0, 0, canvasRef?.width ?? 0, canvasRef?.height ?? 0);
    }

    animate();

    addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
          if (player.velocity.y === 0) player.velocity.y -= 20;
          break;
        case "a":
          keys.a.pressed = true;
          break;
        case "d":
          keys.d.pressed = true;
          break;
        default:
          break;
      }
    })

    addEventListener("keyup", (event) => {
      switch (event.key) {
        case "a":
          keys.a.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
        default:
          break;
      }
    })

  }, [canvasRef]);

  return <div>
    <canvas ref={canvasRef}></canvas>
  </div>
};

export default Canvas;