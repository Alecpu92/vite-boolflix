import { reactive } from 'vue';

export const store = reactive({
    moviesList: [],
    seriesList: [],
    showcaseList: [],
    showcaseListSeries: [],

    movieGenresList: [],
    seriesGenresList: [],
    genereName: '',

    APIgenereMovies: 'genre/movie/list',
    APIgenereSeries: 'genre/tv/list',
    APIbase: 'https://api.themoviedb.org/3/',
    APImovieSearch: 'search/movie',
    APIseriesSearch: 'search/tv',
    APIinitialShowcase: 'trending/movie/week',
    APIinitialShowcaseSeries: 'trending/tv/week',
    APIkey: '?api_key=77baba3cdb35d0a17d7dd7512e868f9f',
    APIquery: '&query=',

    APIimgCard: 'https://image.tmdb.org/t/p/w342',
    APIimgAnteprima: 'https://image.tmdb.org/t/p/w780',

    searchTitle: '',

    anteprimaAttiva: {},
    anteprimaShow: false,
    anteprimaType: '',
})