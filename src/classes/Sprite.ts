type Animations = {
    [index: string]: AnimationItem;
    idleRight: AnimationItem;
    idleLeft: AnimationItem;
    runRight: AnimationItem;
    runLeft: AnimationItem;
}
type AnimationItem = {
    frameRate: number;
    frameBuffer: number;
    loop: boolean;
    imageSrc: string;
    image?: any
}

interface SpriteArgs {
    position: {
        x: number;
        y: number;
    },
    imageSrc: string;
    frameRate?: number;
    animations?: Animations 
}

export default class Sprite {
    image = new Image();
    position;
    imageSrc;
    loaded = false;
    width = 0;
    height = 0;
    frameRate;
    currentFrame;
    elapsedFrames;
    frameBuffer;
    animations;

    constructor({ position, imageSrc, frameRate = 1, animations }: SpriteArgs) {
        this.position = position;
        this.imageSrc = imageSrc;
        this.image.src = this.imageSrc;
        this.frameRate = frameRate;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / frameRate;
            this.height = this.image.height;
        }
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 4;
        this.animations = animations;

        if(this.animations){
            for(let key in this.animations){
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.loaded) return;
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height
        }
        ctx.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.updateFrames();
    }

    updateFrames(){
        this.elapsedFrames++;
        if(this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate - 1){
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }

    }
}