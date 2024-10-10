<script>
    let messages = [
        {name: "Zain", content: "galaxy"},
        {name: "Mo", content: "night"},
        {name: "Zain", content: "dog"},
        {name: "Mo", content: "laundry"},
        {name: "Zain", content: "chair"},
        {name: "Zain", content: "dispair"},
        {name: "Mo", content: "person"},
    ]

    const sendMessage = content => {
        // socket emit a message* event
        messages = [...messages, {name: "username", content: content}];
    }
</script>

<div class="component">
    <div class="messages-container">
        {#each messages as { name, content }}
            <div class="message">
                <span class="name">{name}: </span><span>{content}</span>
            </div>
        {/each}
    </div>
    <input on:keydown={e => {
        if(e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = "";
        }
    }} type="text" placeholder="Enter your guess">
</div>

<style>
    .component {
        padding: .5rem;
        max-height: 100vh;
        max-height: 100svh;
        overflow: auto;
        border-left: 1px solid white;

        display: flex;
        flex-direction: column;
    }

    input {
        margin-top: auto;
    }

    .message {
        margin-top: .5rem;
        padding-bottom: .5rem;
        word-break: break-all;
    }

    .message .name {
        color: #757575;
    }

    .message:not(.message:last-of-type) {
        border-bottom: 1px solid #757575;
    }
</style>