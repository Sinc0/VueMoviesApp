<template>
  <div>
    <!-- check if correct data is loaded -->
    <div v-if="selectedShow && path == selectedShow.id">
      <!-- if show have poster -->
      <div id="showInfo" v-if="showInfo.data && showInfo.data.data.poster_path"> <!-- v-if="showInfo.data.id == showId" -->
        <img v-if="showInfo.data && showInfo.data.data.poster_path" id="showPoster" v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + showInfo.data.data.poster_path"/>
        <a v-if="showInfo.data" id="showNameLink" v-bind:href="showInfo.data.data.homepage"></a>
        <a id="showNameLink"><p id="showNameText">{{showInfo.data.name}}</p></a>
        <p v-if="showInfo.data.data.homepage" id="showHomePage">Homepage: {{showInfo.data.data.homepage}}</p>
        <p v-if="showInfo.data" id="showStatus">Status: {{showInfo.data.data.status}}</p>
        <p v-if="showInfo.data && showInfo.data.data.number_of_episodes != 0" id="showNumberOfEpisodes">Total Episodes: {{showInfo.data.data.number_of_episodes}}</p>
        <p v-if="showInfo.data && showInfo.data.data.number_of_seasons != 0" id="showNumberOfSeasons">Total Seasons: {{showInfo.data.data.number_of_seasons}}</p>
        <p v-if="showInfo.data && showInfo.data.data.last_air_date != null" id="showLastEpisode">Last Episode: {{showInfo.data.data.last_air_date}}</p>
        <p v-if="showInfo.data && showInfo.data.data.next_episode_to_air && showInfo.data.data.status != 'Ended'" id="showNextEpisode">Next Episode: {{showInfo.data.data.next_episode_to_air.air_date}}</p>
        <p v-if="showInfo.data" id="showDescription">{{showInfo.data.data.overview}}</p>
      </div>
      
      <!-- if show missing poster -->
      <div v-else-if="showInfo.data" id="showInfoPosterMissing"> <!-- v-if="showInfo.data.id == showId" -->
        <a v-if="showInfo.data" id="showNameLink" v-bind:href="showInfo.data.data.homepage"></a>
        <a id="showNameLink"><p id="showNameText">{{showInfo.data.name}}</p></a>
        <p v-if="showInfo.data.data.homepage" id="showHomePage">Homepage: {{showInfo.data.data.homepage}}</p>
        <p v-if="showInfo.data" id="showStatus">Status: {{showInfo.data.data.status}}</p>
        <p v-if="showInfo.data && showInfo.data.data.number_of_episodes != 0" id="showNumberOfEpisodes">Total Episodes: {{showInfo.data.data.number_of_episodes}}</p>
        <p v-if="showInfo.data && showInfo.data.data.number_of_seasons != 0" id="showNumberOfSeasons">Total Seasons: {{showInfo.data.data.number_of_seasons}}</p>
        <p v-if="showInfo.data && showInfo.data.data.last_air_date != null" id="showLastEpisode">Last Episode: {{showInfo.data.data.last_air_date}}</p>
        <p v-if="showInfo.data && showInfo.data.data.next_episode_to_air && showInfo.data.data.status != 'Ended'" id="showNextEpisode">Next Episode: {{showInfo.data.data.next_episode_to_air.air_date}}</p>
        <p v-if="showInfo.data" id="showDescription">{{showInfo.data.data.overview}}</p>
      </div>

      <!-- if show has seasons -->
      <div v-if="showInfo.data && showInfo.data.data.number_of_seasons != 0" id="scrollBarSeasons">
        <div v-on:click="fetchShowSeason(showInfo.data.id, season.season_number)" v-for="season in showInfo.data.data.seasons.slice().reverse()" v-bind:key="season.id" class="season" v-bind:id="'season#' + season.season_number">
          <p><b>{{season.name}}</b></p>
          <img v-if="season.poster_path" v-bind:src="'https://www.themoviedb.org/t/p/w58_and_h87_face' + season.poster_path" class="seasonImage">
          <img v-else v-bind:src="''" class="seasonImageMissing">
        </div>
      </div>
    </div>

    <!-- if show does not exist -->
    <div v-if="showInfo.data != null && showInfo.data.data.status_code == 34">
        <p id="errorMessage"><b>No show with that id exist</b></p>
    </div>

    <!-- if correct data is not loaded -->
    <div v-else-if="selectedShow && path != selectedShow.id">
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
      let path = useRouter().currentRoute.value.params.showId

      //vuex
      const store = useStore() //same as this.$store
      const selectedShow = computed(() => { return store.getters['showData/selectedShow']})
      const selectedSeason = computed(() => { return store.getters['showData/selectedSeason']})

      //variables
      var seasonData = null
      var seasonData = null
      var seasonNumber = null
      var showId = null
      var numberOfEpisodes = null
      var airDate = null
      var url = null
      var localStorageData = []

      let showInfo = reactive({
        data: selectedShow,
        name: null,
        description: null,
        status: null,
        poster: null,
        homePage: null,
        numberOfSeasons: null,
        seasons: null,
        numberOfEpisodes: null,
        episodes: null
      })

      let seasonInfo = reactive({
        data: selectedSeason
      })

      const seasonInfoRefs = toRefs(seasonInfo)

      //lifecycle hooks
      watch(seasonInfoRefs.data, (newValue, oldValue) => {
        selectedSeasonOpacityStyling(seasonInfoRefs.data.value.season)
      })
            
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

      //functions
      async function fetchShowSeason(show, season)
      {
          showId = show
          var ls = localStorage.getItem("savedSeasons")
          if(ls)
          {
            localStorageData = JSON.parse(ls)
          }
          var checkLocalStorage = JSON.stringify(localStorageData)
          var diff = null

          //check if season is saved in localStorage
          if(checkLocalStorage.includes("show" + showId + "season" + season))
          {
              localStorageData.forEach(s => {
                      if(s.searchString == "show" + showId + "season" + season)
                      {
                          seasonData = s
                          diff = Math.abs(Date.now() - seasonData.savedAt)
                          
                          //if last fetch was more than 1h ago fetch new data
                          if(diff >= 3600000) //3.600.000 = 1h
                          {
                              localStorageData = localStorageData.filter(showSeason => showSeason.searchString != "show" + showId + "season" + season); //remove old data
                              fetchSeasonDataFromAPI(show, season, localStorageData)
                          }
                          else
                          {
                              //vuex
                              store.dispatch('showData/actionSetSelectedSeason', seasonData)
                          }
                      }
                  })

          }
          else
          {
              fetchSeasonDataFromAPI(show, season, localStorageData)
          }
      }

      async function fetchSeasonDataFromAPI(show, season, localStorageData)
      {
        url = "https://api.themoviedb.org/3/tv/" + show + "/season/" + season + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        seasonNumber = season
        localStorageData = localStorageData
        
        await fetch(url, {method: 'get'})
            .then((response) => {
                  console.log("show#" + show + " - season#" + season + " - fetched from API")
                  return response.json()
            })
            .then((data) => {                
                //set variables
                seasonData = {showId: selectedShow.value.id, showName: selectedShow.value.name, season: data.season_number, episodes: data.episodes}
    
                //save to localStorage
                localStorageData.push({showId: selectedShow.value.id, showName: selectedShow.value.name, season: season, episodes: data.episodes, searchString: "show" + selectedShow.value.id + "season" + season, savedAt: Date.now()})
                localStorage.setItem("savedSeasons", JSON.stringify(localStorageData))
  
                //vuex
                store.dispatch('showData/actionSetSelectedSeason', seasonData)
            })
      }

      function selectedSeasonOpacityStyling(season, numberOfEpisodes)
      {
          //reduce opacity on not selected seasons
          var selectedDiv = document.getElementById("season#" + season)
          var seasons = document.getElementsByClassName("season")
          var seasonSpecials = document.getElementById("season#" + [0])

          if(seasonSpecials != null)
          {
              for(var c = 0; c < seasons.length; c++)
              {
                  document.getElementById("season#" + [c]).style.opacity = ".50"
              }
          }
          else
          {
              for(var c = 1; c <= seasons.length; c++)
              {
                  document.getElementById("season#" + [c]).style.opacity = ".50"
              }
          }

          if(selectedDiv != null)
          {
            selectedDiv.style.opacity = "100"
          } 
      }
       
      return {
        //variables
        showInfo,
        seasonInfo,
        seasonInfoRefs,
        path,

        //vuex
        selectedShow,

        //functions
        fetchShowSeason,
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #showInfo {
    margin: auto;
    margin-top: 40px;
    margin-bottom: 15px;
    padding: 10px;
    min-height: 235px;
    width: calc(1000px - 20px);
    text-align: left;
    color: white;
    background-color: black;
  }

  #showInfo p
  {
    /* margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px; */
  }

  #showStatus, #showNumberOfEpisodes, #showNumberOfSeasons, #showLastEpisode, #showNextEpisode, #showDescription, #showHomePage, #showNameText
  {
    margin: 0px;
    padding: 0px;
    padding-left: 155px;
  }

  #showHomePage, #showDescription
  {
    padding-top: 10px;
  }

  #showInfoPosterMissing
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

  #showInfoPosterMissing p
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 5px;
    /* padding-left: 155px; */
  }

  #showNameLink
  {
    padding-top: 5px;
    text-decoration: none;
    color: white;
  }

  #showNameLink:hover 
  {
    color: ;
  }

  #showNameText
  {
    padding-top: 4px;
  }

  #showPoster 
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

  #showDescription 
  {
    width: ;
    opacity: .75;
  }

  #scrollBarSeasons 
  {
    margin: auto;
    margin-bottom: -18px;
    overflow-y: hidden;
    overflow-x: auto;
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
    margin-bottom: 15px;
    padding: 10px;
    /* width: 500px; */
    /* opacity: 50%; */
    border: 1px solid gray;
    background-color: #FED90F; /* alternative colors: #35495E */
  }

  .seasonImage 
  {
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
  }

  .seasonImageMissing
  {
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
    padding-bottom: 87px;
  }

  #errorMessage
  {
    color: black;
  }
  
  /* width */
  ::-webkit-scrollbar {
    height: 15px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #FED90F;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: black;
  }

  @media screen and (max-width: 1024px) {
    #showPoster 
    {
        display: block;
        position: relative;
        /* float: none; */
        margin: 0px;
        margin-left: -1%;
        margin-top: -12px;
        margin-bottom: 20px;
        padding: 0px;
        height: 80vh;
        width: 96vw;
        /* border: 1px solid black; */
    }

    #showInfo {
      margin: 0px;
      margin: auto;
      margin-bottom: 10px;
      padding: 0px;
      width: 94vw;
    }

    #showInfo p
    {
      /* margin: 0px;
      padding: 0px; */
      text-align: center;
    }

    #showNameLink, #showNameText, #showHomePage
    {
      display: none;
    }
    
    #showStatus, #showNumberOfEpisodes, #showNumberOfSeasons, #showLastEpisode, #showNextEpisode, #showDescription, #showHomePage, #showNameText
    {
      margin: 0px;
      padding: 0px;
      padding-left: 0px;
    }

    #showStatus
    {
      /* padding-top: 20px; */
    }

    #showDescription {
      margin: auto;
      padding-top: 17px;
      padding-bottom: 20px;
      width: 90%;
    }

    .season {
      margin: 0px;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    #scrollBarSeasons 
    {
      width: 94vw;
    }

    ::-webkit-scrollbar {
        display: none;
    }
  }
</style>
