<template>
  <div>
    <!-- {{$route.params}} -->
    <!-- {{showTest}} -->
    <!-- {{count}} -->
    <!-- {{showData}} -->
  </div>
</template>

<script>
import {ref, reactive, computed, onMounted, onBeforeUpdate} from 'vue'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
import router from '../router'

export default {
    setup()
    {
        let showId = useRouter().currentRoute.value.params.showId
        console.log(showId)

        // vuex
        const store = useStore() //same as this.$store
        // const selectedShow = computed(() => store.getters['showData/selectedShow'])
        const count = computed(() => store.getters['showData/times'])
        const showTest = computed(() => { return store.getters['showData/selectedShow'] })
        console.log(showTest.value)
        
        // variables
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

        fetchShowData(showId)

        async function fetchShowData(id)
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
                console.log(data)
                
                //set variables
                showData = {id: data.id, name: data.name, data: data}
                console.log(showData)

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

                //                //router
                // router.push('/show')
            })
        }

        return {
            // showData,
            // count,
            showTest
        }   

        return {

        }
    }
}
</script>

<style scoped>

</style>