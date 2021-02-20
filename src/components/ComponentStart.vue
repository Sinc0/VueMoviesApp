<template>
  <div>
    <!-- search -->
    <!-- <h3 id="searchHeaderText">Search</h3> -->
    <!-- {{searchType.value}} -->
    <!-- {{getRecentlySearched}} -->
    <!-- {{recentlySearched}} -->
    <!-- <button v-on:click="displaySearchBox()">searchBox</button> -->
    <!-- {{getFollowedShows}} -->
    <!-- {{getFollowedMovies}} -->
    <div id="searchBox">
        <form v-on:submit="searchShows(searchString.value, searchType.value)" onsubmit="return false;">
            <div id="searchBar">
                <!-- <select id="searchBarSelectBox">
                    <option value="tv">Shows</option>
                    <option value="movie">Movies</option>
                </select> -->
                <p v-on:click="searchBarChangeType()" id="searchBarSelectBox">Shows</p>
                <input id="searchBarInput" v-on:keyup="setSearchString()" placeholder="">
                <p v-on:click="searchShows(searchString.value, searchType.value)" id="searchBarSubmitButton">Submit</p>
            </div>
        </form>

        <div id="clearSearchResults" v-on:click="clearSearchResults()">Clear Search</div>

        <div v-if="getRecentlySearched != null" id="scrollBarSearch">
            <h3 class="sliderCategory">Search Hits</h3> 
            <div v-for="hit in getRecentlySearched.results.filter(show => show.poster_path != null)" v-bind:key="hit.id" class="hit">
                <div v-if="hit.first_air_date != null">
                    <router-link v-bind:to="'/show/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                    <p v-on:click="followShow(hit)" class="followShow">follow</p>
                </div>
                <div v-if="hit.first_air_date == null">
                    <router-link v-bind:to="'/movie/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                    <p v-on:click="followMovie(hit)" class="followMovie">follow</p>
                </div>
            </div>
        </div>

        <div v-if="searchShowsResult.data" id="searchResults">
            <!-- <div id="scrollBarSearch">
                <div v-for="hit in searchShowsResult.data.results.filter(show => show.poster_path != null)" v-bind:key="hit.id" class="hit">
                    <router-link v-bind:to="'/show/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                    <p class="saveShow">save</p>
                </div>
            </div> -->
            <!-- <router-link v-for="hit in searchShowsResult.data.results.slice(0,9)" v-bind:key="hit.id" :to="'/show/' + hit.id"><p class="searchHit">{{hit.title}}</p>{{hit.id}} - {{hit.title}} [{{hit.release_date.substr(0,4)}}]</router-link> -->
            <!-- <p>searchString: {{searchString.value}}</p> -->
            <!-- <p>total hits: {{searchShowsResult.data.total_results}}</p> -->
            <h3 v-if="searchShowsResult.data.total_results == 0" id="searchNoResultsFound">No Results Found <!-- ({{searchString.value}}) --></h3>
            <!-- <p>total displayed: 10 </p> -->
        </div>
    </div>
    
    <!-- shows -->
    <div v-if="getFollowedShows != null && getFollowedShows.length != 0" id="scrollBarShows" class="sliderCategory">
        <h3 class="sliderCategory">Followed Shows</h3>
        <div v-for="show in getFollowedShows" v-bind:key="show.id" class="show">
            <p v-if="show.data.status == 'Ended' || show.data.next_episode_to_air == null" id="followedShowsStatus">{{show.data.status}}</p>
            <p v-if="show.data.status != 'Ended' && show.data.next_episode_to_air != null" id="followedShowsNextEpisode">Next Air: {{show.data.next_episode_to_air.air_date}}</p>
            <router-link v-bind:to="'/show/' + show.data.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + show.data.poster_path" /></router-link>
            <p v-on:click="unfollowShow(show)" class="unfollowShow">unfollow</p>
        </div>
    </div>
        
    <!-- movies -->
    <div id="scrollBarMovies">
        <div v-if="getFollowedMovies != null && getFollowedMovies.length != 0" id="scrollBarMovies" class="sliderCategory">
            <h3 class="sliderCategory">Followed Movies</h3>
            <div v-for="movie in getFollowedMovies" v-bind:key="movie.id" class="movie">
                <!-- <p v-if="movie.data.status == 'Ended' || movie.data.next_episode_to_air == null" id="followedMovieStatus">{{movie.data.status}}</p> -->
                <!-- <p v-if="movie.data.status != 'Ended' && movie.data.next_episode_to_air != null" id="followedMovieNextEpisode">Next Air: {{movie.data.next_episode_to_air.air_date}}</p> -->
                <router-link v-bind:to="'/movie/' + movie.data.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.data.poster_path" /></router-link>
                <p v-on:click="unfollowMovie(movie)" class="unfollowMovie">unfollow</p>
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
        // console.log(localStorageRecentlySearched.data)
        var searchShowsResult = reactive({data: null})
        var searchString = reactive({value: null})
        var searchType = reactive({value: "Shows"})
        // var recentlySearched = reactive({value: "Recently Searched"})

        //vuex
        const store = useStore() //same as this.$store
        const getRecentlySearched = computed(() => { return store.getters['showData/recentlySearched']})
        if(localStorageRecentlySearched != null)
        {
            var temp = localStorageRecentlySearched
            console.log("temp")
            console.log(temp)
            store.dispatch('showData/actionSetRecentlySearched', temp)
        }
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
            
        })

        async function searchShows(queryString, queryType)
        {
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
                console.log("search shows")
                return response.json()
            })
            .then((data) => {
                console.log(data)
                searchShowsResult.data = data

                //save to recently searched variable
                // recentlySearched.value = computed(() => { return store.getters['showData/recentlySearched']})
                // console.log("recentlySearched")
                // console.log(recentlySearched)

                //save to local storage
                var rs = []
                rs.push(JSON.stringify(data))
                localStorage.setItem('recentlySearched', rs)

                //save to vuex
                store.dispatch('showData/actionSetRecentlySearched', data)

                //reset search bar text
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
                  console.log("show#" + id + " data fetched from API")
                  return response.json()
            })
            .then((data) => {
                // console.log(data)
                
                //set variables
                showData = data
                // showData = {id: data.id, name: data.name, data: data}
                // console.log(showData)
  
                // save to localStorage
                let ls = localStorage.getItem("savedShows")
                if(ls)
                {
                    localStorageData = JSON.parse(ls)
                }
                let checkLocalStorage = JSON.stringify(localStorageData)
                if(checkLocalStorage.includes('ShowId=' + data.id))
                {
                    console.log("show exist in localStorage")
                }
                else
                {
                    localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'ShowId=' + data.id})
                    localStorage.setItem("savedShows", JSON.stringify(localStorageData))
                    console.log("show saved to localStorage")
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
            // console.log(searchTypeButton)

            if(searchTypeButton.innerText == "Shows")
            {
                searchType.value = "Movies"
                searchTypeButton.innerText = "Movies"
            }
            else if(searchTypeButton.innerText == "Movies")
            {
                searchType.value = "Shows"
                searchTypeButton.innerText = "Shows"
            }
        }

        function clearSearchResults()
        {
            var searchBox = document.getElementById("scrollBarSearch")
            var ls = localStorage.setItem('recentlySearched', null)
            store.dispatch('showData/actionSetRecentlySearched', null)

            if(searchBox.style.display == "none")
            {
                searchBox.style.display = "block"
            }
            else
            {
                searchBox.style.display = "none"
            }

            document.getElementById("clearSearchResults").style.display = "none"
        }

        async function followShow(show)
        {
            console.log(show.id)
            console.log(show)
            
            //variables
            var followedShows = []

            //fetch full show data
            var fullShowData = await fetchFullShowData(show.id)
            console.log(fullShowData)

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            console.log(ls)
            if(ls != null)
            {
                followedShows = ls
            }

            //save to local storage
            if(JSON.stringify(followedShows).includes("FollowedShow" + show.id))
            {
                //do nothing
                console.log("show is already followed")
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
            console.log(movie.id)
            console.log(movie)
            
            //variables
            var followedMovies = []

            //fetch full show data
            // var fullMovieData = await fetchFullShowData(show.id)
            // console.log(fullMovieData)

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            console.log(ls)
            if(ls != null)
            {
                followedMovies = ls
            }

            //save to local storage
            if(JSON.stringify(followedMovies).includes("FollowedMovie" + movie.id))
            {
                //do nothing
                console.log("movie is already followed")
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
            console.log(show.data.id)
            // console.log(show)
            
            //variables
            var followedShows = []

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            // console.log(ls)
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
            console.log(movie.data.id)
            // console.log(movie)
            
            //variables
            var followedMovies = []

            //get from local storage
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            // console.log(ls)
            if(ls != null)
            {
                followedMovies = ls
            }
            console.log(followedMovies)
            //save to local storage
            if(JSON.stringify(followedMovies).includes("FollowedMovie" + movie.data.id))
            {
                const filter = followedMovies.filter(m => m.searchString != "FollowedMovie" + movie.data.id);
                console.log(movie)
                followedMovies = filter
                localStorage.setItem('followedMovies', JSON.stringify(followedMovies))
            }

            // save to vuex
            store.dispatch('showData/actionSetFollowedMovies', followedMovies)
        }

        function loadFollowedShows()
        {
            var followedShows = []
            var ls = JSON.parse(localStorage.getItem('followedShows'))
            console.log(ls)
            if(ls != null)
            {
                followedShows = ls
            }
            store.dispatch('showData/actionSetFollowedShows', followedShows)
        }

        function loadFollowedMovies()
        {
            var followedMovies = []
            var ls = JSON.parse(localStorage.getItem('followedMovies'))
            console.log(ls)
            if(ls != null)
            {
                followedMovies = ls
            }
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
            // recentlySearched,

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

    #scrollBarShows, #scrollBarMovies, #scrollBarSearch
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
        padding-bottom: 16px;
    }

    .show, .movie
    {
        display: inline-block;
        margin-top: 6px;
        margin-right: 15px;
        height: 305px;
        width: 205px;
        background-image: url('');
    }

    .hit
    {
        display: inline-block;
        margin-top: 6px;
        margin-right: 15px;
        height: 305px;
        width: 205px;
        opacity: 75%;
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

    #searchHeaderText
    {
    
    }

    #searchBox
    {
        margin: 0px;
        margin: auto;
        padding: 0px;
        padding-top: 12px;
        width: 1000px;
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
        height: ;
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

    #searchBarSubmitButton:active, #searchBarSubmitButton:hover
    {
        color: black;
        background-color: white;
    }

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

    #searchBox input::placeholder
    {
        color: white;
    }

    #searchNoResultsFound
    {
        margin: auto;
        margin-top: -10px;
        padding: 0px;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 700px;
        font-weight: bold;
        color: white;
        /* background-color: white; */
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
        opacity: 99%;
        font-weight: bold;
        color: black;
        background-color: red;
    }

    .followShow:active, .followShow:hover
    {
        cursor: pointer;
        color: white;
        background-color: black;
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
            background-color: #41B883;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            margin-top: 10px;
            background-color: black;
        }

</style>