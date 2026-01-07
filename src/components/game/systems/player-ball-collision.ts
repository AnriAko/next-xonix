import { Ball } from '~/components/game/classes/entities/ball';
import { Player } from '~/components/game/classes/entities/player';

export function checkPlayerBallCollisions(player: Player, balls: Ball[]): void {
    for (const ball of balls) {
        if (isColliding(player, ball)) {
            player.collision();
        }
    }
}

function isColliding(a: Ball, b: Ball): boolean {
    const pa = a.getPosition();
    const pb = b.getPosition();

    const dx = pa.x - pb.x;
    const dy = pa.y - pb.y;

    return Math.sqrt(dx * dx + dy * dy) < a.getRadius() + b.getRadius();
}
