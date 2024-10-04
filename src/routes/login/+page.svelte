<script>
    
</script>

<main>
    <div class="login-info">
        <h2>Login to your account</h2>
        <p>Username</p>
        <input type="text" placeholder="Enter your username">
        <p>Password</p>
        <input type="text" placeholder="Enter your password">
    </div>
    <button>Login</button>
    <div>
        <p>Don't have an account?</p>
        <a href="signup">Signup</a>
    </div>
    <a href="/">Go back</a>
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