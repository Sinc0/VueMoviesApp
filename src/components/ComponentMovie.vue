<template>
  <div> 
    <div v-if="selectedMovie && selectedMovie.data.status_code != 34" id="movieInfo">
      <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + selectedMovie.data.poster_path" id="moviePoster" />
      <p v-if="selectedMovie.data.title" id="movieNameText"><b>{{selectedMovie.data.title}}</b></p>
      <p v-if="selectedMovie.data.original_title">original title: {{selectedMovie.data.original_title}}</p>
      <p v-if="selectedMovie.data.status" id="movieStatus">status: {{selectedMovie.data.status}}</p>
      <p v-if="selectedMovie.data.release_date">release date: {{selectedMovie.data.release_date}}</p>
      <p v-if="selectedMovie.data.runtime">duration: {{selectedMovie.data.runtime}} mins</p>
      <p v-if="selectedMovie.data.overview" id="movieDescription">description: {{selectedMovie.data.overview}}</p>
    </div>
    <div v-if="selectedMovie && selectedMovie.data.status_code == 34">
      <p id="errorMessage"><b>No movie with that id exist</b></p>
    </div>
  </div>
</template>

<script>
import {ref, toRef, toRefs, reactive, computed, watch, watchEffect, onMounted, onBeforeMount, beforeUpdate, onUpdated, onBeforeUpdate} from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
      //vuex
      const store = useStore() //same as this.$store
      const selectedMovie = computed(() => { return store.getters['showData/selectedMovie']})

      return {
        //vuex
        selectedMovie
      }
    }

}
</script>

<style scoped>
  #movieInfo {
    margin: auto;
    margin-top: 52px;
    margin-bottom: 15px;
    padding: 10px;
    min-height: 235px;
    width: calc(1000px - 20px);
    text-align: left;
    color: white;
    background-color: black;
  }

  #movieInfo p
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px;
  }

  #movieInfoPosterMissing
  {
    margin: auto;
    margin-top: 0px;
    margin-bottom: 15px;
    padding: 10px;
    min-height: 235px;
    width: calc(1000px - 20px);
    text-align: left;
    color: white;
    background-color: black;
  }

  #movieInfoPosterMissing p
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 5px;
    /* padding-left: 155px; */
  }

  #movieNameLink
  {
    padding-top: 5px;
    text-decoration: none;
    color: white;
  }

  #movieNameLink:hover 
  {
    color: ;
  }

  #movieNameText
  {
    padding-top: 4px;
  }

  #moviePoster 
  {
    position: absolute;
    z-index: 1;
    float: left;
    margin: 0px;
    margin-left: -30px;
    margin-top: -47px;
    padding: 0px;
    height: 260px;
    width: 170px;
    /* border: 1px solid black; */
  }

  #movieStatus
  {
    padding-top: ;
  }

  #movieDescription 
  {
    padding-top: 0px;
    width: ;
    opacity: 75%;
  }

  #errorMessage
  {
    color: black;
  }

</style>