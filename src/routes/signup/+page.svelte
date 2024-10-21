<script>
    import { insertCookie } from "$lib/cookieHandlers";
    import { goto } from "$app/navigation";
    let username, email, password;
    let loading = false;
    const signup = () => {
        loading = true;
        errorMessage = "";
        if(!email || !password || !username) {
            // Needs better validation
            console.log("Provide valid info");
        }
        fetch("https://canvas-scribble-app.onrender.com/api/player/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            loading = false;
            if(json.status) {
                const authToken = json.data.authToken;
                insertCookie("authToken", authToken);
                console.log("signed up successfully");
                goto("lobby");
            }

            else {
                console.log(json.message);
                errorMessage = json.message;
            }
        })
        .catch(err => {
            console.log(err);
            errorMessage = err;
        });
    }

    let errorMessage = "";
</script>

<main>
    <div class="signup-info">
        <h2>Create an account</h2>
        <p>Username</p>
        <input
        on:keydown={e => {
            if(e.key === "Enter") {
                signup();
            }
        }}
        bind:value={username} type="text" placeholder="Enter your username">
        <p>Email</p>
        <input
        on:keydown={e => {
            if(e.key === "Enter") {
                signup();
            }
        }}
        bind:value={email} type="email" placeholder="Enter your email">
        <p>Password</p>
        <input
        on:keydown={e => {
            if(e.key === "Enter") {
                signup();
            }
        }}
        bind:value={password} type="password" placeholder="Enter a new password">
    </div>
    {#if errorMessage}  
        <p style="color: red;">{errorMessage}</p>
    {/if}
    {#if loading}
        <p>Checking...</p>
    {/if}
    <button on:click={signup}>Signup</button>
    <div>
        <p>Already have an account?</p>
        <a href="login">Login</a>
    </div>
    <a href="/">Back to menu</a>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .signup-info > p {
        margin-top: 1rem;
    }

    main > div:not(.signup-info) {
        text-align: center;
    }

    input[type="text"] {
        width: 100%;
    }
</style>