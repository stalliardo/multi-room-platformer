import CollisionBlock from "@/classes/CollisionBlock";

const levelOneCollisionData = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
    0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
    0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
    0, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
    0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

function parse2D(data: number[]): number[][] {

    const rows = [];

    for (let i = 0; i < data.length; i += 16) {
        rows.push(data.slice(i, i + 16));
    }

    return rows;
}

type Levels = "level1" | "level2" | "level3";

export const getCollisionBlocksArray = (level: Levels) => {
    const collisions: CollisionBlock[] = [];

    let parsedCollisions;

    switch(level){
        case "level1": {
            parsedCollisions = parse2D(levelOneCollisionData);
            break;
        }
    }

    parsedCollisions?.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292) {
                collisions.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                )
            }
        })
    })

    return collisions;
}