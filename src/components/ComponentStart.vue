<template>
  <div>
    <div>
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
  </div>
</template>

<script>
import {ref, reactive, computed} from 'vue'
import {useStore} from 'vuex'
import router from '../router'

export default {
    setup() {

        //composition API here

        return {

        }
    }
}
</script>

<style scoped>
    #scrollBarShows
    {
        margin: auto;
        /* margin-top: 20vh; */
        padding-bottom: 5px;
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
      
    /* width */
    ::-webkit-scrollbar {
        height: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: #41B883;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: black;
    }

</style>