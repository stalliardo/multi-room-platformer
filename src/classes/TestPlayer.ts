import CollisionBlock from "./CollisionBlock";
import Sprite from "./Sprite";

interface PlayerArgs {
    position: {
        x: number,
        y: number
    };
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export default class TestPlayer {
    position = { x: 200, y: 200 };
    velocity;
   
    gravity: number = 1;
    ctx;

    constructor({ position, ctx }: PlayerArgs) {
        this.ctx = ctx;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.position = position;

    }
       

    checkForHorizontalCollisions() {
        // for (let i = 0; i < this.collisionBlocks.length; i++) {
        //     const collisionBlock = this.collisionBlocks[i];
        //     if (
        //         this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && // left side of player, right side of collision block
        //         this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&           // right side of player, left side of collision block
        //         this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&          // bottom of player, top of collision block
        //         this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height   // top of player, bottom of collision block
        //     ) {
        //         if (this.velocity.x < -0) { // collision on x axis going left
        //             const offset = this.hitBox.position.x - this.position.x;
        //             this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01; // move the player to the right side of the block
        //             break;
        //         }
        //         if (this.velocity.x > 0) {
        //             const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
        //             this.position.x = collisionBlock.position.x - offset - 0.01; // move the player to the left side of the block
        //             break;
        //         }
        //     }
        // }
    }

    checkForVerticalCollisions() {
        // for (let i = 0; i < this.collisionBlocks.length; i++) {
        //     const collisionBlock = this.collisionBlocks[i];
        //     if (
        //         this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && 
        //         this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        //         this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        //         this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
        //     ) {
        //         if (this.velocity.y < 0) { // collision on y axis, top of player
        //             this.velocity.y = 0;
        //             const offset = this.hitBox.position.y - this.position.y
        //             this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01; // move the player to the underside of the block
        //             break;
        //         }
        //         if (this.velocity.y > 0) {
        //             this.velocity.y = 0;
        //             const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
        //             this.position.y = collisionBlock.position.y - offset - 0.01; // move the player to the left side of the block
        //             break;
        //         }
        //     }
        }
    

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    // updateHitBox() {
    //     this.hitBox = {
    //         position: {
    //             x: this.position.x + 58,
    //             y: this.position.y + 34
    //         },
    //         width: 50,
    //         height: 54
    //     }
    // }

    update(canvas: HTMLCanvasElement) {
        this.position.x += this.velocity.x;

        // this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        // this.updateHitBox();

        this.checkForVerticalCollisions();


        if(
            this.position.y + 50 >= canvas.height - 20
        ) {
            this.velocity.y = 0;
            this.position.y = canvas.height - 50
        }
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.position.x, this.position.y, 50, 50)
    }

    handleInput(keys: any) {
        // if (this.preventInput) return;
        this.velocity.x = 0;

        if (keys.d.pressed) {
            if(this.position.x < 400){
                this.velocity.x = 5;
            }
        }
        else if (keys.a.pressed) {
            if(this.position.x > 100) {
                this.velocity.x = -5;
        
            }
        }
    }
}
