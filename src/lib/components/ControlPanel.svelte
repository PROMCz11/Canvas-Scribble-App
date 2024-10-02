<script>
    import { createEventDispatcher } from "svelte";
    import { drawing } from "$lib/stores";
    import { strokeColor } from "$lib/stores";
    import { strokeWidth } from "$lib/stores";
    import { isDrawingPlaying } from "$lib/stores";
    import { availableColors } from "$lib/stores";
    import { history } from "$lib/stores";
    const dispatch = createEventDispatcher();
</script>

<div class="component">
    <p>Room #32987</p>
    <div class="stroke-display">
        <p>Stroke Overview</p>
        <div style="background-color: {$strokeColor}"></div>
    </div>
    <button on:click={() => dispatch("play")}>Play</button>
    <button on:click={() => dispatch("clear")}>Clear</button>
    <button on:click={() => dispatch("undo")}>Undo</button>
    {#if $history.length}
        <button on:click={() => dispatch("redo")}>Redo</button>
    {/if}
    <button on:click={() => console.log($drawing)}>Display<br>Positions<br>(in console)</button>
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
    <div class="to-be-deleted">
        <p>Under Construction</p>
        <a href="https://vision-project-showcase.pages.dev/" target="_blank">Visit our website<br> for more projects</a>
    </div>

    {#if $isDrawingPlaying}
        <div class="play-block-screen">
            Playing
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
        height: 30px;
        border-radius: 50%;
        margin: auto;
    }

    .play-block-screen {
        background-color: black;
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
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