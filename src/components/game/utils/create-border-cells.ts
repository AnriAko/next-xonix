import { Cell, CellOwner } from '~/components/game/classes/entities/cell';
import { WORLD } from '~/components/game/classes/types/world';

export function createBorderCells(
    owner: CellOwner,
    color: string,
    thickness: number = 2
): Cell[] {
    const cells: Cell[] = [];

    for (let y = 0; y < WORLD.height; y++) {
        for (let x = 0; x < WORLD.width; x++) {
            const isBorder =
                x < thickness ||
                x >= WORLD.width - thickness ||
                y < thickness ||
                y >= WORLD.height - thickness;

            cells.push(
                isBorder
                    ? new Cell(owner, { x, y }, color)
                    : new Cell(CellOwner.NONE, { x, y })
            );
        }
    }

    return cells;
}
