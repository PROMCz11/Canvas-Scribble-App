<script>
    // import { io } from "$lib/webSocketConnection.js";
    import { io } from "socket.io-client";
	import { onMount } from "svelte";

    // const socket = io("ws://172.20.10.2:4000", { transports: ["websocket"] });

    // let id = '';
    
    // onMount(() => {
    //     socket.on("connect", () => console.log("connected"));
    //     socket.on("message", (msg) => {
    //         id = msg;
    //         socket.emit("event", "ID from Client: " + id);
    //     });
    //     socket.on("disconnect", () => console.log("disconnected"));
    // });

    let connected = false;
    let nameFromInput = "";

    let socket;

    let players = [];

    const establishConnection = () => {
        socket = io("https://canvas-scribble-app.onrender.com", { transports: ["websocket"] });
        socket.on("connect", () => {
            if(nameFromInput) {
                connected = true;
                socket.emit("name", nameFromInput);
            }
        });
        socket.on("players", (playersFromServer) => players = playersFromServer);
    };
</script>

<main>
    {#if !connected}
    <input on:keydown={e => {
        if(e.key === "Enter") {
            establishConnection();
        }
    }} bind:value={nameFromInput} placeholder="Enter player name" type="text">
    <button on:click={establishConnection}>Connect</button>
    {/if}
    {#if connected}
    <div>
        Players:
        <div class="players">
            {#each players as { name, playerID }}
            <div id={playerID} class="player">{name}</div>
            {:else}
            <p>No players yet</p>
            {/each}
        </div>
    </div>
    {/if}
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;

        padding: .5rem;
    }

    .players {
        display: flex;
        gap: .5rem;
        flex-wrap: wrap;
    }

    .player {
        padding: .5rem;
        border: 1px solid white;
    }
</style>