
<script>
import { store } from "./store";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";


export default {
  data() {
    return {

      store,
    }
  },

  components: {
    AppHeader,
    AppMain,
  },

  created() {
    this.initialShowcase();
    this.genresArrayCreation();
  },

  methods: {

    initialShowcase() {
      let newAPIshowcase = this.store.APIbase + this.store.APIinitialShowcase + this.store.APIkey;
      axios.get(newAPIshowcase).then((res) => {
        this.store.showcaseList = res.data.results;
      });

      let newAPIshowcaseSeries = this.store.APIbase + this.store.APIinitialShowcaseSeries + this.store.APIkey;
      axios.get(newAPIshowcaseSeries).then((res) => {
        this.store.showcaseListSeries = res.data.results;
      });

    },

    genresArrayCreation() {
      let newAPIgenereM = this.store.APIbase + this.store.APIgenereMovies + this.store.APIkey;
      axios.get(newAPIgenereM).then((res) => {
        this.store.movieGenresList = res.data.genres;

      });

      let newAPIgenereS = this.store.APIbase + this.store.APIgenereSeries + this.store.APIkey;
      axios.get(newAPIgenereS).then((res) => {
        this.store.seriesGenresList = res.data.genres;

      });

    },

    searchMovie() {
      let newAPImovie = this.store.APIbase + this.store.APImovieSearch + this.store.APIkey + this.store.APIquery + this.store.searchTitle;
      axios.get(newAPImovie).then((res) => {

        this.store.moviesList = res.data.results;

      })
      let newAPIseries = this.store.APIbase + this.store.APIseriesSearch + this.store.APIkey + this.store.APIquery + this.store.searchTitle;
      axios.get(newAPIseries).then((res) => {

        this.store.seriesList = res.data.results;
      })

    },


  }






}
</script>

<template>
  <AppHeader @search="searchMovie()"></AppHeader>
  <AppMain></AppMain>
</template>

<style lang="scss" scoped></style>