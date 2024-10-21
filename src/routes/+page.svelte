<main>
    <p>This is a project under development by <span><a href="https://vision-project-showcase.pages.dev/" target="_blank">Vision</a></span></p>
    <div class="instructions">
        <p>Follow one of the links below<br>to begin testing</p>
        <div>
            <a href="/lobby"><button>Lobby</button></a>
            <!-- <a href="/signup"><button>Signup</button></a>
            <a href="/login"><button>Login</button></a> -->
            <a href="/room"><button>Sandbox</button></a>
        </div>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
    }

    main > p {
        text-align: center;
        font-size: 1.5rem;
    }

    span {
        padding: .1rem;
        background-color: white;
    }

    span a {
        color: black;
        text-decoration: none;
    }

    .instructions p {
        text-align: center;
    }

    .instructions > div {
        margin-block: .5rem;
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: center;
    }
</style>