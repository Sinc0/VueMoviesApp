<template>
  <div id="nav">
    <!-- <div id="header">
      <router-link to="/"><h1 id="backArrow">‹</h1></router-link>
    </div> -->
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
  margin-top: 75px;
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
  padding-left: 15px;
  font-size: 40px;
  text-align: left;
  /* opacity: 70%; */
  color: black;
}

a
{
  text-decoration: none;
}

@media screen and (max-width: 1024px) {
  #nav {
    padding: 0px;
  }

  body {
    background-color: black;
  }
}
</style>
