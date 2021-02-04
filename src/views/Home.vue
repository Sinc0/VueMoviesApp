<template>
  <div class="home">
    <Shows />
    <Seasons />
    <Episodes />
  </div>
</template>

<script>
import Shows from '@/components/shows.vue'
import Seasons from '@/components/seasons.vue' // @ is an alias to /src
import Episodes from '@/components/episodes.vue'

export default {
  name: 'Home',
  components: {
    Shows,
    Seasons,
    Episodes
  }
}
</script>
