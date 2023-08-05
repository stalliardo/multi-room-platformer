import Player from '@/classes/Player';
import Sprite from '@/classes/Sprite';
import React, { useRef, useEffect, useState } from 'react';
import { getCollisionBlocksArray } from '../../../GameUtils/mapData/collision';
import { gsap } from 'gsap';
import CollisionBlock from '@/classes/CollisionBlock';

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

    let collisionBlocks = getCollisionBlocksArray("level1");
    let background = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "backgroundLevel1.png" });
    let doors: Sprite[];

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
          imageSrc: "king/enterDoor.png",
          onComplete: () => {
            gsap.to(overlay, {
              opacity: 1,
              onComplete: () => {
                level++;
                if(level === 4) level = 1; // TODO remove looping
                levels[level].init();
                player.switchSprite("idleRight");
                player.preventInput = false;
                
                gsap.to(overlay, {
                  opacity: 0
                })
              }
            })
          },
          isActive: false
        }
      }
    });

    let level = 1;
    let levels: Levels = {
      1: {
        init: () => {
          // TODO can remove when not looping levels
          collisionBlocks = getCollisionBlocksArray("level1");
          background = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "backgroundLevel1.png" });
          player.collisionBlocks = collisionBlocks;

          if(player.currentAnimation?.isActive) player.currentAnimation.isActive = false;
          doors = [
            new Sprite({
              position: { x: 788, y: 269 },
              imageSrc: "doorOpen.png",
              frameRate: 5,
              frameBuffer: 6,
              loop: false,
              autoplay: false
            })
          ]
        }
      },
      2: {
        init: () => {
          collisionBlocks = getCollisionBlocksArray("level2");
          background = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "backgroundLevel2.png" });
          player.collisionBlocks = collisionBlocks;
          if(player.currentAnimation?.isActive) player.currentAnimation.isActive = false;
          player.position.x = 85;
          player.position.y = 68;

          doors = [
            new Sprite({
              position: { x: 773, y: 331 },
              imageSrc: "doorOpen.png",
              frameRate: 5,
              frameBuffer: 6,
              loop: false,
              autoplay: false
            })
          ]
        }
      },
      3: {
        init: () => {
          collisionBlocks = getCollisionBlocksArray("level3");
          background = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "backgroundLevel3.png" });
          player.collisionBlocks = collisionBlocks;
          if(player.currentAnimation?.isActive) player.currentAnimation.isActive = false;
          player.position.x = 741;
          player.position.y = 162;

          doors = [
            new Sprite({
              position: { x: 175, y: 321 },
              imageSrc: "doorOpen.png",
              frameRate: 5,
              frameBuffer: 6,
              loop: false,
              autoplay: false
            })
          ]
        }
      }
    }

    const overlay = {
      opacity: 0
    }

    function animate() {
      requestAnimationFrame(animate);

      const currentCtx = canvasRef.current?.getContext("2d");
      if (!currentCtx) return;

      background.draw(currentCtx);

      // TODO for debugging only
      // collisionBlocks.forEach((collisionBlock) => {
      //   collisionBlock.draw(currentCtx);
      // });

      doors.forEach((door) => {
        door.draw(currentCtx);
      });

      player.handleInput(keys);
      player.draw(currentCtx);
      player.update();

      currentCtx.save();
      currentCtx.globalAlpha = overlay.opacity;
      currentCtx.fillStyle = "black";
      currentCtx.fillRect(0, 0, cr.width, cr.height);
      currentCtx.restore();
    }

    levels[level].init();

    animate();

    addEventListener("keydown", (event) => {
      if (player.preventInput) return;
      switch (event.key) {
        case "w":
          for (let i = 0; i < doors.length; i++) {
            const door = doors[i];
            if (player.position.x + player.hitBox.width <= door.position.x + door.width &&
              player.position.x + player.hitBox.width >= door.position.x &&
              player.hitBox.position.y + player.hitBox.height >= door.position.y &&
              player.hitBox.position.y <= door.position.y + door.height) {
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

  return <div style={{margin: "auto"}}>
    <canvas ref={canvasRef}></canvas>
  </div>
};

export default Canvas;