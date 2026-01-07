import { Cell } from '~/components/game/classes/entities/cell';
import { Ball } from '~/components/game/classes/entities/ball';
import { Coordinates } from '~/components/game/classes/types/coordinates';
import { Direction } from '~/components/game/classes/types/direction';

const STARTING_POSITION: Coordinates = { x: 400, y: 0 };

/**
 * Player entity.
 *
 * Extends Ball with:
 * - life management
 * - color and identity
 * - cell capturing logic
 * - custom collision behavior
 */

export class Player extends Ball {
    private static nextId = 1;

    private capturedCells = 0;
    private readonly id: string;

    constructor(
        position: Coordinates,
        direction: Direction,
        speed: number = 20,
        id?: string,
        private readonly captureStartPosition: Coordinates = STARTING_POSITION,
        private lifes: number = 3
    ) {
        super(position, direction, speed);

        this.id = id ?? `player-${Player.nextId++}`;
    }

    private reduceLife(): void {
        this.lifes -= 1;
    }

    getLifes(): number {
        return this.lifes;
    }

    getId(): string {
        return this.id;
    }

    /**
     * Handles collision with another entity.
     *
     * Applies base collision physics and then
     * applies player-specific game logic.
     */
    override collision(): void {
        this.reduceLife();
        this.resetState(this.captureStartPosition);
    }

    private resetState(position: Coordinates): void {
        this.setPosition(position.x, position.y);
        this.setDirection(0, 0);
    }
    protected override clampDirection(x: number, y: number): Direction {
        // Player moves only along one axis
        if (Math.abs(x) > Math.abs(y)) {
            return { x: Math.sign(x) || 0, y: 0 };
        }

        return { x: 0, y: Math.sign(y) || 0 };
    }
    override checkWorldBounds(worldWidth: number, worldHeight: number): void {
        const { x, y } = this.position;

        this.position = {
            x: Math.max(0, Math.min(worldWidth - 1, x)),
            y: Math.max(0, Math.min(worldHeight - 1, y)),
        };
    }
}
