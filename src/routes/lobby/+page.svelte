<script>
    import { getCookie } from "$lib/cookieHandlers";
    let isRoomPrivate = false;
    export let data;
    let { rooms } = data;
    import { goto } from "$app/navigation";

    const getRooms = () => {
        fetch("https://canvas-scribble-app.onrender.com/api/room/getall", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("authToken")}`
            }
        })
        .then(res => res.json())
        .then(json => {
            const roomsObj = json.data.rooms;
            const roomsArr = Object.keys(roomsObj).map(key => roomsObj[key]);
            rooms = roomsArr;
            console.log(roomsArr);
        })
        .catch(err => console.log(err));
    }

    let createName, createMaxPlayers, createRounds, createPassword;
    const createRoom = () => {
        fetch("https://canvas-scribble-app.onrender.com/api/room/create", {
            method: "POST",
            body: JSON.stringify({
                roomName: createName,
                password: createPassword,
                maxPlayers: createMaxPlayers,
                rounds: createRounds,
                isPrivate: isRoomPrivate
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("authToken")}`
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            goto(`room/${json.data.roomToken}`);
        })
        .catch(err => console.log(err));
    }

    // To be edited
    const joinRoom = (roomIDFromDOM) => {
        console.log("working");
        console.log(roomIDFromDOM);
        fetch("https://canvas-scribble-app.onrender.com/api/room/join", {
            method: "PATCH",
            body: JSON.stringify({
                roomId: roomIDFromDOM,
                password: "zain12321"
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("authToken")}`
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            goto(`room/${json.data.roomToken}`);
        })
        .catch(err => console.log(err));
    }

    // mechanism for joining a room, create a dynamic route with a slug, have the slug represent the room's id, a request to that URL triggers a load function that connects to that specific room, if something goes wrong, we're redirected to the lobby with an error message (in the cookies maybe)
</script>

<main>
    <div class="controls">
        <h3>Create a room</h3>
        <p>Name</p>
        <input bind:value={createName} type="text" placeholder="My Room">
        <p>Max Players</p>
        <input bind:value={createMaxPlayers} type="number" placeholder="2" min="2" max="8">
        <p>Rounds</p>
        <input bind:value={createRounds} type="number" placeholder="1" min="1" max="4">
        <p>Access</p>
        <div class="access">
            <button on:click={() => isRoomPrivate = false} class:selected={!isRoomPrivate}>Public</button>
            <button on:click={() => isRoomPrivate = true} class:selected={isRoomPrivate}>Private</button>
        </div>
        {#if isRoomPrivate}
            <p>Password</p>
            <input bind:value={createPassword} type="password" placeholder="room's password">
        {/if}
        <div>
            <button on:click={createRoom}>Create room</button>
        </div>
        <a style="margin-top: .5rem; display: block" href="/">Back to menu</a>
        <!-- to be deleted -->
        <!-- <button on:click={e => joinRoom(e.target.parentElement.id)}>Join<br>Test Room</button> -->
    </div>
    <div class="room-container-wrapper">
        <div class="top-part">
            <h3>Join a room</h3>
            <button on:click={getRooms}>Refresh</button>
        </div>
        <div class="room-container">
            {#each rooms as { roomId, roomName, maxPlayers, rounds, isPrivate, password }}
                <div class="room" id={roomId}>
                    <div>
                        <p>ID</p>
                        <p>{roomId}</p>
                    </div>
                    <div>
                        <p>Name</p>
                        <p>{roomName}</p>
                    </div>
                    <div>
                        <p>Max Players</p>
                        <p>{maxPlayers}</p>
                    </div>
                    <div>
                        <p>Rounds</p>
                        <p>{rounds}</p>
                    </div>
                    <div>
                        {#if isPrivate}
                            <p>Private</p>
                        {:else}
                            <p>Public</p>
                        {/if}
                    </div>
                    <button on:click={e => joinRoom(e.target.parentElement.id)}>Join</button>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
    }

    .controls {
        position: sticky;
        top: 0;
        max-height: 100vh;
        max-height: 100svh;
        padding: .5rem;
    }

    .room-container-wrapper {
        flex: 1;
        padding: .5rem;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .room-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
    }

    .controls input, .access {
        margin-bottom: .5rem;
    }

    button.selected {
        background-color: white;
        color: black;
        border-color: white;
    }

    .room-container-wrapper .top-part {
        position: sticky;
        top: 0;
        padding-top: .5rem;
        background-color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .room {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        /* align-items: center; */
        /* flex-wrap: wrap; */
        padding: .5rem;
        border: 1px solid #a1a1a166;
        max-width: max-content;
    }

    .room > div {
        /* background-color: #1a1a1a; */
        padding: .2rem;
        /* border-radius: 4px; */
    }

    .room > div > p:first-of-type {
        color: #757575;
    }

    .room > div > p:last-of-type {
        color: #b1b1b1;
    }

    .room > button {
        margin-left: auto;
    }
</style>