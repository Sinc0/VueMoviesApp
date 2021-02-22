<template>
  <div id="viewPageNotFound">
      <h3>404 Error</h3>
      <p>the URL that you requested does not exist</p>
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
  #viewPageNotFound
  {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;
  }

  @media screen and (max-width: 1024px) {
      h3 {
          margin: 0px;
          margin-top: 20px;
          margin-bottom: 20px;
          padding: 0px;
      }

      p {
          margin: 0px;
          margin: auto;
          padding: 0px;
          width: 90vw;
      }
  }
</style>