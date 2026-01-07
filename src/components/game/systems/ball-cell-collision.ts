import { Ball } from '~/components/game/classes/entities/ball';
import { Cell } from '~/components/game/classes/entities/cell';

export function checkBallCellCollisions(balls: Ball[], cells: Cell[]): void {
    for (const ball of balls) {
        for (const cell of cells) {
            // ⛔ ignore empty cells
            if (cell.getOwner() === 'none') continue;

            resolveBallCellCollision(ball, cell);
        }
    }
}

function resolveBallCellCollision(ball: Ball, cell: Cell): void {
    const pos = ball.getPosition();
    const r = ball.getRadius();
    const c = cell.getPosition();

    const left = c.x;
    const right = c.x + 1;
    const top = c.y;
    const bottom = c.y + 1;

    const closestX = Math.max(left, Math.min(pos.x, right));
    const closestY = Math.max(top, Math.min(pos.y, bottom));

    const dx = pos.x - closestX;
    const dy = pos.y - closestY;

    if (dx * dx + dy * dy >= r * r) return;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const EPS = 0.0001;

    const dir = ball.getDirection();

    if (absDx > absDy + EPS) {
        ball.setDirection(-dir.x, dir.y);
        ball.setPosition(dx > 0 ? right + r : left - r, pos.y);
    } else if (absDy > absDx + EPS) {
        ball.setDirection(dir.x, -dir.y);
        ball.setPosition(pos.x, dy > 0 ? bottom + r : top - r);
    } else {
        ball.setDirection(-dir.x, -dir.y);
        ball.setPosition(
            dx > 0 ? right + r : left - r,
            dy > 0 ? bottom + r : top - r
        );
    }
}
