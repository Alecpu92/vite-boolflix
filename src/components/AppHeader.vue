<script>
import { store } from "../store";

export default {
    data() {
        return {

            store,
        }
    },

    emits: ['search'],

}

</script>

<template>
    <div class="header-bg">
        <div class="my-container">


            <a href="../index.html" class="logo">
                <span class="b-logo">B</span><span>oolflix</span>
            </a>
            <div class="input-and-btn">
                <div class="search-bar">
                    <input v-model="store.searchTitle" @keyup="$emit('search')" placeholder="Search..." type="text">
                    <button @click="$emit('search')">Search</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-bg {
    width: 100%;
    background-color: black;
    padding: 2em 0;

    .my-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .input-and-btn {
            display: flex;
            flex-direction: row;
            justify-content: end;
            width: 50%;
        }
    }
}

.logo {
    text-decoration: none;
    color: white;
    font-size: 2.5em;
    font-weight: bold;
    border-radius: 15px;
    padding: 1rem 2rem;
    width: 40%;
    animation:
        shadows 6.5s ease-in-out alternate infinite;

    .b-logo {
        color: #ff0000;
    }
}


@keyframes shadows {
    0% {
        box-shadow: #ff0000 0 0 20px;
    }

    50% {
        box-shadow: #ff0000 0 0 40px;
    }

    75% {
        box-shadow: #ff0000 0 0 30px;
    }

    100% {
        box-shadow: #ff0000 0 0 20px;
    }
}

.search-bar {
    display: flex;
    flex-direction: row;
    gap: 40px;
    width: 100%;

    input {
        width: 70%;
        padding: 4px 2em;
    }

    button {

        border: 1px solid lightgray;
        padding: 1rem 2rem;
        letter-spacing: 1px;


        background-image: linear-gradient(to right,
                #ff0000 0%,
                #ff5757 20%,
                #fca4a4 30%,
                #ff0000 40%,
                #ff5757 80%,
                #fca4a4 90%,
                #ff5757 100%);
        background-size: 200% 200%;

        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;

        border-radius: 20px;
        animation:
            shadows 6.5s ease-in-out alternate infinite,
            backgrounds 8s linear infinite;
    }


    @keyframes shadows {
        0% {
            box-shadow: #ff0000 0 0 20px;
        }

        50% {
            box-shadow: #ff0000 0 0 40px;
        }

        75% {
            box-shadow: #ff0000 0 0 30px;
        }

        100% {
            box-shadow: #ff0000 0 0 20px;
        }
    }

    @keyframes backgrounds {
        to {
            background-position: -200% 0%;
        }
    }

}
</style>