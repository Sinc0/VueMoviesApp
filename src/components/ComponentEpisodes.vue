<template>
  <div>
    <div v-if="selectedSeason" id="selectedSeasonEpisodes">
      <div v-on:click="fetchEpisodeDetails(selectedSeason.season, episode.episode_number)" v-for="episode in selectedSeason.episodes.slice().reverse()" v-bind:key="episode.episode_number" class="episode" v-bind:id="'season#' + selectedSeason.season + 'episode#' + episode.episode_number">
        <p v-bind:id="'episode#' + episode.episode_number + 'Title'" class="episodeTitle"><b>#{{episode.episode_number}} • {{episode.air_date}} • {{episode.name}}</b></p>

        <div v-bind:id="'season#' + selectedSeason.season + 'episode#' + episode.episode_number + 'Details'" class="episodeDetail">
            <img v-if="episode.still_path" v-bind:id="'season#' + selectedSeason.season + 'episode#' + episode.episode_number + 'Image'" class="episodeImage" v-bind:src="'https://www.themoviedb.org/t/p/w227_and_h127_bestv2' + episode.still_path"> 
            <p v-if="episode.overview" v-bind:id="'season#' + selectedSeason.season + 'episode#' + episode.episode_number + 'Overview'" class="episodeOverview">{{ episode.overview }}</p>
            <p v-else v-bind:id="'season#' + selectedSeason.season + 'episode#' + episode.episode_number + 'Overview'" class="episodeOverview">Episode description not available</p>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import {ref, reactive, computed, onUpdated} from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
        //vuex
        const store = useStore() //same as this.$store
        const selectedSeason = computed(() => store.getters['showData/selectedSeason'])
 
        //variables
        let selectedEpisode = null
        let localStorageData = []

        //lifecycle hooks
        onUpdated(() => {
          console.log("episode list updated")
          
          //display episode list
          displayEpisodeList()

          //collapse episodes
          var numberOfEpisodes = document.getElementsByClassName("episodeDetail").length
          collapseAllEpisodes(numberOfEpisodes)
        })

        async function fetchEpisodeDetails(season, episode) 
        {
            var episodeTitle = document.getElementById('season#' + season + 'episode#' + episode + 'Title')
            var episodeDetails = document.getElementById('season#' + season + 'episode#' + episode + 'Details')
            var episodeImage = document.getElementById('season#' + season + 'episode#' + episode + 'Image')
            var episodeOverview = document.getElementById('season#' + season + 'episode#' + episode + 'Overview')
            
            if(episodeDetails.style.display == "none")
            {
                episodeDetails.style.display = "block"
            }
            else if(episodeDetails.style.display == "block")
            {
                episodeDetails.style.display = "none"
            }
        }

        function displayEpisodeList()
        {
          var selectedSeasonEpisodes = document.getElementById("selectedSeasonEpisodes")

          if(selectedSeasonEpisodes != null)
          {
              selectedSeasonEpisodes.style.display = "block"
          }
        }

        function collapseAllEpisodes(numberOfEpisodes)
        {
          for(var c = 0; c < numberOfEpisodes; c++)
          {
            var z = document.getElementsByClassName("episodeDetail")[c].id
            var e = document.getElementById(z)

            e.style.display = "none"
          }
        }

        return {
            //variables
            selectedSeason,

            //functions
            fetchEpisodeDetails
        }
    }
}
</script>

<style scoped>
  #selectedSeasonEpisodes
  {
    margin: auto;
    margin-top: 0px;
    width: 1000px;
    border-top: 1px solid black;
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
    cursor: pointer;
    background-color: #f5e06b;
  }

  .episodeTitle
  {
      color: black;
  }

  .episodeDetail
  {
      /* background-color: black; */
      /* color: white; */
  }

  .episodeImage
  {     
      float: right;
      height: 125px;
      padding: 10px;
  }

  .episodeOverview
  {
      min-height: 125px;
  }

  @media screen and (max-width: 1024px) {
  #selectedSeasonEpisodes {
      width: 94vw;
  }

  .episode {
    margin: auto;
    width: 94vw;
  }

  .episode p {
    margin: 0px;
    padding: 10px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    color: black;
  }
  
  .episodeDetail
  {
      /* overflow: scroll; */
  }

  .episodeImage
  {
      display: none;
  }

  .episodeOverview {
      min-height: 75px;
  }
}
</style>