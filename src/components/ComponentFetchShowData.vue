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
        //router
        let showId = useRouter().currentRoute.value.params.showId

        // vuex
        const store = useStore()
        const selectedShow = computed(() => { return store.getters['showData/selectedShow'] })

        //variables
        var showData = null
        var localStorageData = []
        var url = "https://api.themoviedb.org/3/tv/" + showId + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        var diff = null

        //lifecycle hooks
        onMounted(() => {

            //refresh episode list
            undisplayEpisodeList()

            //reset scroll to top
            window.scrollTo(0,0);
        })

        //functions
        async function fetchShowData(id)
        {

            //get local storage saved movies data
            let ls = localStorage.getItem("savedShows")
            if(ls)
            {
                localStorageData = JSON.parse(ls)
            }
            let checkLocalStorage = JSON.stringify(localStorageData)

            //check if show is saved in local storage
            if(checkLocalStorage.includes('ShowId=' + id))
            {
                //find show object
                localStorageData.forEach(s => {
                        if(s.searchString == "ShowId="+ id)
                        {
                            showData = s
                            diff = Math.abs(Date.now() - showData.savedAt)
                            
                            //if last fetch was more than 1h ago fetch new data
                            if(diff >= 3600000) //3.600.000 = 1h
                            {
                                localStorageData = localStorageData.filter(show => show.id != id); //remove old data
                                fetchData(id)
                            }
                            else
                            {
                                //vuex
                                store.dispatch('showData/actionSetSelectedShow', showData)
                            }
                        }
                    })
            }
            else
            {
                fetchData(id)
            }
        }

        async function fetchData(id)
        {
            await fetch(url, {method: 'get'})
            .then((response) => {
                console.log("show#" + id + " data fetched from API")
                return response.json()
            })
            .then((data) => {
                
                //set variables
                showData = {id: data.id, name: data.name, data: data}

                //save to local storage
                localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'ShowId=' + data.id, savedAt: Date.now()})
                localStorage.setItem("savedShows", JSON.stringify(localStorageData))

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
        
        //onload
        fetchShowData(showId)

        return {
            
        }   
    }
}
</script>

<style scoped>

</style>