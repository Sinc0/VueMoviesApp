<template>
  <div>
    <div id="searchBox">
        <form v-on:submit="searchShows(searchString.value, searchType.value)" onsubmit="return false;">
            <div id="searchBar">
                <p v-on:click="searchBarChangeType()" id="searchBarSelectBox">Shows</p>
                <input type="text" id="searchBarInput" v-on:keyup="setSearchString()" placeholder="search for shows..." maxlength="100">
                <p v-on:click="searchShows(searchString.value, searchType.value)" id="searchBarSubmitButton">Search</p>
            </div>
        </form>
        
        <div v-if="getRecentlySearched != null && getRecentlySearched.results.length != 0" id="scrollBarSearch">
            <div v-for="hit in getRecentlySearched.results.filter(show => show.poster_path != null)" v-bind:key="hit.id" class="hit">
                <div v-if="hit.first_air_date != null">
                    <router-link v-bind:to="'/show/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                    <p v-on:click="followShow(hit)" class="followShow">Follow</p>
                </div>

                <div v-if="hit.first_air_date == null">
                    <router-link v-bind:to="'/movie/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                    <p v-on:click="followMovie(hit)" class="followMovie">Follow</p>
                </div>
            </div>
            
        </div>
        
        <p id="searchLimitReached">You reached your search limit</p>
        <p v-if="getRecentlySearched != null && getRecentlySearched.results.length == 0" id="searchNoResultsFound">No Results Found <!-- ({{searchString.value}}) --></p>
        <div  id="clearSearchResults" v-on:click="clearSearchResults()">Clear</div>
    </div>
    
    <!-- shows -->
    <h3 v-if="getFollowedShows != 0" class="sliderCategory">Followed Shows</h3>
    <div v-if="getFollowedShows != null && getFollowedShows != 0" id="scrollBarShows" class="sliderCategory">
        <div v-for="show in getFollowedShows.slice().reverse()" v-bind:key="show.id" class="show">
            <p v-if="show.data.status == 'Ended' || show.data.next_episode_to_air == null" id="followedShowsStatus">{{show.data.status}}</p>
            <p v-if="show.data.status != 'Ended' && show.data.next_episode_to_air != null" id="followedShowsNextEpisode">Next Air: {{show.data.next_episode_to_air.air_date}}</p>
            <router-link v-bind:to="'/show/' + show.data.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + show.data.poster_path" /></router-link>
            <p v-on:click="unfollowShow(show)" class="unfollowShow">Unfollow</p>
        </div>
    </div>
        
    <!-- movies -->
    <div id="scrollBarMovies">
        <h3 v-if="getFollowedMovies != 0" class="sliderCategory">Followed Movies</h3>
        <div v-if="getFollowedMovies != null && getFollowedMovies.length != 0" id="scrollBarMovies" class="sliderCategory">
            <div v-for="movie in getFollowedMovies.slice().reverse()" v-bind:key="movie.id" class="movie">
                <router-link v-bind:to="'/movie/' + movie.data.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.data.poster_path" /></router-link>
                <p v-on:click="unfollowMovie(movie)" class="unfollowMovie">Unfollow</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, computed, onUpdated, onMounted} from 'vue'
import {useStore} from 'vuex'
import router from '../router'

export default {
    setup() {
        //variables
        var localStorageRecentlySearched = localStorage.getItem('recentlySearched')
        localStorageRecentlySearched = JSON.parse(localStorageRecentlySearched)
        var searchShowsResult = reactive({data: null})
        var searchString = reactive({value: null})
        var searchType = reactive({value: "Shows"})

        //vuex
        const store = useStore() //same as this.$store
        if(localStorageRecentlySearched != null)
        {
            store.dispatch('showData/actionSetRecentlySearched', localStorageRecentlySearched)
        }

        const getRecentlySearched = computed(() => { return store.getters['showData/recentlySearched']})
        const getFollowedShows = computed(() => { return store.getters['showData/followedShows']})
        const getFollowedMovies = computed(() => { return store.getters['showData/followedMovies']})

        //lifecycle hooks
        onMounted(() => {
            var clearSearchResultsDiv = document.getElementById("clearSearchResults")

            if(getRecentlySearched.value != null)
            {
                clearSearchResultsDiv.style.display = "block"
            }

            //load followed
            loadFollowedShows()
            loadFollowedMovies()

            //undisplay header
            document.getElementById("header").style.display = "none"
        })

        //functions
        async function searchShows(queryString, queryType)
        {
            //variables
            var searchCount = JSON.parse(localStorage.getItem('searchCount'))
            var searchLimitHour = 100
            var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            //validation
            if(queryString == null || queryString == undefined || queryString == "" || queryString == " " || queryString.includes("  "))
            {
                // console.log("error: search string is empty or null")
            }
            else if(queryString.match(specialCharacters))
            {
                // console.log("error: search string contains special characters")
            }
            else if(searchCount != null && searchCount.value >= searchLimitHour) //check search count
            {
                var diff = Math.abs(Date.now() - searchCount.date)

                //if last fetch was more than 1h ago fetch new data
                if(diff >= 3600000) //3.600.000 = 1h
                {
                    //reset count
                    fetchShowData(queryString, queryType)
                    searchCount.value = 1
                    searchCount.date = Date.now()
                    localStorage.setItem('searchCount', JSON.stringify(searchCount))
                }
                else
                {
                    //variables
                    var minutesLeft = Math.abs(((Date.now() - searchCount.date) / 60000) - 60).toFixed(0)
                    var slr = document.getElementById("searchLimitReached")
                    var sbs = document.getElementById("scrollBarSearch")
                    
                    //display search limit info
                    slr.innerText = "wait " + minutesLeft + " mins to search again"
                    slr.style.display = "block"
                    if(sbs != null)
                    {
                        sbs.style.display = "none"
                    }

                    //save to vuex
                    store.dispatch('showData/actionSetRecentlySearched', null)
                    
                    //save to local storage
                    localStorage.setItem('recentlySearched', null)

                    //show clear search
                    document.getElementById("clearSearchResults").style.display = "block"
                }
            }
            else
            {
                fetchShowData(queryString, queryType)

                //increment search count
                if(searchCount != null)
                {
                    searchCount.value++  
                }
                else
                {
                    searchCount = {date: Date.now(), value: 1}
                }

                localStorage.setItem('searchCount', JSON.stringify(searchCount))
            }
        }

        async function fetchShowData(queryString, queryType)
        {
                //display undisplay
                var sbs = document.getElementById("scrollBarSearch")
                var slr = document.getElementById("searchLimitReached")
                if(slr != null)
                {
                    slr.style.display = "none"
                }

                var urlMovies = "https://api.themoviedb.org/3/search/movie?api_key=3010e2bf9f8b7fbc8e38ec004850995b&query=" + queryString
                var urlShows = "https://api.themoviedb.org/3/search/tv?api_key=3010e2bf9f8b7fbc8e38ec004850995b&query=" + queryString
                var url = null
    
                if(queryType == "Movies")
                {
                    url = urlMovies
                }
                else if(queryType == "Shows")
                {
                    url = urlShows
                }
    
                await fetch(url, {method: 'get'})
                .then((response) => {
                    return response.json()
                })
                .then((data) => {

                    //set variables
                    searchShowsResult.data = data
    
                    //save to local storage
                    var rs = []
                    rs.push(JSON.stringify(data))
                    localStorage.setItem('recentlySearched', rs)
    
                    //save to vuex
                    store.dispatch('showData/actionSetRecentlySearched', data)
    
                    //reset search bar and search string
                    searchString.value = null
                    document.getElementById("searchBarInput").value = ""
    
                    //show clear search
                    document.getElementById("clearSearchResults").style.display = "block"
                })
        }

        async function fetchFullShowData(id)
        {
            var showData = null
            var seasonData = null
            var seasonNumber = null
            var showNumber = id
            var numberOfEpisodes = null
            var airDate = null
            var localStorageData = []
            var url = "https://api.themoviedb.org/3/tv/" + id + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        
            await fetch(url, {method: 'get'})
            .then((response) => {
                  return response.json()
            })
            .then((data) => {
                
                //set variables
                showData = data
  
                // save to localStorage
                let ls = localStorage.getItem("savedShows")
                if(ls)
                {
                    localStorageData = JSON.parse(ls)
                }
                let checkLocalStorage = JSON.stringify(localStorageData)
                if(checkLocalStorage.includes('ShowId=' + data.id))
                {
                    // console.log("show exist in localStorage")
                }
                else
                {
                    localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'ShowId=' + data.id})
                    localStorage.setItem("savedShows", JSON.stringify(localStorageData))
                    // console.log("show saved to localStorage")
                }

            })

            return showData
        }

        function setSearchString()
        {
            var searchStringFromUser = document.getElementById("searchBarInput").value
            searchString.value = searchStringFromUser
        }

        function searchBarChangeType()
        {
            var searchTypeButton = document.getElementById("searchBarSelectBox")
            var searchBar = document.getElementById("searchBarInput")

            if(searchTypeButton.innerText == "Shows")
            {
                searchType.value = "Movies"
                searchTypeButton.innerText = "Movies"
                searchBar.placeholder = "search for movies..."
            }
            else if(searchTypeButton.innerText == "Movies")
            {
                searchType.value = "Shows"
                searchTypeButton.innerText = "Shows"
                searchBar.placeholder = "search for shows..."
            }
        }

        function clearSearchResults()
        {
            //variables
            var searchBox = document.getElementById("scrollBarSearch")
            var searchLimitReached = document.getElementById("searchLimitReached")
            var searchNoResultsFound = document.getElementById("searchNoResultsFound")
            var searchBarInput = document.getElementById("searchBarInput")

            //save to vuex
            store.dispatch('showData/actionSetRecentlySearched', null)

            //save to local storage
            var ls = localStorage.setItem('recentlySearched', null)

            //display
            if(searchBox != null)
            {
                if(searchBox.style.display == "none")
                {
                    searchBox.style.display = "block"
                }
                else
                {
                    searchBox.style.display = "none"
                }
            }
            
            //undisplay
            document.getElementById("clearSearchResults").style.display = "none"

            if(searchLimitReached != null)
            {
                searchLimitReached.style.display = "none"
            }

            if(searchNoResultsFound != null)
            {
                searchNoResultsFound.style.display = "none"
            }

            if(searchBarInput != null)
            {
                searchBarInput.value = ""
            }

        }

        async function followShow(show)
        {
            
            //variables
            var followedShows = []

            //fetch full show data
            var fullShowData = await fetchFullShowData(show.id)

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            if(ls != null)
            {
                followedShows = ls
            }

            //save to local storage
            if(JSON.stringify(followedShows).includes("FollowedShow" + show.id))
            {
                // console.log("show is already followed")
            }
            else
            {
                followedShows.push({showId: fullShowData.id, type: "show", searchString: "FollowedShow" + fullShowData.id, data: fullShowData})
                localStorage.setItem('followedShows', JSON.stringify(followedShows))
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedShows', followedShows)
        }
     
        async function followMovie(movie)
        {
            //variables
            var followedMovies = []

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            if(ls != null)
            {
                followedMovies = ls
            }

            //save to local storage
            if(JSON.stringify(followedMovies).includes("FollowedMovie" + movie.id))
            {
                // console.log("movie is already followed")
            }
            else
            {
                followedMovies.push({movieId: movie.id, type: "movie", searchString: "FollowedMovie" + movie.id, data: movie})
                localStorage.setItem('followedMovies', JSON.stringify(followedMovies))
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedMovies', followedMovies)
        }

        function unfollowShow(show)
        {            
            //variables
            var followedShows = []

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            if(ls != null)
            {
                followedShows = ls
            }

            //save to local storage
            if(JSON.stringify(followedShows).includes("FollowedShow" + show.data.id))
            {
                const filter = followedShows.filter(s => s.searchString != "FollowedShow" + show.data.id);
                followedShows = filter
                localStorage.setItem('followedShows', JSON.stringify(followedShows))
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedShows', followedShows)
        }

        function unfollowMovie(movie)
        {
            //variables
            var followedMovies = []

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            if(ls != null)
            {
                followedMovies = ls
            }
            
            //save to local storage
            if(JSON.stringify(followedMovies).includes("FollowedMovie" + movie.data.id))
            {
                const filter = followedMovies.filter(m => m.searchString != "FollowedMovie" + movie.data.id);
                followedMovies = filter
                localStorage.setItem('followedMovies', JSON.stringify(followedMovies))
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedMovies', followedMovies)
        }

        function loadFollowedShows()
        {
            var followedShows = []
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            if(ls != null)
            {
                followedShows = ls
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedShows', followedShows)
        }

        function loadFollowedMovies()
        {
            var followedMovies = []
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            if(ls != null)
            {
                followedMovies = ls
            }

            //save to vuex
            store.dispatch('showData/actionSetFollowedMovies', followedMovies)
        }

        function test()
        {
            console.log("test")
        }

        return {
            //variables
            searchShowsResult,
            searchString,
            searchType,

            //vuex
            getRecentlySearched,
            getFollowedShows,
            getFollowedMovies,

            //functions
            searchShows,
            setSearchString,
            searchBarChangeType,
            clearSearchResults,
            followShow,
            followMovie,
            unfollowShow,
            unfollowMovie,
            test
        }
    }
}
</script>

<style scoped>
    img
    {
        height: 100%;
        width: 100%;
    }

    #scrollBarShows, #scrollBarMovies
    {
        margin: auto;
        /* margin-top: 20vh; */
        padding-bottom: 16px;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        width: 1000px;
    }

    #scrollBarSearch
    {
        margin: 0px;
        margin: auto;
        margin-top: -2px;
        padding: 0px;
        padding-bottom: 24px;
        padding-left: 7px;
        padding-top: 10px;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        /* width: 100%; */
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        background-color: black;
    }

    .show, .movie
    {
        display: inline-block;
        margin-top: 6px;
        margin-right: 15px;
        height: 305px;
        width: 205px;
        /* background-image: url(''); */
    }

    .hit
    {
        display: inline-block;
        margin-top: 6px;
        margin-right: 15px;
        height: 305px;
        width: 205px;
        opacity: .75;
    }

    .hit:hover
    {
        opacity: 100;
    }

    .sliderCategory
    {
        margin: 0px;
        margin: auto;
        margin-top: 30px;
        padding: 0px;
        width: 1000px;
        color: black;
        /* background-color: white; */
    }

    /* #searchHeaderText
    {
    
    } */

    #searchBox
    {
        margin: 0px;
        margin: auto;
        padding: 0px;
        padding-top: 35px;
        /* width: 1000px; */
        /* opacity: 75%; */
        /* background-color: black; */
    }
    
    #searchBar
    {
        margin: 0px;
        margin: auto;
        padding: 0px;
        width: 696px;
        border: 2px solid white;
        border-left: 2px solid white;
        border-right: 2px solid white;
        background-color: black;
    }

    #searchBarInput
    {
        margin: 0px;
        padding: 2px;
        padding-left: 5px;
        width: 78%;
        font-size: 30px;
        color: white;
        border-radius: 0;
        border-top: 0px solid white;
        border-bottom: 0px solid white;
        border-left: 2px solid white;
        border-right: 2px solid white;
        background-color: black;
    }

    #searchBarInput:focus
    {
        outline: none;
    }

    #searchBarSelectBox, #searchBarSubmitButton
    {
        display: inline-block;
        margin: 0px;
        padding: 0px;
        padding-bottom: 10px;
        padding-left: 0px;
        padding-top: 10px;
        padding-right: 1px;
        /* height: ; */
        width: 10%;
        vertical-align: top;
        text-align: center;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: bold;
        color: white;
        /* border: 1px solid white; */
        background-color: black;
    }

    #searchBarSubmitButton
    {
        margin-right: -1px;
    }

    /* #searchBarSubmitButton:active, #searchBarSubmitButton:hover
    {
        color: black;
        background-color: white;
    } */

    /* #searchBarSubmitButton
    {
        margin: 0px;
        margin-top: 2px;
        padding: 0px;
        height: 20px;
        width: 10%;
        vertical-align: top;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: white;
        border: 1px solid white;
        background-color: green;
    } */

    /* #searchBox input::placeholder
    {
        color: white;
    } */

    #searchNoResultsFound
    {
        margin: 0px;
        margin: auto;
        padding: 0px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 696px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: bold;
        border-left: 2px solid white;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
        color: white;
        background-color: black;
    }

    #searchLimitReached
    {
        display: none;
        margin: 0px;
        margin: auto;
        padding: 0px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 696px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: bold;
        border-left: 2px solid white;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
        color: white;
        background-color: black;
    }

    .searchHit
    {
        margin: 0px;
        padding: 5px;
        font-weight: bold;
        text-align: left;
        color: black;
        border-bottom: 1px solid black;
        background-color: rgb(218, 213, 213);
    }

    /* .searchHit:hover
    {
        color: white;
        background-color: black;
    } */

    .searchHitImage
    {
        /* height: 305px; */
        /* width: 205px; */
        height: 150px;
        width: 150px;
    }

    .followShow, .followMovie
    {
        margin: 0px;
        margin-top: -4px;
        padding: 0px;
        padding-top: 8px;
        padding-bottom: 8px;
        /* height: 30px; */
        font-weight: bold;
        color: black;
        background-color: green;
    }

    .unfollowShow, .unfollowMovie
    {
        margin: 0px;
        margin-top: -4px;
        padding: 0px;
        padding-top: 8px;
        padding-bottom: 8px;
        /* height: 30px; */
        opacity: .99;
        font-weight: bold;
        color: white;
        background-color: black;
    }
    
    .unfollowShow:hover, .unfollowShow:active, .unfollowMovie:hover, .unfollowMovie:active
    {
        cursor: pointer;
        background-color: red;
    }

    .followShow:active, .followShow:hover
    {
        cursor: pointer;
        /* color: white;
        background-color: black; */
    }

    #clearSearchResults
    {
        display: none;
        margin: 0px;
        margin: auto;
        padding: 10px;
        width: 676px;
        font-weight: bold;
        color: white;
        border-bottom: 2px solid white;
        border-left: 2px solid white;
        border-right: 2px solid white;
        background-color: black;
    }

    #followedShowsStatus, #followedShowsNextEpisode
    {
        margin: 0px;
        padding: 0px;
        padding-top: 8px;
        padding-bottom: 8px;
        /* height: 30px; */
        font-weight: bold;
        color: white;
        background-color: black;
    }

    /*** scrollbar ***/
        
        /* width */
        ::-webkit-scrollbar {
            margin-top: 10px;
            height: 7px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background-color: black; /* 41B883 */
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            margin-top: 10px;
            background-color: white;
        }

  @media screen and (max-width: 1024px) {
      #header
      {
          display: none;
      }
      
      .sliderCategory
      {
          width: 92vw;;
      }

      #scrollBarShows, #scrollBarMovies
      {
          width: 92vw;;
          /* background-color: black; */
      }

      #scrollBarSearch
      {
          width: 92vw;
      }

      #searchBox
      {
          /* margin: 0px; */
          /* margin: auto; */
          width: 94vw;
          padding: 0px;
          padding-top: 3vw;
      }

      #searchBar
      {
          margin: auto;
          width: 94vw;
          border: 0px;
      }

      #clearSearchResults
      {
          margin: 0px;
          padding: 0px;
          padding-top: 10px;
          padding-bottom: 10px;
          width: 94vw;
          border: 0px;
          border-bottom: 2px solid white;
      }

      #searchBarInput
      {
          margin: 0px;
          padding-left: 7px;
          padding-right: 7px;
          width: calc(94vw - 14px);
          border: 0px;
          border-top: 2px solid white;
          border-bottom: 2px solid white;
      }

      #searchBarSelectBox, #searchBarSubmitButton
      {
          margin: auto;
          padding-left: 0px;
          padding-right: 0px;
          display: block;
          text-align: center;
      }

      #searchBarSubmitButton
      {
          width: 94vw;
          border-bottom: 2px solid white;
      }

      #searchBarSelectBox
      {
          width: 94vw;
          border-top: 2px solid white;
      }

    ::-webkit-scrollbar {
        display: none;
        margin-top: 10px;
        height: 7px;
    }

    /* .sliderCategory
    {
        color: white;
    } */

    #searchNoResultsFound
    {
        width: 94vw;
        border-left: 0px;
        border-right: 0px;
    }

    #searchLimitReached
    {
        width: 94vw;
        border-left: 0px;
        border-right: 0px;
    }
  }
</style>