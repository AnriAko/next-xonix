import { Player } from '~/components/game/classes/entities/player';
import { Ball } from '~/components/game/classes/entities/ball';
import { WORLD } from '~/components/game/classes/types/world';

export function updateEntities(
    player: Player,
    balls: Ball[],
    dt: number
): void {
    player.move(dt);
    player.checkWorldBounds(WORLD.width, WORLD.height);

    for (const ball of balls) {
        ball.move(dt);
        ball.checkWorldBounds(WORLD.width, WORLD.height);
    }
}
