'use client';

import { useEffect, useRef } from 'react';
import { Renderer } from '~/components/game/renderer';
import { Player } from '~/components/game/classes/entities/player';
import { CellOwner } from '~/components/game/classes/entities/cell';
import { Game } from '~/components/game/game';
import { InputController } from '~/components/game/classes/input-controller';
import { createRandomBalls } from '~/components/game/utils/create-random-balls';
import { createBorderCells } from '~/components/game/utils/create-border-cells';

export function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gameRef = useRef<Game | null>(null);
    const rendererRef = useRef<Renderer | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const player = new Player(
            { x: 10, y: 10 },
            { x: 0, y: 0 },
            20,
            'player-1',
            { x: 4, y: 0 }
        );

        const balls = createRandomBalls(10);

        const cells = createBorderCells(CellOwner.WALL, player.getColor());

        const input = new InputController();

        const game = new Game(player, balls, cells);
        const renderer = new Renderer(ctx);

        gameRef.current = game;
        rendererRef.current = renderer;

        let lastTime = performance.now();
        let frameId: number;

        const loop = (time: number) => {
            let deltaTime = time - lastTime;
            lastTime = time;

            deltaTime = Math.min(deltaTime, 50);

            const currentDirection = player.getDirection();
            const nextDirection = input.getDirection(currentDirection);
            player.setDirection(nextDirection.x, nextDirection.y);

            game.update(deltaTime);
            renderer.render(player, balls, cells);

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);

        return () => {
            input.destroy();
            cancelAnimationFrame(frameId);
        };
    }, []);

    return <canvas ref={canvasRef} width={800} height={600} />;
}
