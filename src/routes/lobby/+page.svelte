<script>
    let isRoomPrivate = false;
    let rooms = [
        {
            id: '3',
            name: "zain's room",
            maxPlayers: 3,
            rounds: 4,
            isPrivate: false,
            password: ''
        },
        {
            id: '3',
            name: "zain's room",
            maxPlayers: 3,
            rounds: 4,
            isPrivate: false,
            password: ''
        },
        {
            id: '3',
            name: "zain's room",
            maxPlayers: 3,
            rounds: 4,
            isPrivate: false,
            password: ''
        },
    ]
</script>

<main>
    <div class="controls">
        <h3>Create a room</h3>
        <p>Name</p>
        <input type="text" placeholder="My Room">
        <p>Max Players</p>
        <input type="number" placeholder="2" min="2" max="8">
        <p>Rounds</p>
        <input type="number" placeholder="1" min="1" max="4">
        <p>Access</p>
        <div class="access">
            <button on:click={() => isRoomPrivate = false} class:selected={!isRoomPrivate}>Public</button>
            <button on:click={() => isRoomPrivate = true} class:selected={isRoomPrivate}>Private</button>
        </div>
        {#if isRoomPrivate}
            <p>Password</p>
            <input type="password" placeholder="room's password">
        {/if}
        <div>
            <button>Create room</button>
        </div>
        <a style="margin-top: .5rem; display: block" href="/">Back to menu</a>
    </div>
    <div class="room-container">
        <h3>Join a room</h3>
        {#each rooms as { id, name, maxPlayers, rounds, isPrivate, password }}
            <div class="room">
                <div>
                    <p>ID</p>
                    <p>{id}</p>
                </div>
                <div>
                    <p>Name</p>
                    <p>{name}</p>
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
            </div>
        {/each}
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

    .room-container {
        flex: 1;
        padding: .5rem;
        padding-top: 0;
        display: flex;
        flex-direction: column;
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

    .room-container h3 {
        position: sticky;
        top: 0;
        padding-top: .5rem;
        background-color: black;
    }

    .room {
        display: flex;
        gap: .5rem;
        align-items: center;
        flex-wrap: wrap;
        padding: .5rem;
        border: 1px solid #a1a1a166;
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
</style>