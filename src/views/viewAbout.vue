<template>
  <div id="viewAbout">
      <h3>About</h3>
      <p>This is a student project, made by reason to learn about Vue.</p>
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
  #viewAbout
  {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;
  }
  
  h3, p {
    color: black;
  }

  @media screen and (max-width: 1024px) {
      h3 {
          margin: 0px;
          margin-top: 20px;
          padding: 0px;
      }

      p {
          margin: 0px;
          margin: auto;
          margin-top: 10px;
          padding: 0px;
          width: 90vw;
      }
  }
</style>