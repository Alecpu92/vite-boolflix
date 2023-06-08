<script>
import { store } from "../store";
import SingleCardMovie from "./SingleCardMovie.vue"
import SingleCardSeries from "./SingleCardSeries.vue";

export default {
    data() {
        return {
            store,
            activeHoverStar: '',
        }
    },

    components: {
        SingleCardMovie,
        SingleCardSeries,
    },


    methods: {
        languageToFlagMovie(xx) {

            switch (xx) {
                case "en":
                    xx = "gb";
                    return xx;
                case "ja":
                    xx = "Jp";
                    return xx;
                case "zh":
                    xx = "cn";
                    return xx;
                case "ko":
                    xx = "kr";
                    return xx;
                case "xx":
                    xx = "--";
                    return xx;
                case "hi":
                    xx = "in";
                    return xx;
            }


        },

        voteToStars(num) {
            num = Math.ceil(num / 2);
            return num;
        },

        checkImages(imgPath) {
            let imgUrl;
            if (imgPath != null || imgPath != '' || imgPath != ' ') {
                imgUrl = this.store.APIimgAnteprima + imgPath;
            } else {
                imgUrl = "../../public/img/badDB.png"
            }

            return imgUrl;
        },

        starsHover(index) {
            this.activeHoverStar = index;
        },

        starsHoverReset() {
            this.activeHoverStar = '';
        },

        resetAnteprima() {
            this.store.anteprimaType = '';
            this.store.anteprimaShow = false;
        },

        checkGenere(genere_id, type) {
            console.log(type)
            if (type == 'm') {
                return this.store.movieGenresList.find((elem) => genere_id == elem.id).name
            } else if (type == 's') {
                return this.store.seriesGenresList.find((elem) => genere_id == elem.id).name
            }

        },




    }
}


</script>

<template>
    <div class="ingrandisci" v-if="store.anteprimaShow">
        <button class="anteprima-close" @click="resetAnteprima()"> &cross; </button>
        <div class="anteprima-img">
            <img v-if="store.anteprimaAttiva.poster_path == null" src="../../public/img/badDB.png" alt="">
            <img v-else :src="checkImages(store.anteprimaAttiva.poster_path)" alt="img">
        </div>
        <div class="anteprima-data-bg">
            <div class="anteprima-data">
                <span v-if="store.anteprimaType == 'm' && store.anteprimaType != 's'"><strong>Title: </strong>{{
                    store.anteprimaAttiva.title }}</span>
                <span v-else-if="store.anteprimaType == 's'"><strong>Name: </strong>{{ store.anteprimaAttiva.name }}</span>
                <span v-if="store.anteprimaType == 'm' && store.anteprimaType != 's'"> <strong> Original Title: </strong>({{
                    store.anteprimaAttiva.original_title }})</span>
                <span v-else-if="store.anteprimaType == 's'"> <strong> Original Name: </strong>({{
                    store.anteprimaAttiva.original_name }})</span>
                <p><strong> Overview: </strong>{{ store.anteprimaAttiva.overview }}</p>
                <div class="lang-stars-container small-font">
                    <span>Language:</span>
                    <span>Vote:</span>
                </div>
                <div class="lang-stars-container">
                    <span :class="`fi fi-${languageToFlagMovie(store.anteprimaAttiva.original_language)} `"></span>
                    <div @mouseleave="starsHoverReset()">
                        <i v-for="indice in 5" @mouseover="starsHover(indice)"
                            :class="indice <= activeHoverStar ? 'fa-solid fa-star hover-active' : (indice < voteToStars(store.anteprimaAttiva.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star')"></i>
                    </div>
                </div>
                <!-- add genere e cast-->
                <div class="genere-container">
                    <strong>Genres: </strong>
                    <span v-for="genere_id in store.anteprimaAttiva.genre_ids"> {{ checkGenere(genere_id,
                        store.anteprimaType) }}</span>

                </div>

            </div>
        </div>

    </div>


    <div class="my-container" v-if="store.searchTitle == ''">
        <h2>Trending Movies:</h2>
        <div class="showcase">
            <SingleCardMovie v-for="movie in store.showcaseList" :movie="movie"></SingleCardMovie>
        </div>
    </div>
    <div class="my-container" v-if="store.searchTitle == ''">
        <h2>Trending Series:</h2>
        <div class="showcase">
            <SingleCardSeries v-for="series in store.showcaseListSeries" :series="series"></SingleCardSeries>
        </div>
    </div>
    <!--film con ricerca------------------------------------------------------------------->
    <div class="my-container" v-if="store.moviesList.length > 0">
        <h2>Movies:</h2>
        <div class="cards-container">
            <SingleCardMovie v-for="movie in store.moviesList" :movie="movie"></SingleCardMovie>
        </div>
    </div>
    <div v-else-if="store.searchTitle != ''" class="no-res-container">
        <h2>Movies:</h2>
        No results found
    </div>
    <!--serie con ricerca--------------------------------------------------------------------->
    <div class="my-container" v-if="store.seriesList.length > 0">
        <h2>Series:</h2>
        <div class="cards-container">
            <SingleCardSeries v-for="series in store.seriesList" :series="series"></SingleCardSeries>
        </div>
    </div>
    <div v-else-if="store.searchTitle != ''" class="no-res-container">
        <h2>Series:</h2>
        No results found
    </div>
</template>

<style lang="scss" scoped>
.ingrandisci {
    width: 100%;
    height: 500px;

    position: relative;

    .anteprima-close {
        position: absolute;
        right: 1em;
        top: 1em;

        background-color: black;
        color: grey;
        opacity: 0.4;
        border-radius: 50%;

        border: 1px solid grey;
        font-size: 1.5em;
        padding: 0.2em 0.4em;

        z-index: 2;

        &:hover {
            opacity: 1;
        }
    }


    .anteprima-data-bg {
        display: none;
        height: 100%;
        width: 100%;

        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right,
                rgba(0, 0, 0, 0.8) 10%,
                rgba(0, 0, 0, 0.6) 40%,
                rgba(0, 0, 0, 0.4) 100%);
    }



    .anteprima-data {
        display: flex;
        flex-direction: column;
        gap: 1em;

        padding: 2em;

        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 60%;
        color: white;



        .small-font {
            font-size: 0.8em;
        }

        .fa-star {
            color: orange;

            &.hover-active {
                color: white;
            }
        }

        .genere-container {
            display: flex;
            flex-direction: row;

            gap: 1em;
        }

        .lang-stars-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 30%;
            gap: 1em;
        }
    }


    .anteprima-img {

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        overflow: hidden;



        img {
            width: 100%;

        }

    }

}

.ingrandisci:hover .anteprima-data-bg {
    display: block;

}



.my-container h2 {
    padding-top: 1em;
}

.cards-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    gap: 1em;

    overflow-x: auto;

    max-width: 95%;
    margin: 0 auto;
    padding: 2em 0;
}

.no-res-container {
    max-width: 95%;
    margin: 0 auto;
    padding: 1em 0;
}

.showcase {
    display: flex;
    flex-direction: row;
    gap: 2em;

    overflow-x: auto;

    max-width: 95%;
    margin: 0 auto;
    padding: 2em 0;
}</style>