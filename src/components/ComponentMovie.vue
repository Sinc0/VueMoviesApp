<template>
  <div>
    <!-- check if correct data is loaded -->
    <div v-if="selectedMovie && path == selectedMovie.id">
      <div v-if="selectedMovie && selectedMovie.data.status_code != 34" id="movieInfo">
        <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + selectedMovie.data.poster_path" id="moviePoster" />
        <p v-if="selectedMovie.data.title" id="movieNameText"><b>{{selectedMovie.data.title}}</b></p>
        <p v-if="selectedMovie.data.original_title != selectedMovie.data.title" id="movieOriginalNameText">original title: {{selectedMovie.data.original_title}}</p>
        <p v-if="selectedMovie.data.status" id="movieStatus">status: {{selectedMovie.data.status}}</p>
        <p v-if="selectedMovie.data.release_date" id="movieReleaseDate">release date: {{selectedMovie.data.release_date}}</p>
        <p v-if="selectedMovie.data.runtime" id="movieDuration">duration: {{selectedMovie.data.runtime}} mins</p>
        <p v-if="selectedMovie.data.overview" id="movieDescription">{{selectedMovie.data.overview}}</p>
      </div>

      <div v-if="selectedMovie && selectedMovie.data.status_code == 34">
        <p id="errorMessage"><b>No movie with that id exist</b></p>
      </div>
    </div>

    <!-- if correct data is not loaded -->
    <div v-if="selectedMovie && path != selectedMovie.id">
      <h3> Loading... </h3>
    </div>
  </div>
</template>

<script>
import {ref, toRef, toRefs, reactive, computed, watch, watchEffect, onMounted, onBeforeMount, beforeUpdate, onUpdated, onBeforeUpdate} from 'vue'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route

export default {
    setup() {
      //router
      let path = useRouter().currentRoute.value.params.movieId
      console.log(path)

      //vuex
      const store = useStore() //same as this.$store
      const selectedMovie = computed(() => { return store.getters['showData/selectedMovie']})
      // console.log(selectedMovie.value.id)
      
      //lifecycle hooks
      onMounted(() => {
        if(screen.width < 1024)
        {
          document.getElementById("header").style.display = "block" //display header
        }
        else
        {
          document.getElementById("header").style.display = "none" //display header
        }
        
        window.scrollTo(0,0); //reset scroll to top
      })

      return {
        //variables
        path,

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

  /* #movieInfo p
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px;
  } */
  
  #movieNameText, #movieOriginalNameText, #movieStatus, #movieReleaseDate, #movieDuration, #movieDescription
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px
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

  @media screen and (max-width: 1024px) {
    #movieInfo
    {
      margin: 0px;
      margin: auto;
      margin-top: 1vh;
      margin-bottom: 1.5vh;
      padding: 0px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      width: 88vw;
    }

    #moviePoster 
    {
      position: relative;
      z-index: 1;
      float: none;
      margin: 0px;
      margin-left: -4vw;
      /* margin-top: 10px; */
      padding: 0px;
      height: 80vh;
      width: 96vw;
    }

    #movieNameText, #movieOriginalNameText, #movieStatus, #movieReleaseDate, #movieDuration, #movieDescription
    {
      margin: 0px;
      padding: 0px;
      text-align: center;
    }

    #movieNameText, #movieOriginalNameText
    {
      display: none;
      padding-top: 10px;
    }

    #movieStatus
    {
      padding-top: 10px;
    }

    #movieDescription
    {
      padding-top: 17px;
    }

    #movieDescription
    {
      margin: auto;
      padding-bottom: 10px;
      width: 90%;
    }
  }
</style>