export default class Player {
    position = { x: 100, y: 100 };
    width: number = 100;
    height: number = 100;
    velocity = {
        x: 0,
        y: 0
    }
    sides = {
        bottom: this.position.y + this.height
    }
    gravity: number = 1;

    constructor(public c: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) { }

    draw() {
        this.c.fillStyle = "red";
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y;

        // Above bottom of canvas
        if (this.sides.bottom + this.velocity.y < this.canvas.height) {
            this.velocity.y += this.gravity;
            this.sides.bottom = this.position.y + this.height;
        } else {
            this.velocity.y = 0;
        }
    }
}