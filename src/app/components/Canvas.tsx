import Player from '@/classes/Player';
import Sprite from '@/classes/Sprite';
import React, { useRef, useEffect, useState } from 'react';
import { getCollisionBlocksArray } from '../../../GameUtils/mapData/collision';

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

    const collisionBlocks = getCollisionBlocksArray("level1");

    const player = new Player({
      collisionBlocks,
      position: { x: 200, y: 200 },
      imageSrc: "king/idle.png",
      canvas: cr,
      frameRate: 11,
      ctx,
      animations: {
        idleRight: {
          frameRate: 11,
          frameBuffer: 2,
          loop: true,
          imageSrc: "king/idle.png",
        },
        idleLeft: {
          frameRate: 11,
          frameBuffer: 2,
          loop: true,
          imageSrc: "king/idleLeft.png"
        },
        runRight: {
          frameRate: 8,
          frameBuffer: 4,
          loop: true,
          imageSrc: "king/runRight.png"
        },
        runLeft: {
          frameRate: 8,
          frameBuffer: 4,
          loop: true,
          imageSrc: "king/runLeft.png"
        },
        enterDoor: {
          frameRate: 8,
          frameBuffer: 4,
          loop: false,
          imageSrc: "king/enterDoor.png"
        }
      }
    });


    const doors = [
      new Sprite({
        position: { x: 788, y: 269 },
        imageSrc: "doorOpen.png",
        frameRate: 5,
        frameBuffer: 6,
        loop: false,
        autoplay: false
      })
    ]



    const backgroundLevel1 = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "backgroundLevel1.png" });

    // set the collsionBlocks by calling the function

    function animate() {
      requestAnimationFrame(animate);

      const currentCtx = canvasRef.current?.getContext("2d");
      if (!currentCtx) return;

      backgroundLevel1.draw(currentCtx);
      collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw(currentCtx);
      });

      doors.forEach((door) => {
        door.draw(currentCtx);
      });

      
      player.handleInput(keys);
      player.draw(currentCtx);
      player.update()
      // ctx?.clearRect(0, 0, canvasRef?.width ?? 0, canvasRef?.height ?? 0);
    }

    animate();

    addEventListener("keydown", (event) => {
      if(player.preventInput) return;
      switch (event.key) {
        case "w":
          for (let i = 0; i < doors.length; i++) {
            const door = doors[i];
            if(player.position.x + player.hitBox.width <= door.position.x + door.width &&
            player.position.x + player.hitBox.width >= door.position.x &&
            player.hitBox.position.y + player.hitBox.height >= door.position.y &&
            player.hitBox.position.y <= door.position.y + door.height)
            {
              player.velocity.x = 0;
              player.velocity.y = 0;
              player.preventInput = true;
              player.switchSprite("enterDoor");
              door.play();
              return;
            }
          } 
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