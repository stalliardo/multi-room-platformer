type Animations = {
    [index: string]: AnimationItem;
    idleRight: AnimationItem;
    idleLeft: AnimationItem;
    runRight: AnimationItem;
    runLeft: AnimationItem;
    enterDoor: AnimationItem;
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
    frameBuffer?: number;
    animations?: Animations
    loop?: boolean;
    autoplay?: boolean;
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
    loop;
    autoplay;

    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 4, animations, loop = true, autoplay = true }: SpriteArgs) {
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
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;

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

    play(){
        this.autoplay = true;
    }

    updateFrames(){
        if(!this.autoplay) return;
        this.elapsedFrames++;
        if(this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate - 1){
                this.currentFrame++;
            } else if (this.loop) {
                this.currentFrame = 0;
            }
        }

    }
}