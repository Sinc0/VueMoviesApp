<template>
    <div id="viewCredits">
        <h3>Credits</h3>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
        <a href="https://www.themoviedb.org"><img v-bind:src="'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'" id="tmdbLogo" /></a>
    </div>
</template>

<script>
import {onMounted} from 'vue'

export default {
    setup() {
    
    //lifecycle hooks
    onMounted(() => {
        if(screen.width < 1024)
        {
          document.getElementById("header").style.display = "block" //display header
        }
        else
        {
          document.getElementById("header").style.display = "none" //display header
        }
        
        window.scrollTo(0,0); //reset scroll to top
    })

    return {

    }
  }
}
</script>

<style scoped>
  #viewCredits
  {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;
  }

  #tmdbLogo
  {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    width: 23vw;
  }

  h3, p {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    color: black;
  }
  
  @media screen and (max-width: 1024px) {
      p {
          margin: auto;
          margin-top: 10px;
          width: 90vw;
      }
      
      #tmdbLogo
      {
        width: 70vw;
      } 
  }
</style>