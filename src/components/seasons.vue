<template>
  <div class="hello">
    
    <!-- <p>{{ vuexCounter }}</p> -->
    <!-- <p>{{ vuexName }}</p> -->
    <!-- <p>{{ vuexTodo }}</p> -->
    <!-- <p>{{ vuexSelectedSeason }}</p> -->

    <div id="scrollBarSeasons" v-if="showInfo != null">
      <div v-on:click="fetchShowSeason(season.season_number)" v-for="season in showInfo.seasons" v-bind:key="season.id" class="season" v-bind:id="'season#' + season.season_number">
        <p><b>{{season.name}}</b></p>
        <img v-bind:src="'https://www.themoviedb.org/t/p/w58_and_h87_face' + season.poster_path" class="seasonImage">
      </div>
    </div>

  </div>
</template>

<script>
import {ref, reactive, computed} from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
      //vuex
      const store = useStore() //same as this.$store
      const selectedSeason = computed(() => store.getters['simpsonData/selectedSeason'])
      const counter = computed(() => store.state.simpsonData.counter)
      const name = computed(() => store.getters['simpsonData/name'])
      const todos = computed(() => store.getters['simpsonData/doneTodos'])

      //variables
      let showInfo = reactive({
        name: null,
        description: null,
        seasons: null,
        episodes: null
      })

      let seasonInfo = reactive({
        episodes: null
      })

      //functions
      async function fetchShow()
      {
          await fetch('https://api.themoviedb.org/3/tv/456?api_key=3010e2bf9f8b7fbc8e38ec004850995b', {method: 'get'})
          .then((response) => {
              return response.json()
          })
          .then((data) => {
            console.log(data)
            showInfo.name = data.name
            showInfo.description = data.overview
            showInfo.seasons = data.seasons.slice().reverse()
            showInfo.episodes = data.number_of_episodes
          })

          store.dispatch('simpsonData/actionSetCounter', 123) //alternative syntax: store.dispatch({type: 'actionSetCounter', value: 10000000 })
      }

      fetchShow()

      async function fetchShowSeason(season)
      {
          var url = "https://api.themoviedb.org/3/tv/456/season/" + season + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
          var seasonData = null
          var seasonNumber = null
          var numberOfEpisodes = null
          var airDate = null
          // console.log(seasons.length)

          await fetch(url, {method: 'get'})
          .then((response) => {
              return response.json()
          })
          .then((data) => {
              console.log(data)
              
              seasonInfo.episodes = data.episodes
              seasonData = {title: data.season_number, episodes: data.episodes}
              seasonNumber = data.season_number
              numberOfEpisodes = data.episodes.length
              airDate = data.air_date

              store.dispatch('simpsonData/actionSetSelectedSeason', seasonData)
          })

          var selectedDiv = document.getElementById("season#" + season)
          var seasons = document.getElementsByClassName("season")
          // var selectedSeasonTitle = document.getElementById("seasonTitle")
          var numberOfEpisodes = seasons.length
          var airDate = null
          // console.log(seasons.length)

          for(var c = 0; c < seasons.length; c++)
          {
              document.getElementById("season#" + [c]).style.opacity = "50%"
          }

          selectedDiv.style.opacity = "100%"
          // selectedSeasonTitle.style.display = "block"
          // selectedSeasonTitle.innerText = numberOfEpisodes + " episodes"
      }
       
      return {
        fetchShow,
        fetchShowSeason,
        showInfo,
        seasonInfo,
        selectedSeason,
        vuexSelectedSeason: selectedSeason,
        // vuexSelectedEpisode: selectedEpisode,
        vuexCounter: counter,
        vuexName: name,
        vuexTodo: todos
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #scrollBarSeasons 
  {
    margin: auto;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    width: 1000px;
  }

  #scrollBarSeasons p 
  {
    margin: 0;
    padding: 0;
    padding: 2.5px;
    width: 200px;
    white-space: normal;
    color: black;
  }

  .season 
  {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin-right: 15px;
    margin-bottom: 5px;
    padding: 10px;
    /* width: 500px; */
    /* opacity: 50%; */
    border: 1px solid gray;
    background-color: #FED90F;
  }

  .seasonImage 
  {
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
  }
  
  ::-webkit-scrollbar {
    /* display: none; */
    
  }
</style>
