<template>
  <div>
     <!-- <p> {{ selectedSeasonNumber.season }} </p> -->

    <div id="selectedSeasonEpisodes">
      <!-- <p v-bind:id="'seasonTitle'" v-if="selectedSeasonTitle">{{ selectedSeasonTitle }}</p> -->

      <div v-on:click="fetchEpisodeDetails(selectedSeason, episode.episode_number)" v-for="episode in selectedSeasonEpisodes" v-bind:key="episode.episode_number" class="episode" v-bind:id="'season#' + selectedSeason + 'episode#' + episode.episode_number">
        <p v-bind:id="'episode#' + episode.episode_number + 'Title'" class="episodeTitle"><b>#{{episode.episode_number}} • {{episode.air_date}} • {{episode.name}}</b></p>

        <div v-bind:id="'season#' + selectedSeason + 'episode#' + episode.episode_number + 'Details'" class="episodeDetail" style="display: none;">
            <img v-if="episode.still_path" v-bind:id="'season#' + selectedSeason + 'episode#' + episode.episode_number + 'Image'" class="episodeImage" v-bind:src="'https://www.themoviedb.org/t/p/w227_and_h127_bestv2' + episode.still_path"> 
            <p v-if="episode.overview" v-bind:id="'season#' + selectedSeason + 'episode#' + episode.episode_number + 'Overview'" class="episodeOverview">{{ episode.overview }}</p>
            <p v-else v-bind:id="'season#' + selectedSeason + 'episode#' + episode.episode_number + 'Overview'" class="episodeOverview">Episode description not available</p>
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
        // let className = "asdjaksdjasdaksd"

        async function fetchEpisodeDetails(season, episode) {
            // let url = "https://api.themoviedb.org/3/tv/456/season/" + season + "/episode/" + episode + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
            // let episodeData = null
            
            // localStorageData = localStorage.getItem("savedSeasons")
            // var checkLocalStorage = JSON.parse(localStorageData)

            // checkLocalStorage.forEach(eps => {
            //     if(eps.text == "season" + season)
            //     {
            //         episodeData = eps
            //         selectedEpisode = episodeData.episodes[episode - 1]
            //         console.log("season#" + season + " episode#" + episode + " loaded from localStorage")
            //         // console.log(episodeData)
            //         // console.log(episodeData.episodes[episode - 1])
            //     }
            // })
            
            //episode is not saved in localStorage
            // if(!checkLocalStorage.includes("season" + season + "episode" + episode))
            // {
            //     await fetch(url, {method: 'get'})
            //     .then((response) => {
            //         return response.json()
            //     })
            //     .then((data) => {
            //         // console.log(data)
            //         episodeData = data
            //         console.log("data from API")
            //     })

            //     localStorageData.push({season: season, episode: episode, still_path: episodeData.still_path, overview: episodeData.overview, text: 'season' + season + 'episode' + episode})
            //     localStorage.setItem("savedData", JSON.stringify(localStorageData))
            //     // console.log(localStorageData)
            // }
            // //episode is saved in localStorage
            // else
            // {
            //     let savedEpisodes = JSON.parse(localStorage.getItem("savedData"))
                
            //     savedEpisodes.forEach(eps => {
            //         if(eps.text == "season" + season + "episode" + episode)
            //         {
            //             episodeData = eps
            //             console.log("data from localStorage")
            //         }
            //     })
            // }
           
            var episodeTitle = document.getElementById('season#' + season + 'episode#' + episode + 'Title')
            var episodeDetails = document.getElementById('season#' + season + 'episode#' + episode + 'Details')
            var episodeImage = document.getElementById('season#' + season + 'episode#' + episode + 'Image')
            var episodeOverview = document.getElementById('season#' + season + 'episode#' + episode + 'Overview')
            // console.log(episodeDetails)
            // console.log(episodeImage)
            // console.log(episodeOverview)

            // episodeDetails.className = 'episodeDetailsShow'
            // episodeImage.src = "https://www.themoviedb.org/t/p/w227_and_h127_bestv2" + selectedEpisode.still_path
            // episodeOverview.style.backgroundColor = "black"
            // episodeOverview.style.color = "white"
            // episodeOverview.innerText = selectedEpisode.overview
            // console.log(episodeDetails.style.display)
            
            if(episodeDetails.style.display == "none")
            {
                episodeDetails.style.display = "block"
            }
            else if(episodeDetails.style.display == "block")
            {
                episodeDetails.style.display = "none"
            }
        }

        return {
            //variables
            selectedSeasonEpisodes,
            selectedSeasonTitle,
            selectedSeason,
            // className,

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
    margin-top: 0px;
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
    background-color: #feda0fc2;
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
      width: 100%;
  }

  .episode {
    width: 96vw;
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