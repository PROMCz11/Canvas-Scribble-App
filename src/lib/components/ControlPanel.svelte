<script>
    import { createEventDispatcher } from "svelte";
    import { strokeColor } from "$lib/stores";
    import { strokeWidth } from "$lib/stores";
    import { isDrawingPlaying } from "$lib/stores";
    import { availableColors } from "$lib/stores";
    import { savedStates } from "$lib/stores";
    import { redoStates } from "$lib/stores";
    const dispatch = createEventDispatcher();
</script>

<div class="component">
    <p>Room #32987</p>
    <div class="stroke-display">
        <p>Stroke Overview</p>
        <div style="background-color: {$strokeColor}; width: {$strokeWidth * 1.15}px;"></div>
    </div>
    {#if $savedStates.length || $redoStates.length}
        <button on:click={() => dispatch("clear")}>Clear</button>
    {/if}
    {#if $savedStates.length}
        <button on:click={() => dispatch("undo")}>Undo</button>
    {/if}
    {#if $redoStates.length}
        <button on:click={() => dispatch("redo")}>Redo</button>
    {/if}
    <button on:click={() => dispatch("logData")}>Log data <br>(in console)</button>
    <div class="color-selector-container">
        {#each $availableColors as { name, hex }}
            <button
                class="color-selector"
                title={name}
                style="background-color: {hex};"
                on:click={() => $strokeColor = hex}
            ></button>
        {/each}
    </div>
    <input type="range" min="2" max="40" step="2" bind:value={$strokeWidth}>
    <p>Stroke width: {$strokeWidth}</p>
    <a href="/">Go back to<br>main menu</a>
    <div class="to-be-deleted">
        <p>Under Construction</p>
        <a href="https://vision-project-showcase.pages.dev/" target="_blank">Visit our website<br> for more projects</a>
    </div>

    {#if $isDrawingPlaying}
        <div class="play-block-screen">
            <p>Playing</p>
            <button on:click={() => dispatch("stopAnimation")}>Stop</button>
        </div>
    {/if}
</div>

<style>
    .component {
        /* width: 200px; */
        padding: .5rem;

        /* to be deleted */
        display: flex;
        gap: .5rem;
        flex-direction: column;
        border-right: 1px solid white;
        position: relative;
    }

    .to-be-deleted {
        margin-top: auto;
    }

    /* to be deleted */
    button {
        width: max-content;
    }

    .color-selector-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: .5rem;
        max-width: max-content;
    }

    .color-selector {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 0;
        border: 0;
        background-color: red;
    }

    .stroke-display p {
        margin-bottom: .5rem;
    }

    .stroke-display > div {
        width: 30px;
        aspect-ratio: 1;
        border-radius: 50%;
        margin: auto;
    }

    .play-block-screen {
        background-color: black;
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }

    @media (max-width: 1000px) {
        .component {
            flex-direction: row;
            flex-wrap: wrap;
            border: 0;
            border-bottom: 1px solid white;
        }   
    }
</style>