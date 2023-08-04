import CollisionBlock from "./CollisionBlock";

interface PlayerArgs {
    collisionBlocks: CollisionBlock[]
}

export default class Player {
    position = { x: 200, y: 200 };
    width: number = 25;
    height: number = 25;
    velocity = {
        x: 0,
        y: 0
    }
    sides = {
        bottom: this.position.y + this.height
    }
    gravity: number = 1;
    collisionBlocks;

    constructor(public canvas: HTMLCanvasElement, { collisionBlocks }: PlayerArgs) {
        this.collisionBlocks = collisionBlocks;
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width && // left side of player, right side of collision block
                this.position.x + this.width >= collisionBlock.position.x &&           // right side of player, left side of collision block
                this.position.y + this.height >= collisionBlock.position.y &&          // bottom of player, top of collision block
                this.position.y <= collisionBlock.position.y + collisionBlock.height   // top of player, bottom of collision block
            ) {
                if (this.velocity.x < -0) { // collision on x axis going left
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01; // move the player to the right side of the block
                    break;
                }
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01; // move the player to the left side of the block
                    break;
                }
            }
        }
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width && // left side of player, right side of collision block
                this.position.x + this.width >= collisionBlock.position.x &&           // right side of player, left side of collision block
                this.position.y + this.height >= collisionBlock.position.y &&          // bottom of player, top of collision block
                this.position.y <= collisionBlock.position.y + collisionBlock.height   // top of player, bottom of collision block
            ) {
                if (this.velocity.y < 0) { // collision on y axis, top of player
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01; // move the player to the underside of the block
                    this.velocity.y = 0;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01; // move the player to the left side of the block
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.x += this.velocity.x;

        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
    }
}