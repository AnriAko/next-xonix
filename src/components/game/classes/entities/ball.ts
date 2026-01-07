import type { Coordinates } from '~/components/game/classes/types/coordinates';
import type { Direction } from '~/components/game/classes/types/direction';

/**
 * Ball entity.
 *
 * Responsible for:
 * - position
 * - movement direction
 * - movement speed
 *
 * Intended to be extended by other game entities.
 */

export class Ball {
    constructor(
        protected position: Coordinates,
        protected direction: Direction,
        protected speed: number = 20,
        protected color: string = 'rgba(215, 48, 209, 1)',
        protected radius: number = 0.6
    ) {}
    getRadius(): number {
        return this.radius;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string): void {
        this.color = color;
    }

    getPosition(): Coordinates {
        return this.position;
    }

    setPosition(x: number, y: number): void {
        this.position = { x, y };
    }

    getDirection(): Direction {
        return this.direction;
    }

    setDirection(x: number, y: number): void {
        this.direction = this.clampDirection(x, y);
    }

    getSpeed(): number {
        return this.speed;
    }

    setSpeed(speed: number): void {
        this.speed = speed;
    }

    /**
     * Handles collision with another entity.
     *
     * Inverts the movement direction of the collided entity.
     *
     * @param anotherEntity - entity involved in the collision
     */
    /**
     * Handles collision response between this entity and another ball.
     *
     * Determines the side of the collision based on the relative positions
     * of the entities and inverts the movement direction accordingly:
     *
     * - Left / Right collision  → invert X direction
     * - Top / Bottom collision → invert Y direction
     * - Diagonal collision     → invert both X and Y directions
     *
     * @param anotherEntity - The entity involved in the collision
     */
    collision(anotherEntity: Ball): void {
        // Positions of both entities
        const aPos = this.getPosition();
        const bPos = anotherEntity.getPosition();

        // Current movement direction of the collided entity
        const dir = anotherEntity.getDirection();

        // Vector from this entity to the other one
        const dx = bPos.x - aPos.x;
        const dy = bPos.y - aPos.y;

        // Absolute values are used to determine the dominant collision axis
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Small tolerance to avoid jitter on near-diagonal collisions
        const EPS = 1;

        // Collision from left or right - reflect X axis
        if (absDx > absDy + EPS) {
            anotherEntity.setDirection(-dir.x, dir.y);
            return;
        }

        // Collision from top or bottom - reflect Y axis
        if (absDy > absDx + EPS) {
            anotherEntity.setDirection(dir.x, -dir.y);
            return;
        }

        // Diagonal collision - reflect both axes
        anotherEntity.setDirection(-dir.x, -dir.y);
    }

    checkWorldBounds(worldWidth: number, worldHeight: number): void {
        let { x, y } = this.position;
        let { x: dx, y: dy } = this.direction;

        let collided = false;

        if (x - this.radius < 0) {
            x = this.radius;
            dx = 1;
            collided = true;
        } else if (x + this.radius > worldWidth) {
            x = worldWidth - this.radius;
            dx = -1;
            collided = true;
        }

        if (y - this.radius < 0) {
            y = this.radius;
            dy = 1;
            collided = true;
        } else if (y + this.radius > worldHeight) {
            y = worldHeight - this.radius;
            dy = -1;
            collided = true;
        }

        if (collided) {
            this.position = { x, y };
            this.direction = this.clampDirection(dx, dy);
        }
    }

    move(deltaTime: number): void {
        const invSqrt2 = 0.70710678; // 1 / sqrt(2)

        this.position = {
            x:
                this.position.x +
                this.direction.x * this.speed * invSqrt2 * deltaTime,
            y:
                this.position.y +
                this.direction.y * this.speed * invSqrt2 * deltaTime,
        };
    }

    protected clampDirection(x: number, y: number): Direction {
        return {
            x: x >= 0 ? 1 : -1,
            y: y >= 0 ? 1 : -1,
        };
    }
}
