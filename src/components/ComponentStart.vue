<template>
  <div>
    <!-- search -->
    <!-- <h3 id="searchHeaderText">Search</h3> -->
    <!-- {{searchType.value}} -->
    <!-- {{getRecentlySearched}} -->
    <!-- {{recentlySearched}} -->
    <!-- <button v-on:click="displaySearchBox()">searchBox</button> -->
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

        <div id="clearSearchResults" v-on:click="clearSearchResults()">Clear Search Results</div>

        <div v-if="getRecentlySearched != null" id="scrollBarSearch">
            <!-- <h3 class="sliderCategory">Search</h3>  -->
            <div v-for="hit in getRecentlySearched.results.filter(show => show.poster_path != null)" v-bind:key="hit.id" class="hit">
                <router-link v-bind:to="'/show/' + hit.id"><img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + hit.poster_path" /></router-link>
                <p class="saveShow">save</p>
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
        
    <!-- movies -->
    <h3 class="sliderCategory">Movies</h3>
    <div id="scrollBarMovies">
        <div class="show">
            <router-link to="/show/456"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/132"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
    </div>

    <!-- shows -->
    <h3 class="sliderCategory">Shows</h3>
    <div id="scrollBarShows">
        <div class="show">
            <router-link to="/show/456"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/132"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
        </div>
        <div class="show">
            <router-link to="/show/457"><img v-bind:src="''"></router-link>
            <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
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

        //lifecycle hooks
        onMounted(() => {
            var clearSearchResultsDiv = document.getElementById("clearSearchResults")

            if(getRecentlySearched.value != null)
            {
                clearSearchResultsDiv.style.display = "block"
            }
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

            //functions
            searchShows,
            setSearchString,
            searchBarChangeType,
            clearSearchResults,
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
        padding-bottom: 8px;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        width: 1000px;
    }

    #scrollBarSearch
    {
        padding-bottom: 16px;
    }

    .show
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
        margin-top: 13px;
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

    #searchBarSubmitButton:hover
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

    .searchHit:hover
    {
        color: white;
        background-color: black;
    }

    .searchHitImage
    {
        /* height: 305px; */
        /* width: 205px; */
        height: 150px;
        width: 150px;
    }

    .saveShow
    {
        margin: 0px;
        margin-top: -4px;
        padding: 0px;
        padding-top: 4px;
        padding-bottom: 4px;
        /* height: 30px; */
        font-weight: bold;
        color: black;
        background-color: green;
    }

    .saveShow:hover
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