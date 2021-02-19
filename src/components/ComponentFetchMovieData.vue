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
        let movieId = useRouter().currentRoute.value.params.movieId
        // console.log(showId)

        // vuex
        const store = useStore()
        // const selectedMovie = computed(() => { return store.getters['showData/selectedMovie'] })

        //functions
        fetchMovieData(movieId)

        async function fetchMovieData(id)
        {
            var movieData = null
            var movieNumber = id
            var airDate = null
            var localStorageData = []
            var url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        
            await fetch(url, {method: 'get'})
            .then((response) => {
                  console.log("movie#" + id + " data fetched from API")
                  return response.json()
            })
            .then((data) => {
                console.log(data)
                
                //set variables
                movieData = {id: data.id, name: data.name, data: data}
                // console.log(showData)
  
                // save to localStorage
                let ls = localStorage.getItem("savedMovies")
                if(ls)
                {
                    localStorageData = JSON.parse(ls)
                }
                let checkLocalStorage = JSON.stringify(localStorageData)
                if(checkLocalStorage.includes('MovieId=' + data.id))
                {
                    console.log("movie exist in localStorage")
                }
                else
                {
                    localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'MovieId=' + data.id})
                    localStorage.setItem("savedMovies", JSON.stringify(localStorageData))
                    console.log("movie saved to localStorage")
                }

                //vuex
                store.dispatch('showData/actionSetSelectedMovie', movieData)
            })
        }

        return {
            //selectedMovie
        }   
    }
}
</script>

<style scoped>

</style>