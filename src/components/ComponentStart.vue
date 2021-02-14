<template>
  <div>
    <div>
        count: {{ count }}
        <!-- <br /> -->
        <!-- {{ selectedShow }}  -->
        <div id="scrollBarShows">
            <div class="show">
                <router-link to="/asdf/1389123">
                    <img v-bind:src="''">
                </router-link>

                <!-- <img v-bind:src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'"> -->
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, computed} from 'vue'
import {useStore} from 'vuex'
import router from '../router'

export default {
    setup() {
        //vuex
        const store = useStore() //same as this.$store
        // const selectedShow = computed(() => store.getters['showData/selectedShow'])
        const count = computed(() => store.getters['showData/times'])
        
        //variables
        // let showInfo = reactive({
        //     name: null,
        //     description: null,
        //     status: null,
        //     poster: null,
        //     homePage: null,
        //     numberOfSeasons: null,
        //     seasons: null,
        //     numberOfEpisodes: null,
        //     episodes: null
        // })

        async function fetchShowData(id)
        {
            var showData = null
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
                console.log(data)
                
                //set variables
                showData = {id: data.id, name: data.name, data: data}
                // seasonData = {title: data.season_number, episodes: data.episodes}
                // seasonNumber = data.season_number
                // numberOfEpisodes = data.episodes.length
                // airDate = data.air_date
  
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

                //vuex
                console.log("show#" + id + " data fetched from API")

                store.dispatch('showData/actionSetSelectedShow', showData)
                store.dispatch('showData/actionSetCounter', 1)
                
                //router
                router.push('/show')
            })

        }

        return {
            fetchShowData,
            // selectedShow,
            count
        }
    }
}
</script>

<style scoped>
    #scrollBarShows
    {
        margin: auto;
        margin-top: 20vh;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        width: 1000px;
    }

    .show
    {
        display: inline-block;
        margin-right: 15px;
        height: 305px;
        width: 205px;
        background-image: url('');
    }

    img
    {
        height: 100%;
        width: 100%;
    }

</style>