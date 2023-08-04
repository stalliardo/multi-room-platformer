
interface CollisionArgs {
    position: {
        x: number;
        y: number;
    }
}

export default class CollisionBlock {
    width: number = 64; // same as the width in tiled (64 pixels wide)
    height: number = 64;
    position;

    constructor({position}: CollisionArgs){
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}