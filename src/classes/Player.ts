export default class Player {
    position = {x: 100, y: 100};
    width: number = 100;
    height: number = 100;
    sides = {
        bottom: this.position.y + this.height
    }

    constructor(public c: CanvasRenderingContext2D, public canvas: HTMLCanvasElement){}
        
    draw() {
        this.c.fillStyle = "red";
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        
      if(this.sides.bottom < this.canvas.height){
        this.position.y++;
        this.sides.bottom = this.position.y + this.height;
      }

    }
}