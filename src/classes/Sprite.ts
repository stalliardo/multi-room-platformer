interface SpriteArgs {
    position: {
        x: number;
        y: number;
    },
    imageSrc: string;
}

export default class Sprite {
    image = new Image();
    position;
    imageSrc;
    loaded = false;

    constructor({ position, imageSrc }: SpriteArgs) {
        this.position = position;
        this.imageSrc = imageSrc;
        this.image.src = `../../../${this.imageSrc}`;
        this.image.onload = () => {
            this.loaded = true;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.loaded) return;
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}