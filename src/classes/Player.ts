import CollisionBlock from "./CollisionBlock";
import Sprite from "./Sprite";

interface PlayerArgs {
    collisionBlocks: CollisionBlock[];
    position: {
        x: number,
        y: number
    };
    imageSrc: string;
    canvas: HTMLCanvasElement;
    frameRate: number;
    ctx: CanvasRenderingContext2D;
    animations: Animations;
    loop?: boolean;
}

export default class Player extends Sprite {
    position = { x: 200, y: 200 };
    hitBox = { position: { x: 0, y: 0 }, width: 0, height: 0 };
    velocity = {
        x: 0,
        y: 0
    }
    sides = {
        bottom: this.position.y + this.height
    }
    gravity: number = 1;
    collisionBlocks;
    ctx;
    animations;
    lastDirection: string = "right";
    preventInput: boolean = false;
    camerabox: any;
    canvas: HTMLCanvasElement;

    constructor({ collisionBlocks, position, imageSrc, canvas, frameRate, ctx, animations, loop = true }: PlayerArgs) {
        super({ position, imageSrc, frameRate, animations, loop })
        this.collisionBlocks = collisionBlocks;
        this.ctx = ctx;
        this.animations = animations;
        this.loop = loop;
        this.canvas = canvas;

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80

        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && // left side of player, right side of collision block
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&           // right side of player, left side of collision block
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&          // bottom of player, top of collision block
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height   // top of player, bottom of collision block
            ) {
                if (this.velocity.x < -0) { // collision on x axis going left
                    const offset = this.hitBox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01; // move the player to the right side of the block
                    break;
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01; // move the player to the left side of the block
                    break;
                }
            }
        }
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) { // collision on y axis, top of player
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01; // move the player to the underside of the block
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01; // move the player to the left side of the block
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 54
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.velocity.x = 0;

        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();

        this.checkForVerticalCollisions();

        this.updateCamerabox()

        this.ctx.fillStyle = "rgba(0,0,255, 0.5)"
        this.ctx.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height)
    }

    handleInput(keys: any, camera: any) {
        if (this.preventInput) return;

        if (keys.d.pressed) {
            this.switchSprite("runRight");
            this.velocity.x = 5;
            this.lastDirection = "right";
            this.shouldPanCameraToTheLeft(camera)
        }
        else if (keys.a.pressed) {
            this.switchSprite("runLeft");
            this.velocity.x = -5;
            this.lastDirection = "left";
        } else if (this.lastDirection === "left") {
            this.switchSprite("idleLeft");
        } else {
            this.switchSprite("idleRight");
        }
    }

    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x - 20,
                y: this.position.y,
            },
            width: 200,
            height: 80
        }
    }

    shouldPanCameraToTheLeft(camera: any) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;

        if(cameraboxRightSide >= 3072){
            return;
        }

        if (cameraboxRightSide >= this.canvas.width + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }

    }

    switchSprite(name: string) {
        if (this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
    }
}