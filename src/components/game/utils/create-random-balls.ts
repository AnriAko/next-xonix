import { Ball } from '~/components/game/classes/entities/ball';
import type { Direction } from '~/components/game/classes/types/direction';
import { WORLD } from '~/components/game/classes/types/world';

export function createRandomBalls(count: number): Ball[] {
    const balls: Ball[] = [];

    const directions: Direction[] = [
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
    ];

    const radius = 0.5;
    const borderOffset = 2 + radius; // 🔹 2 клетки от края + радиус

    for (let i = 0; i < count; i++) {
        const x =
            Math.random() * (WORLD.width - borderOffset * 2) + borderOffset;

        const y =
            Math.random() * (WORLD.height - borderOffset * 2) + borderOffset;

        const direction =
            directions[Math.floor(Math.random() * directions.length)];

        const hue = Math.random() * 360;
        const saturation = 60 + Math.random() * 20; // 60–80%
        const lightness = 70 + Math.random() * 20; // 70–90%

        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        balls.push(new Ball({ x, y }, direction, 20, color, radius));
    }

    return balls;
}
