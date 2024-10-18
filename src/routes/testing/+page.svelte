<script>
    import { io } from "socket.io-client";
	import { onMount } from "svelte";

    let socket;

    onMount(() => {
        socket = io("https://canvas-scribble-app.onrender.com", {
            query: {roomToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tSWQiOiI2NzEyNDhiODk0NTk2NDVkNjkxNGNjNzgiLCJpYXQiOjE3MjkyNTE1MTIsImV4cCI6MTczMjg1MTUxMn0.6DYtEtToStBzISdSizxB7hSBw3Zw06K17ZnvP5gFYiI"},
            transports: ["websocket"]
        });

        socket.on("connect", () => {
            console.log("socket connection established");
        });

        socket.on("players", (playersFromSocket) => {
            players = playersFromSocket;
            console.log(playersFromSocket);
        })

        socket.on("send", (message) => {
            console.log("From server: " + message);
        })
    })

    let players = [];
    const sendHello = () => {
        socket.emit("sendMessage", "Hello");
    }
</script>

<main>
    <button on:click={sendHello}>Send "Hello"</button>
    {#each players as { username }}
        <p>{username}</p>
    {/each}
</main>

<style>

</style>