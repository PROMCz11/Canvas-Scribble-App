<script>
    import { createEventDispatcher } from "svelte";
    import { drawing } from "$lib/stores";
    const dispatch = createEventDispatcher();
</script>

<div class="component">
    <p>Room #32987</p>
    <button on:click={() => dispatch("play")}>Play</button>
    <button on:click={() => dispatch("clear")}>Clear</button>
    <button on:click={() => console.log($drawing)}>Display<br>Positions<br>(in console)</button>
    <div class="to-be-deleted">
        <p>Under Construction</p>
        <a href="https://vision-project-showcase.pages.dev/" target="_blank">Visit our website<br> for more projects</a>
    </div>
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
    }

    .to-be-deleted {
        margin-top: auto;
    }

    /* to be deleted */
    button {
        width: max-content;
    }
</style>