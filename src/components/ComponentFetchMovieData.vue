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
        let movieId = useRouter().currentRoute.value.params.movieId

        //vuex
        const store = useStore()
        // const selectedMovie = computed(() => { return store.getters['showData/selectedMovie'] })

        //variables
        var movieData = null
        var localStorageData = []
        var url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=3010e2bf9f8b7fbc8e38ec004850995b"
        var diff = null

        //functions
        async function fetchMovieData(id)
        {
            //get local storage saved movies data
            let ls = localStorage.getItem("savedMovies")
            if(ls)
            {
                localStorageData = JSON.parse(ls)
            }
            let checkLocalStorage = JSON.stringify(localStorageData)
            
            //check if movie is saved in local storage
            if(checkLocalStorage.includes('MovieId=' + id))
            {
                console.log("movie exist in localStorage")
                
                localStorageData.forEach(m => {
                        if(m.searchString == "MovieId="+ id)
                        {
                            movieData = m
                            diff = Math.abs(Date.now() - movieData.savedAt)
                            //console.log("savedAt: " + movieData.savedAt)
                            //console.log("diff: " + diff)
                            
                            //if last fetch was more than 1h ago fetch new data
                            if(diff >= 3600000) //3.600.000 = 1h
                            {
                                localStorageData = localStorageData.filter(movie => movie.id != id); //remove old data
                                fetchData(id)
                            }
                            else
                            {
                                //vuex
                                store.dispatch('showData/actionSetSelectedMovie', movieData)
                            }
                        }
                    })
            
            }
            //if movie is not saved fetch from API
            else
            {
                fetchData(id)
            }
        
        }

        async function fetchData(id)
        {
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
                    // let ls = localStorage.getItem("savedMovies")
                    // if(ls)
                    // {
                    //     localStorageData = JSON.parse(ls)
                    // }
                    // let checkLocalStorage = JSON.stringify(localStorageData)
                    // if(checkLocalStorage.includes('MovieId=' + data.id))
                    // {
                    //     console.log("movie exist in localStorage")
                    // }
                    // else
                    // {
                    localStorageData.push({id: data.id, name: data.name, data: data, searchString: 'MovieId=' + data.id, savedAt: Date.now()})
                    localStorage.setItem("savedMovies", JSON.stringify(localStorageData))
                    console.log("movie saved to localStorage")
                    // }
    
                    //vuex
                    store.dispatch('showData/actionSetSelectedMovie', movieData)
                })
        }

        fetchMovieData(movieId)

        return {
            //selectedMovie
        }   
    }
}
</script>

<style scoped>

</style>