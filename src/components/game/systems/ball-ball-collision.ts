import { Ball } from '~/components/game/classes/entities/ball';

export function checkBallCollisions(balls: Ball[]): void {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            resolveBallCollision(balls[i], balls[j]);
        }
    }
}

function resolveBallCollision(a: Ball, b: Ball): void {
    const pa = a.getPosition();
    const pb = b.getPosition();

    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = a.getRadius() + b.getRadius();

    if (distance === 0 || distance >= minDistance) return;

    const nx = dx / distance;
    const ny = dy / distance;

    const penetration = minDistance - distance;
    const correction = penetration / 2;

    a.setPosition(pa.x - nx * correction, pa.y - ny * correction);
    b.setPosition(pb.x + nx * correction, pb.y + ny * correction);

    reflect(a, nx, ny);
    reflect(b, -nx, -ny);
}

function reflect(ball: Ball, nx: number, ny: number): void {
    const dir = ball.getDirection();
    const dot = dir.x * nx + dir.y * ny;

    ball.setDirection(dir.x - 2 * dot * nx, dir.y - 2 * dot * ny);
}
