<script>
	import { onMount } from "svelte";
    import ControlPanel from "../../lib/components/ControlPanel.svelte";
    import { isCanvasPressed } from "$lib/stores";
    import { isDrawingPlaying } from "$lib/stores";
    import { drawing } from "$lib/stores";
    import { strokeColor } from "$lib/stores";
    import { strokeWidth } from "$lib/stores";
    import { history } from "$lib/stores";

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

            $drawing = [...$drawing, { x: X, y: Y, strokeColor: $strokeColor, strokeWidth: $strokeWidth }];
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

            $drawing = [...$drawing, { x: X, y: Y, strokeColor: $strokeColor, strokeWidth: $strokeWidth }];
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
            $drawing = [];
            $history = [];
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
                    ctx.lineWidth = moveSet.strokeWidth;
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

    const changeStrokeWidth = (width) => {
        if(ctx) {
            ctx.lineWidth = width;
        }
    }

    $: changeStrokeWidth($strokeWidth);

    // const splitIntoChunks = (array) => {
    //     const chunks = [];
    //     let currentChunk = [];

    //     array.forEach((item) => {
    //         if (item === 1) {
    //             if (currentChunk.length) {
    //                 chunks.push(currentChunk);
    //                 currentChunk = [];
    //             }
    //         } else {
    //             currentChunk.push(item);
    //         }
    //     });

    //     if (currentChunk.length) {
    //         chunks.push(currentChunk);
    //     }

    //     return chunks;
    // };

    // const joinChunks = (chunks) => {
    //     const joinedArray = [];

    //     chunks.forEach(chunk => {
    //         if (chunk.length > 0) {
    //             joinedArray.push(1);
    //             joinedArray.push(...chunk);
    //         }
    //     });

    //     return joinedArray;
    // };

    // const split = () => {
    //     const chunks = splitIntoChunks($drawing);
    //     console.log(chunks);
    // };

    const undo = () => {
        const indexOfLastStrokeStart = $drawing.lastIndexOf(1);
        $history = [...$history, ...$drawing.slice(indexOfLastStrokeStart)];
        $drawing.splice(indexOfLastStrokeStart);
        drawInstructions();
    }

    const redo = () => {
        const indexOfLastStrokeStart = $history.lastIndexOf(1);
        $drawing = [...$drawing, ...$history.slice(indexOfLastStrokeStart)];
        drawInstructions();
        $history = [];
    }

    const drawInstructions = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        for (let index = 0; index < $drawing.length; index++) {
            const moveSet = $drawing[index];

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
                ctx.lineWidth = moveSet.strokeWidth;
                ctx.lineTo(moveSet.x, moveSet.y);
                ctx.moveTo(moveSet.x, moveSet.y);
            }

            ctx.stroke();
        }

        ctx.stroke();
    }
</script>

<main>
    <ControlPanel 
        on:clear={clearCanvas}
        on:play={playDrawing}
        on:undo={undo}
        on:redo={redo}
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