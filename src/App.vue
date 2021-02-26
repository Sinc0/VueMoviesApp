<template>
  <div id="nav">
    <div id="header">
      <router-link to="/"><h1 id="backArrow">&nbsp;‹</h1></router-link>
    </div>
    <router-view />
    <div id="footer">
      <p v-on:click="scrollToTop()" id="scrollToTop" class="footerLink">Top</p><span class="footerLinkDivider"> - </span>
      <router-link to="/" class="footerLink"><p>Start</p></router-link><span class="footerLinkDivider"> - </span>
      <router-link to="/about" class="footerLink"><p>About</p></router-link><span class="footerLinkDivider"> - </span>
      <router-link to="/credits" class="footerLink"><p>Credits</p></router-link>
    </div>
  </div>
</template>

<script>
import {onMounted} from 'vue'

export default {
    setup() {
      function scrollToTop()
      {
        window.scrollTo(0,0); //reset scroll to top
      }

      return {
        //function
        scrollToTop
      }
    }

}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#header 
{
  display: none;
  position: relative;
  margin: 0px;
  margin-top: -7px;
  margin-bottom: 75px;
  margin-left: -17px;
  padding: 0px;
  padding-left: 10px;
  width: 100px;
  text-align: left;
  color: white;
  /* background-color: green; */
}

body {
  margin: 0px;
  padding: 0px;
  background-color: #41B883;
}

#footer 
{
  margin: 0px;
  margin-top: 20px;
  /* margin-left: -17px; */
  padding: 0px;
  padding-left: 3px;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  /* width: 100vw; */
  /* font-size: 20px; */
  color: black;
  background-color: white;
}

#footer p
{
  display: inline-block;
  margin: 0px;
  padding: 0px;
  padding: 3px;
  opacity: .35;
  font-weight: bold;
  color: black;
}

.footerLinkDivider
{
  opacity: .35%;
  font-weight: bold;
}

#backArrow
{
  margin: 0px;
  padding: 0px;
  width: 100vw;
  font-size: 20px;
  text-align: left;
  opacity: .70;
  color: black;
  background-color: white;
}

a
{
  text-decoration: none;
}

#scrollToTop:hover
{
  cursor: pointer;
}

/*** scrollbar ***/
    
    /* width */
    ::-webkit-scrollbar {
        /* margin-top: 10px; */
        /* height: 7px; */
        width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: black; /* #41B883 */
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        /* margin-top: 10px; */
        background-color: white;
    }

@media screen and (max-width: 1024px) {
  #nav {
    padding: 0px;
  }

  #header {
    display: block;
    margin: 0px;
    margin-top: -2px;
    padding: 0px;
  }

  #footer
  {
    margin-top: 10px;
  }

  /* body {
    background-color: black;
  } */

  /*** scrollbar ***/
    
    /* width */
    ::-webkit-scrollbar {
        display: none;
    }
}
</style>
