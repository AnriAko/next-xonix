export class InputController {
    private keys = new Set<string>();

    constructor() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        this.keys.add(e.code);
    };

    private onKeyUp = (e: KeyboardEvent): void => {
        this.keys.delete(e.code);
    };

    getDirection(current: { x: number; y: number }): { x: number; y: number } {
        let { x, y } = current;

        if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) {
            x = -1;
            y = 0;
        }

        if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) {
            x = 1;
            y = 0;
        }

        if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) {
            x = 0;
            y = -1;
        }

        if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) {
            x = 0;
            y = 1;
        }

        return { x, y };
    }

    destroy(): void {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    }
}
