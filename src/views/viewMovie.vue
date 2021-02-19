<template>
  <div id="viewMovie">
    <ComponentFetchMovieData />
    <ComponentMovie />
  </div>
</template>

<script>
import ComponentFetchMovieData from '@/components/ComponentFetchMovieData.vue' // @ is an alias to /src
import ComponentMovie from '@/components/ComponentMovie.vue'

export default {
  name: 'viewMovie',
  components: {
    ComponentFetchMovieData,
    ComponentMovie
  }
}
</script>

<style scoped>
  #viewMovie
  {
    margin: 0px;
    padding: 0px;
    min-height: 1000px;
  }
</style>
