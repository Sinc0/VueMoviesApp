<template>
  <div class="hello">
    <!-- <p v-if="showInfo.data"> {{ showInfo.data.id }} </p> -->
    <!-- <p v-if="showInfo"> {{ showInfo.data }} </p> -->
    <!-- <p>count: {{ count }} show: {{ selectedShow }}</p> -->
    <!-- <p>{{ vuexCounter }}</p> -->
    <!-- <p>{{ vuexName }}</p> -->
    <!-- <p>{{ vuexTodo }}</p> -->
    <!-- <p>{{ vuexSelectedSeason }}</p> -->
    <!-- {{showInfo.data}} -->
    <!-- {{showInfo.data.data.number_of_seasons}} -->
    <!-- {{showInfo.data.data.number_of_episodes}} -->
    <!-- {{seasonInfoRefs.data}} -->

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
    
    <div id="showInfoPosterMissing" v-else-if="showInfo.data"> <!-- v-if="showInfo.data.id == showId" -->
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

    <div id="scrollBarSeasons" v-if="showInfo.data && showInfo.data.data.number_of_seasons != 0">
      <div v-on:click="fetchShowSeason(showInfo.data.id, season.season_number)" v-for="season in showInfo.data.data.seasons.slice().reverse()" v-bind:key="season.id" class="season" v-bind:id="'season#' + season.season_number">
        <p><b>{{season.name}}</b></p>
        <img v-if="season.poster_path" v-bind:src="'https://www.themoviedb.org/t/p/w58_and_h87_face' + season.poster_path" class="seasonImage">
        <img v-else v-bind:src="''" class="seasonImageMissing">
      </div>
    </div>

    <!-- <button v-on:click="incrementCounter()">click</button> -->
  
  </div>
</template>

<script>
import {ref, toRef, toRefs, reactive, computed, watch, watchEffect, onMounted, onBeforeMount, beforeUpdate, onUpdated, onBeforeUpdate} from 'vue'
import {useStore} from 'vuex'

  // setTimeout(function(){ alert("Hello"); }, 3000);
export default {
    setup() {
      // onBeforeMount(() => {
      //   console.log('onBeforeMounted')
      // })
      
      // onBeforeMount(() => {
      //   console.log('on before mount in the composition api!')
      // })

      // onMounted(() => {
      //   console.log("on mounted in the composition api!")
      //   // fetchShowSeason(132, 1)
      //   // styleDivs(1)
      // })

      // onUpdated(() => {
      //   console.log("on updated in the composition api!")
      // })

      // watchEffect(() => {
      //   console.log("watchEffect in the composition api!")
      //   console.log(selectedShow)
      // })

      // var counterx = ref(0)

      // function incrementCounter()
      // {
      //   counterx.value++
      //   // console.log(counterx.value)
      // }
      // watch(seasonInfo, (newValue, prevValue) => {
      //   console.log("watch in the composition api!")
      //   console.log(newValue)
      //   console.log(prevValue)
      // })

      // console.log(this) 

      //vuex
      const store = useStore() //same as this.$store
      const count = computed(() => store.getters['showData/times'])
      const selectedShow = computed(() => { return store.getters['showData/selectedShow']})
      const selectedSeason = computed(() => { return store.getters['showData/selectedSeason']})

      // console.log("***")
      // console.log(selectedShow.value)
      // console.log("***")
      // var showData = null
      // var showId = null
      // var showName = null
      // var showNumberOfSeasons = null
      // const counter = computed(() => store.state.simpsonData.counter)
      // const name = computed(() => store.getters['simpsonData/name'])
      // const todos = computed(() => store.getters['simpsonData/doneTodos'])

      //test
      // console.log(testVar)

      //variables
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

      // if(selectedShow.value != null)
      // {
      //   showInfo.data = selectedShow
      //   showData = selectedShow.value.data
      //   showId = selectedShow.value.id
      //   showName = selectedShow.value.name
      //   showNumberOfSeasons = selectedShow.value.data.number_of_seasons 
      // }

      // console.log(showInfo.name)

      let seasonInfo = reactive({
        data: selectedSeason
      })

      const seasonInfoRefs = toRefs(seasonInfo)

      watch(seasonInfoRefs.data, (newValue, oldValue) => {
        console.log("season#" + seasonInfoRefs.data.value.season + " selected")
        console.log("old value: " + oldValue + " new value: " + newValue)
        console.log(seasonInfoRefs.data.value)
        // console.log('The new counter value is: ' + counterx.value)

        selectedSeasonOpacityStyling(seasonInfoRefs.data.value.season)
      })

      //functions
      // async function fetchShow()
      // {
          // var localStorageData = []
          // var selectedShowData = selectedShow.value.data
          // console.log(selectedShowData)

          // await fetch('https://api.themoviedb.org/3/tv/456?api_key=3010e2bf9f8b7fbc8e38ec004850995b', {method: 'get'})
          // .then((response) => {
          //     return response.json()
          // })
          // .then((data) => {
          //   const x = computed(() => store.getters['showData/selectedShow'])
              // console.log(x)

              // check variables
              // if(selectedShowData.name != null)
              //   showInfo.name = selectedShowData.name //(showInfo.name != null) ? data.name : null;

              // if(data.overview != null)
              //   showInfo.description = data.overview

              // if(data.seasons.slice().reverse() != null)
              //   showInfo.seasons = data.seasons.slice().reverse()

              // if(data.number_of_episodes != null)
              //   showInfo.episodes = data.number_of_episodes

              // if(data.original_name != null)
              //   showInfo.name = data.original_name

              // if(data.overview != null)
              //   showInfo.description = data.overview

              // if(data.poster_path != null)
              //   showInfo.poster = data.poster_path

              // if(data.homepage != null)
              //   showInfo.homePage = data.homepage

              // if(data.number_of_episodes != null)
              //   showInfo.numberOfEpisodes = data.number_of_episodes

              // if(data.number_of_seasons != null)
              //   showInfo.numberOfSeasons = data.number_of_seasons

              // if(data.status != null)
              //   showInfo.status = data.status

              // if(data.last_episode_to_air != null)
              //   showInfo.lastEpisode = data.last_episode_to_air.air_date

              // if(data.next_episode_to_air != null)
              //   showInfo.nextEpisode = data.next_episode_to_air.air_date

              // //save to localStorage
              // let showData = null
              // let ls = localStorage.getItem("savedShows")
              // if(ls)
              // {
              //   localStorageData = JSON.parse(ls)
              // }
              // let checkLocalStorage = JSON.stringify(localStorageData)
              // if(checkLocalStorage.includes('ShowId=' + data.id))
              // {
              //   console.log("show exist in localStorage")
              // }
              // else
              // {
              //   localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'ShowId=' + data.id})
              //   localStorage.setItem("savedShows", JSON.stringify(localStorageData))
              //   console.log("show saved to localStorage")
              // }
                   
              // store.dispatch('simpsonData/actionSetCounter', 123) //alternative syntax: store.dispatch({type: 'actionSetCounter', value: 10000000 })
          // }) 
      // }

      // fetchShow()

      async function fetchShowSeason(show, season)
      {
          console.log(show)
          console.log(season)

          var seasonData = null
          var showId = show
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
          if(checkLocalStorage.includes("show" + showId + "season" + season))
          {
              console.log("season#" + season + " fetched from localStorage")
              
              localStorageData.forEach(s => {
                      if(s.searchString == "show" + showId + "season" + season)
                      {
                          seasonData = s

                          console.log("data from localStorage")
                          console.log(seasonData)
                          console.log(seasonData.savedAt)
                          // console.log(newDate)
                      }
                  })

              //check when season data was fetched
              if(DateValidation(seasonData.savedAt, newDate) == true)
              {
                  store.dispatch('showData/actionSetSelectedSeason', seasonData)
              }
              else
              {
                  fetchSeasonDataFromAPI(show, seasonNumber, localStorageData)
              }
          }
          else
          {
              fetchSeasonDataFromAPI(show, seasonNumber, localStorageData)
          }
      }

      async function fetchSeasonDataFromAPI(show, season, localStorageData)
      {
        var seasonData = null
        var showId = show
        var seasonNumber = season
        var seasonEpisodes = null
        var numberOfEpisodes = null
        var airDate = null
        var localStorageData = localStorageData
        var url = "https://api.themoviedb.org/3/tv/" + show + "/season/" + season + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        
        await fetch(url, {method: 'get'})
            .then((response) => {
                  return response.json()
            })
            .then((data) => {
                console.log(data)
                
                //set variables
                // seasonInfo.episodes = data.episodes
                seasonData = {showId: selectedShow.value.id, showName: selectedShow.value.name, season: data.season_number, episodes: data.episodes}
                //   seasonNumber = data.season_number
                //   seasonEpisodes = data.episodes.length
                //   console.log(numberOfEpisodes)
                //   airDate = data.air_date
    
                  //save to localStorage
                  console.log(selectedShow.value.id)
                  console.log(selectedShow.value.name)
                  localStorageData.push({showId: selectedShow.value.id, showName: selectedShow.value.name, season: seasonNumber, episodes: data.episodes, searchString: "show" + selectedShow.value.id + "season" + seasonNumber, savedAt: new Date().toISOString().substr(0, 16)})
                  localStorage.setItem("savedSeasons", JSON.stringify(localStorageData))
    
                  //vuex
                  store.dispatch('showData/actionSetSelectedSeason', seasonData)
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

      async function selectedSeasonOpacityStyling(season, numberOfEpisodes)
      {
        // reduce opacity on not selected seasons
          var selectedDiv = document.getElementById("season#" + season)
          // console.log(season)
          // console.log(selectedDiv)
          // console.log("season#" + season)
          var seasons = document.getElementsByClassName("season")
          var seasonSpecials = document.getElementById("season#" + [0])

          if(seasonSpecials != null)
          {
              // console.log(seasonSpecials)

              for(var c = 0; c < seasons.length; c++)
              {
                  document.getElementById("season#" + [c]).style.opacity = "50%"
              }
          }
          else
          {
              for(var c = 1; c <= seasons.length; c++)
              {
                  document.getElementById("season#" + [c]).style.opacity = "50%"
              }
          }

          if(selectedDiv != null)
          {
            selectedDiv.style.opacity = "100%"
          } 
      }
       
      return {
        //variables
        // showId,
        showInfo,
        seasonInfo,
        seasonInfoRefs,
        // count,
        // selectedShow,
        // selectedSeason,
        // // vuexSelectedSeason: selectedSeason,
        // vuexSelectedEpisode: selectedEpisode,
        // vuexCounter: counter,
        // vuexName: name,
        // vuexTodo: todos,

        //functions
        // fetchShow,
        fetchShowSeason,
        // incrementCounter
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #showInfo {
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

  #showInfo p
  {
    margin: 0px;
    padding-bottom: 5px;
    padding-left: 155px;
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
    border: 1px solid black;
  }

  #showStatus
  {
    padding-top: ;
  }

  #showDescription 
  {
    padding-top: 0px;
    width: ;
    opacity: 75%;
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
