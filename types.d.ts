type AnimationItem = {
    frameRate: number;
    frameBuffer: number;
    loop: boolean;
    imageSrc: string;
    image?: any;
    onComplete?: () => void;
    isActive?: boolean;
}

type Animations = {
    [index: string]: AnimationItem;
    idleRight: AnimationItem;
    idleLeft: AnimationItem;
    runRight: AnimationItem;
    runLeft: AnimationItem;
    enterDoor: AnimationItem;
}