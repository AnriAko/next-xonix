import { Player } from '~/components/game/classes/entities/player';
import { Ball } from '~/components/game/classes/entities/ball';
import { Cell } from '~/components/game/classes/entities/cell';

import { updateEntities } from '~/components/game/systems';
import { checkBallCollisions } from '~/components/game/systems';
import { checkBallCellCollisions } from '~/components/game/systems';
import { checkPlayerBallCollisions } from '~/components/game/systems';

export class Game {
    private elapsedTime = 0;

    constructor(
        private player: Player,
        private balls: Ball[],
        private cells: Cell[]
    ) {}

    update(deltaTime: number): void {
        const rawDt = deltaTime / 1000;
        const dt = Math.min(rawDt, 0.05);
        this.elapsedTime += dt;

        const STEP = 1 / 120;
        let timeLeft = dt;

        while (timeLeft > 0) {
            const step = Math.min(STEP, timeLeft);

            updateEntities(this.player, this.balls, step);

            checkBallCollisions(this.balls);
            checkBallCellCollisions(this.balls, this.cells);
            checkPlayerBallCollisions(this.player, this.balls);

            timeLeft -= step;
        }
    }

    getTime(): number {
        return this.elapsedTime;
    }
}
