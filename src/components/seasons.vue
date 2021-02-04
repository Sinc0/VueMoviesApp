<template>
  <div class="hello">
    
    <!-- <p>{{ vuexCounter }}</p> -->
    <!-- <p>{{ vuexName }}</p> -->
    <!-- <p>{{ vuexTodo }}</p> -->
    <!-- <p>{{ vuexSelectedSeason }}</p> -->
    <div id="showInfo">
      <img id="showPoster" v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + showInfo.poster"/>
      <!-- <p id="showHomePage">{{showInfo.homePage}}</p> -->
      <a id="showNameLink" v-bind:href="showInfo.homePage"><p id="showNameText">{{showInfo.name}}</p></a>
      <p id="showStatus">Status: {{showInfo.status}}</p>
      <p id="showNumberOfEpisodes">Total Episodes: {{showInfo.numberOfEpisodes}}</p>
      <p id="showNumberOfSeasons">Total Seasons: {{showInfo.numberOfSeasons}}</p>
      <p id="showLastEpisode">Last Episode: {{showInfo.lastEpisode}}</p>
      <p id="showNextEpisode">Next Episode: {{showInfo.nextEpisode}}</p>
      <p id="showDescription">{{showInfo.description}}</p>
    </div>

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
      // const counter = computed(() => store.state.simpsonData.counter)
      // const name = computed(() => store.getters['simpsonData/name'])
      // const todos = computed(() => store.getters['simpsonData/doneTodos'])

      //variables
      let showInfo = reactive({
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
        episodes: null
      })

      //functions
      async function fetchShow()
      {
          var localStorageData = []

          await fetch('https://api.themoviedb.org/3/tv/456?api_key=3010e2bf9f8b7fbc8e38ec004850995b', {method: 'get'})
          .then((response) => {
              return response.json()
          })
          .then((data) => {
              console.log(data)

              //set variables
              showInfo.name = data.name
              showInfo.description = data.overview
              showInfo.seasons = data.seasons.slice().reverse()
              showInfo.episodes = data.number_of_episodes
              showInfo.name = data.original_name
              showInfo.description = data.overview
              showInfo.poster = data.poster_path
              showInfo.homePage = data.homepage
              showInfo.numberOfEpisodes = data.number_of_episodes
              showInfo.numberOfSeasons = data.number_of_seasons
              showInfo.status = data.status
              showInfo.nextEpisode = data.next_episode_to_air.air_date
              showInfo.lastEpisode = data.last_episode_to_air.air_date

              //save to localStorage
              localStorageData.push({data})
              localStorage.setItem("savedShows", JSON.stringify(localStorageData))
          })

          store.dispatch('simpsonData/actionSetCounter', 123) //alternative syntax: store.dispatch({type: 'actionSetCounter', value: 10000000 })
      }

      fetchShow()

      async function fetchShowSeason(season)
      {
          var seasonData = null
          var seasonNumber = season
          var numberOfEpisodes = null
          var airDate = null
          var localStorageData = []
          var ls = localStorage.getItem("savedSeasons")
          if(ls)
          {
            // console.log(JSON.parse(ls))
            localStorageData = JSON.parse(ls)
          }
          var checkLocalStorage = JSON.stringify(localStorageData)
          let newDate = new Date().toISOString().substr(0, 16)
          // console.log(seasons.length)

          //check if season is saved in localStorage
          if(checkLocalStorage.includes("season" + season))
          {
              console.log("season#" + season + " fetched from localStorage")
              
              localStorageData.forEach(s => {
                      if(s.text == "season" + season)
                      {
                          seasonData = s

                          // console.log("data from localStorage")
                          // console.log(seasonData)
                          // console.log(seasonData.savedAt)
                          // console.log(newDate)
                      }
                  })

              //check when season data was fetched
              if(DateValidation(seasonData.savedAt, newDate) == true)
              {
                  store.dispatch('simpsonData/actionSetSelectedSeason', seasonData)
              }
              else
              {
                  fetchSeasonDataFromAPI(seasonNumber, localStorageData)
              }
          }
          else
          {
              fetchSeasonDataFromAPI(seasonNumber, localStorageData)
          }

          //reduce opacity on not selected seasons
          var selectedDiv = document.getElementById("season#" + season)
          var seasons = document.getElementsByClassName("season")

          for(var c = 0; c < seasons.length; c++)
          {
              document.getElementById("season#" + [c]).style.opacity = "50%"
          }

          selectedDiv.style.opacity = "100%"

          //collapseAllEpisodes
          var x = document.getElementsByClassName("episodeDetail").length

          for(var counter = 0; counter < x; counter++)
          {
              var z = document.getElementsByClassName("episodeDetail")[counter].id
              var e = document.getElementById(z)
              e.style.display = "none"
          }
      }

      async function fetchSeasonDataFromAPI(season, localStorageData)
      {
        var seasonData = null
        var seasonNumber = season
        var numberOfEpisodes = null
        var airDate = null
        var localStorageData = localStorageData
        var url = "https://api.themoviedb.org/3/tv/456/season/" + season + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        
        await fetch(url, {method: 'get'})
            .then((response) => {
                  return response.json()
            })
            .then((data) => {
                // console.log(data)
                
                //set variables
                seasonInfo.episodes = data.episodes
                seasonData = {title: data.season_number, episodes: data.episodes}
                seasonNumber = data.season_number
                numberOfEpisodes = data.episodes.length
                airDate = data.air_date
  
                //save to localStorage
                localStorageData.push({season: seasonNumber, episodes: seasonInfo.episodes, text: "season" + seasonNumber, savedAt: new Date().toISOString().substr(0, 16)})
                localStorage.setItem("savedSeasons", JSON.stringify(localStorageData))
  
                //vuex
                store.dispatch('simpsonData/actionSetSelectedSeason', seasonData)
            })

            console.log("season#" + season + " data fetched from API")
      }

      function DateValidation(date1, date2)
      {
          let formattedDate1 = date1.substr(0, 4)
          formattedDate1 += date1.substr(5, 2)
          formattedDate1 += date1.substr(8, 2)
          formattedDate1 += date1.substr(11, 2)
          formattedDate1 += date1.substr(14, 2)
          formattedDate1 = parseInt(formattedDate1)

          let formattedDate2 = date2.substr(0, 4)
          formattedDate2 += date2.substr(5, 2)
          formattedDate2 += date2.substr(8, 2)
          formattedDate2 += date2.substr(11, 2)
          formattedDate2 += date2.substr(14, 2)
          formattedDate2 = parseInt(formattedDate2)
          // console.log(formattedDate1)
          // console.log(formattedDate2)

          let difference = Math.abs(formattedDate1 - formattedDate2)
          console.log(100 - difference + " minutes left until next API fetch")

          //data was fetched more than 60 minutes ago
          if(difference > 100)
          {
              return false
          }
          //data was fetched less than 60 minutes ago
          else
          {
              return true
          }
      }
       
      return {
        //variables
        showInfo,
        seasonInfo,
        selectedSeason,
        // vuexSelectedSeason: selectedSeason,
        // vuexSelectedEpisode: selectedEpisode,
        // vuexCounter: counter,
        // vuexName: name,
        // vuexTodo: todos,

        //functions
        fetchShow,
        fetchShowSeason,
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #showInfo {
    margin: auto;
    margin-top: 5px;
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
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px;
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
    margin-top: -35px;
    padding: 0px;
    height: 260px;
    width: 170px;
    border: 1px solid black;
  }

  #showStatus
  {
    padding-top: ;
  }

  #showDescription 
  {
    padding-top: 0px;
    width: 700px;
    opacity: 75%;
  }

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
    margin-bottom: 15px;
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

  @media screen and (max-width: 1024px) {
    #showPoster 
    {
        display: block;
        position: relative;
        float: none;
        margin: 0px;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 23px;
        padding: 0px;
        height: 260px;
        width: 170px;
        border: 1px solid black;
    }

    #showInfo {
      margin-bottom: 23px;
      margin-left: -1px;
      width: 90vw;
    }

    #showInfo p
    {
      margin: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      text-align: center;
    }

    #showNameLink, #showNameText
    {
      display: none;
    }
    
    #showStatus
    {
      padding-top: 7px;
    }

    #showDescription {
      padding-top: 27px;
      width: 100%;
    }

    .season {
      margin: 0px;
      margin-right: 7px;
      margin-bottom: 7px;
    }

    #scrollBarSeasons 
    {
      margin-left: -1px;
      width: 96vw;
    }
  }
</style>
