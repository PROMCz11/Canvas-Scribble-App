<script>
    import { page } from "$app/stores";
    const roomKey = $page.params.roomKey;
    
    import { io } from "socket.io-client";
	import { onMount } from "svelte";

    let socket;

    onMount(() => {
        socket = io("https://canvas-scribble-app.onrender.com", {
            query: {roomToken: roomKey},
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

<button on:click={sendHello}>Say Hello</button>