<template>
  <div id="nav">
    <div id="header">
      <router-link to="/"><h1 id="backArrow">&nbsp;‹</h1></router-link>
    </div>
    <router-view />
    <div id="footer">x</div>
  </div>
</template>

<script>
export default {
  
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
  position: relative;
  bottom: 0;
  margin: 0px;
  margin-top: 10px;
  /* margin-left: -17px; */
  padding: 0px;
  width: 100%;
  color: black;
  background-color: lightgray;
}

#backArrow
{
  margin: 0px;
  padding: 0px;
  width: 100vw;
  font-size: 20px;
  text-align: left;
  /* opacity: 70%; */
  color: black;
  background-color: white;
}

a
{
  text-decoration: none;
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
    padding: 0px;
  }

  body {
    /* background-color: black; */
  }
}
</style>
