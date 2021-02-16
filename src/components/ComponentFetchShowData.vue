<template>
  <div>
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
        // console.log(showId)

        // vuex
        const store = useStore()
        const selectedShow = computed(() => { return store.getters['showData/selectedShow'] })

        //functions
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
                  console.log("show#" + id + " data fetched from API")
                  return response.json()
            })
            .then((data) => {
                // console.log(data)
                
                //set variables
                showData = {id: data.id, name: data.name, data: data}
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

                //refresh episode list
                undisplayEpisodeList()

                //vuex
                store.dispatch('showData/actionSetSelectedShow', showData)
            })
        }

        function undisplayEpisodeList()
        {
            var episodeList = document.getElementById("selectedSeasonEpisodes")
            
            if(episodeList != null)
            {
                episodeList.style.display = "none"
            }
        }

        return {
            //selectedShow
        }   
    }
}
</script>

<style scoped>

</style>