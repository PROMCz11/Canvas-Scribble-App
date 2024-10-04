<script>
    
</script>

<main>
    <div class="signup-info">
        <h2>Create an account</h2>
        <p>Username</p>
        <input type="text" placeholder="Enter your username">
        <p>Email</p>
        <input type="text" placeholder="Enter your email">
        <p>Password</p>
        <input type="text" placeholder="Enter a new password">
    </div>
    <button>Signup</button>
    <div>
        <p>Already have an account?</p>
        <a href="login">Login</a>
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