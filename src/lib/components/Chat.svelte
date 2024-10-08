<script>
    let messages = [
        // {content: "galaxy"},
        // {content: "night"},
        // {content: "dog"},
        // {content: "laundry"},
        // {content: "chair"},
        // {content: "dispair"},
        // {content: "person"},
    ]

    const sendMessage = content => {
        // socket emit a message* event
        messages = [...messages, {content: content}];
    }
</script>

<div class="component">
    <div class="messages-container">
        {#each messages as { content }}
            <div class="message">
                {content}
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
    }

    .message:not(.message:last-of-type) {
        border-bottom: 1px solid #757575;
    }
</style>