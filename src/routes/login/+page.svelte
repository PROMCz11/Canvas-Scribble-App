<script>
    import { insertCookie } from "$lib/cookieHandlers";
    let email, password;
    const login = () => {
        if(!email || !password) {
            // Needs better validation
            console.log("Provide valid info");
        }
        fetch("https://canvas-scribble-app.onrender.com/api/player/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => {
            if(json.status) {
                const authToken = json.data.authToken;
                insertCookie("authToken", authToken);
                // goto lobby
            }

            else {
                console.log(json.message);
            }
        })
        .catch(err => console.log(err));
    }
</script>

<main>
    <div class="login-info">
        <h2>Login to your account</h2>
        <p>Email</p>
        <input
        on:keydown={e => {
            if(e.key === "Enter") {
                login();
            }
        }}
        bind:value={email} type="text" placeholder="example@gmail.com">
        <p>Password</p>
        <input
        on:keydown={e => {
            if(e.key === "Enter") {
                login();
            }
        }}
        bind:value={password} type="text" placeholder="Enter your password">
    </div>
    <button on:click={login}>Login</button>
    <div>
        <p>Don't have an account?</p>
        <a href="signup">Signup</a>
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

    .login-info > p {
        margin-top: 1rem;
    }

    main > div:not(.login-info) {
        text-align: center;
    }

    input[type="text"] {
        width: 100%;
    }
</style>