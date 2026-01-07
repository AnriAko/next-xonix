import { Coordinates } from '~/components/game/classes/types/coordinates';

export enum CellOwner {
    NONE = 'none',
    PLAYER = 'player',
    WALL = 'wall',
}

const BACKGROUND_COLOR = '#1d1d1d';

export class Cell {
    private color: string;

    constructor(
        private owner: CellOwner,
        private position: Coordinates,
        color?: string
    ) {
        this.color =
            owner === CellOwner.NONE
                ? BACKGROUND_COLOR
                : color ?? BACKGROUND_COLOR;
    }

    getOwner(): CellOwner {
        return this.owner;
    }

    setOwner(owner: CellOwner, color?: string): void {
        this.owner = owner;
        this.color =
            owner === CellOwner.NONE ? BACKGROUND_COLOR : color ?? this.color;
    }

    getColor(): string {
        return this.color;
    }

    getPosition(): Coordinates {
        return this.position;
    }

    setPosition(position: Coordinates): void {
        this.position = position;
    }

    isSolid(): boolean {
        return this.owner !== CellOwner.NONE;
    }
}
