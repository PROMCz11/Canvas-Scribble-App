<script>
    import { page } from "$app/stores";
    const roomKey = $page.params.roomKey;
    
    import { io } from "socket.io-client";
	import { onMount } from "svelte";
    import { goto } from "$app/navigation";

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

        socket.on("send", (messageData) => {
            const { playerName, message } = messageData;
            messages = [...messages, { playerName: playerName, message: message }];
        })

        socket.on("error", error => {
            console.log(error);
            goto("/lobby");
        });
    })

    let players = [];
    const sendMessage = () => {
        if(!messageContent) return;
        socket.emit("sendMessage", messageContent);
    }

    let messageContent;
    let messages = [];
</script>

<main>
    <input bind:value={messageContent}
    on:keydown={e => {
        if(e.key === "Enter") {
            sendMessage();
            e.target.value = "";
        }
    }}
    type="text" placeholder="Type a message">
    <div class="message-container">
        {#each messages as { playerName, message }}
            <div class="message">
                <span>{playerName}: </span><span>{message}</span>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        padding: .5rem;
    }

    .message-container {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin-block: .5rem;
    }

    .message {
        border: 1px solid;
        padding: .1rem;
    }
</style>