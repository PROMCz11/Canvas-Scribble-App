<script>
	import { onMount } from "svelte";
    import ControlPanel from "../../lib/components/ControlPanel.svelte";
    import { isCanvasPressed } from "$lib/stores";
    import { isDrawingPlaying } from "$lib/stores";
    import { drawing } from "$lib/stores";
    import { strokeColor } from "$lib/stores";

    let canvas;
    let ctx;

    onMount(() => {
        ctx = canvas.getContext('2d');
        handleCanvasSizing();
    })

    const getTouchPos = (canvas, touchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const touch = touchEvent.touches[0];
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }

    const startDrawing = e => {
        if(!$isDrawingPlaying) {
            const X = e.offsetX;
            const Y = e.offsetY;
            $isCanvasPressed = true;
            ctx.beginPath();
            ctx.moveTo(X, Y);

            $drawing = [...$drawing, 1];
        }
    }

    const startDrawingTouch = e => {
        if(!$isDrawingPlaying) {
            const touchPos = getTouchPos(canvas, e);
            const X = touchPos.x;
            const Y = touchPos.y;
            $isCanvasPressed = true;
            ctx.beginPath();
            ctx.moveTo(X, Y);

            $drawing = [...$drawing, 1];
        }
    }

    const draw = e => {
        if($isCanvasPressed && !$isDrawingPlaying) {
            const X = e.offsetX;
            const Y = e.offsetY;
            ctx.lineTo(X, Y);
            ctx.moveTo(X, Y);
            ctx.stroke();

            $drawing = [...$drawing, { x: X, y: Y, strokeColor: $strokeColor }];
        }
    }

    const drawTouch = e => {
        if($isCanvasPressed && !$isDrawingPlaying) {
            const touchPos = getTouchPos(canvas, e);
            const X = touchPos.x;
            const Y = touchPos.y;
            ctx.lineTo(X, Y);
            ctx.moveTo(X, Y);
            ctx.stroke();

            $drawing = [...$drawing, { x: X, y: Y, strokeColor: $strokeColor }];
        }
    }

    const stopDrawing = e => {
        $isCanvasPressed = false;

        console.log("End:", e.offsetX, e.offsetY);
    }

    const handleCanvasSizing = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
    }

    const clearCanvas = () => {
        if(!$isDrawingPlaying) {
            $drawing = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const playDrawing = async () => {
        if(!$isDrawingPlaying) {
            $isDrawingPlaying = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();

            for (let index = 0; index < $drawing.length; index++) {
                const moveSet = $drawing[index];
                
                await delay(5);

                if (moveSet === 1) {
                    ctx.stroke();
                    ctx.beginPath();
                    const nextMoveSet = $drawing[index + 1];
                    if (nextMoveSet) {
                        ctx.moveTo(nextMoveSet.x, nextMoveSet.y);
                    }
                }
                
                else {
                    ctx.strokeStyle = moveSet.strokeColor;
                    ctx.lineTo(moveSet.x, moveSet.y);
                    ctx.moveTo(moveSet.x, moveSet.y);
                }

                ctx.stroke();
            }

            ctx.stroke();
            $isDrawingPlaying = false;
        }
    }

    const changeStrokeColor = (color) => {
        if(ctx) {
            ctx.strokeStyle = color;
        }
    }

    $: changeStrokeColor($strokeColor);
</script>

<main>
    <ControlPanel 
        on:clear={clearCanvas}
        on:play={playDrawing}
    />
    <canvas
        bind:this={canvas}
        on:mousedown={startDrawing}
        on:mousemove={draw}
        on:mouseup={stopDrawing}
        on:touchstart|preventDefault={startDrawingTouch}
        on:touchmove|preventDefault={drawTouch}
        on:touchend|preventDefault={stopDrawing}
    ></canvas>
</main>

<style>
    main {
        display: flex;
        min-height: 100vh;
        min-height: 100svh;
    }
    
    canvas {
        flex: 1;
        /* border: 2px solid limegreen; */
    }

    @media (max-width: 1000px) {
        main {
            flex-direction: column;
        }
    }
</style>