<script>
	import { onMount } from "svelte";
    import ControlPanel from "../../lib/components/ControlPanel.svelte";
    import { isCanvasPressed } from "$lib/stores";
    import { isDrawingPlaying } from "$lib/stores";
    import { strokeColor } from "$lib/stores";
    import { strokeWidth } from "$lib/stores";

    import { tree } from "$lib/stores";
    import { redoHistory } from "$lib/stores";

    let canvas;
    let ctx;

    onMount(() => {
        ctx = canvas.getContext('2d');
        handleCanvasSizing();
    });

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

            if($tree[$tree.length - 1] === 0) {
                $tree.pop();
                $tree = $tree;
                $redoHistory = [];
            }
            $tree = [...$tree, 1];
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

            if($tree[$tree.length - 1] === 0) {
                $tree.pop();
                $tree = $tree;
                $redoHistory = [];
            }
            $tree = [...$tree, 1];
        }
    }

    const draw = e => {
        if($isCanvasPressed && !$isDrawingPlaying) {
            const X = e.offsetX;
            const Y = e.offsetY;
            ctx.lineTo(X, Y);
            ctx.moveTo(X, Y);
            ctx.stroke();

            $tree = [...$tree, { x: X, y: Y, strokeColor: $strokeColor, strokeWidth: $strokeWidth }];
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

            $tree = [...$tree, { x: X, y: Y, strokeColor: $strokeColor, strokeWidth: $strokeWidth }];
        }
    }

    const stopDrawing = e => {
        $isCanvasPressed = false;
    }

    const handleCanvasSizing = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.strokeStyle = $strokeColor;
        ctx.lineWidth = $strokeWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
    }

    const clearCanvas = () => {
        if(!$isDrawingPlaying) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            $tree = [];
            $redoHistory = [];
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

            for (let index = 0; index < $tree.length; index++) {
                const moveSet = $tree[index];
                
                if($isDrawingPlaying) {
                    await delay(5); 
                }

                if (moveSet === 1) {
                    ctx.stroke();
                    ctx.beginPath();
                    const nextMoveSet = $tree[index + 1];
                    if (nextMoveSet) {
                        ctx.moveTo(nextMoveSet.x, nextMoveSet.y);
                    }
                }
                
                else {
                    ctx.strokeStyle = moveSet.strokeColor;
                    ctx.lineWidth = moveSet.strokeWidth;
                    ctx.lineTo(moveSet.x, moveSet.y);
                    ctx.moveTo(moveSet.x, moveSet.y);
                }

                ctx.stroke();
            }

            ctx.stroke();
            $isDrawingPlaying = false;
            ctx.strokeStyle = $strokeColor;
            ctx.lineWidth = $strokeWidth;
        }
    }

    const changeStrokeColor = (color) => {
        if(ctx) {
            ctx.strokeStyle = color;
        }
    }

    $: changeStrokeColor($strokeColor);

    const changeStrokeWidth = (width) => {
        if(ctx) {
            ctx.lineWidth = width;
        }
    }

    $: changeStrokeWidth($strokeWidth);

    const undo = () => {
        if($tree[$tree.length - 1] === 0) {
            $tree.pop();
            $tree = $tree;
        }
        const indexOfLastStrokeStart = $tree.lastIndexOf(1);
        $redoHistory = [...$redoHistory, ...$tree.slice(indexOfLastStrokeStart)];
        $tree.splice(indexOfLastStrokeStart);
        $tree = [...$tree, 0];

        drawInstructions();
    }

    const redo = () => {
        if($tree[$tree.length - 1] === 0) {
            $tree.pop();
            $tree = $tree;

            const indexOfLastStrokeStart = $redoHistory.lastIndexOf(1);
            $tree = [...$tree, ...$redoHistory.slice(indexOfLastStrokeStart), 0];
            $redoHistory.splice(indexOfLastStrokeStart);

            drawInstructions();
        }
    }

    const drawInstructions = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        for (let index = 0; index < $tree.length; index++) {
            const moveSet = $tree[index];

            if (moveSet === 1) {
                ctx.stroke();
                ctx.beginPath();
                const nextMoveSet = $tree[index + 1];
                if (nextMoveSet) {
                    ctx.moveTo(nextMoveSet.x, nextMoveSet.y);
                }
            }
            
            else {
                ctx.strokeStyle = moveSet.strokeColor;
                ctx.lineWidth = moveSet.strokeWidth;
                ctx.lineTo(moveSet.x, moveSet.y);
                ctx.moveTo(moveSet.x, moveSet.y);
            }

            ctx.stroke();
        }

        ctx.stroke();
        ctx.strokeStyle = $strokeColor;
        ctx.lineWidth = $strokeWidth;
    }

    const stopAnimation = () => {
        $isDrawingPlaying = false;
        drawInstructions();
    }
</script>

<svelte:window on:resize={() => {
    handleCanvasSizing();
    drawInstructions();
}}/>

<main>
    <ControlPanel 
        on:clear={clearCanvas}
        on:play={playDrawing}
        on:undo={undo}
        on:redo={redo}
        on:stopAnimation={stopAnimation}
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