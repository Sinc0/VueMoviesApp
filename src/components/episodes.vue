<template>
  <div>
     <!-- <p> {{ selectedSeasonNumber.season }} </p> -->

    <div id="selectedSeasonEpisodes">
      <p v-bind:id="'seasonTitle'" v-if="selectedSeasonTitle">{{ selectedSeasonTitle }}</p>
      <div v-on:click="fetchEpisodeDetails(selectedSeason, episode.episode_number)" v-for="episode in selectedSeasonEpisodes" v-bind:key="episode.episode_number" class="episode" v-bind:id="'episode#' + episode.episode_number">
        <p>#{{episode.episode_number}} • {{episode.air_date}} • {{episode.name}}</p>
        <div v-bind:id="'episode#' + episode.episode_number + 'Details'" class="episodeDetail">
            <img v-bind:id="'episode#' + episode.episode_number + 'Image'" class="episodeImage"> 
            <p v-bind:id="'episode#' + episode.episode_number + 'Overview'" class="episodeOverview"></p>
        </div>
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
        const selectedSeasonEpisodes = computed(() => store.getters['simpsonData/selectedSeasonEpisodes'])
        const selectedSeasonTitle = computed(() => store.getters['simpsonData/selectedSeasonTitle'])
        let selectedSeason = selectedSeasonTitle
        let selectedEpisode = null
        let localStorageData = []

        async function fetchEpisodeDetails(season, episode, status) {
            let url = "https://api.themoviedb.org/3/tv/456/season/" + season + "/episode/" + episode + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
            let episodeData = null

            await fetch(url, {method: 'get'})
            .then((response) => {
            return response.json()
            })
            .then((data) => {
                console.log(data)
                episodeData = data
            })

            localStorageData.push({season: season, episode: episode, image: episodeData.still_path, overview: episodeData.overview})
            localStorage.setItem("savedData", JSON.stringify(localStorageData))
            
            var episodeDetails = document.getElementById('episode#' + episode + 'Details')
            var episodeImage = document.getElementById('episode#' + episode + 'Image')
            var episodeOverview = document.getElementById('episode#' + episode + 'Overview')
            
            episodeDetails.style.display = "block"
            episodeImage.src = "https://www.themoviedb.org/t/p/w227_and_h127_bestv2" + episodeData.still_path
            episodeOverview.innerText = episodeData.overview
        }

        return {
            //variables
            selectedSeasonEpisodes,
            selectedSeasonTitle,
            selectedSeason,

            //functions
            fetchEpisodeDetails
        }
    }
}
</script>

<style>
  #selectedSeasonEpisodes
  {
    margin: auto;
    margin-top: 5px;
    width: 1000px;
  }

  #seasonTitle
  {
    display: block;
    margin: 0px;
    margin-bottom: 0px;
    padding: 0px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-top: 10px;
    text-align: left;
    color: black;
    background-color: #FED90F;
    border-bottom: 1px solid blacK;
  }

  .episode
  {
    text-align: left;
    background-color: #FED90F;
  }

  .episode p
  {
    margin: 0px;
    padding: 0px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    color: black;
  }

  .episode:hover
  {
    background-color: #feda0fcb;
  }

  .episodeDetail
  {
     display: none;
  }

  .episodeImage
  {     
      float: right;
      height: 125px;
      padding: 10px;
  }

  .episodeOverview
  {
      height: 125px;
  }
</style>