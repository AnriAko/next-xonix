import { Player } from '~/components/game/classes/entities/player';
import { Ball } from '~/components/game/classes/entities/ball';
import { Cell, CellOwner } from '~/components/game/classes/entities/cell';

const SCALE = 10;
const BACKGROUND_COLOR = '#1d1d1d';

export class Renderer {
    constructor(private ctx: CanvasRenderingContext2D) {}

    render(player: Player, balls: Ball[], cells: Cell[]): void {
        this.drawBackground();

        for (const cell of cells) {
            this.renderCell(cell);
        }

        for (const ball of balls) {
            this.renderBall(ball);
        }

        this.renderPlayer(player);
    }

    private drawBackground(): void {
        this.ctx.fillStyle = BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, 800, 600);
    }

    private renderCell(cell: Cell): void {
        const { x, y } = cell.getPosition();

        this.ctx.fillStyle = cell.getColor();
        this.ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }

    private renderBall(ball: Ball): void {
        const { x, y } = ball.getPosition();

        this.ctx.fillStyle = ball.getColor();
        this.ctx.beginPath();
        this.ctx.arc(x * SCALE, y * SCALE, SCALE / 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private renderPlayer(player: Player): void {
        const { x, y } = player.getPosition();

        const px = x * SCALE;
        const py = y * SCALE;

        this.ctx.fillStyle = player.getColor();
        this.ctx.fillRect(px, py, SCALE, SCALE);

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(px + 1, py + 1, SCALE - 2, SCALE - 2);
    }
}
