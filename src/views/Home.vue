<template>
  <div class="home">
    <Seasons />
    <Episodes />
  </div>
</template>

<script>
import Seasons from '@/components/seasons.vue' // @ is an alias to /src
import Episodes from '@/components/episodes.vue'

export default {
  name: 'Home',
  components: {
    Seasons,
    Episodes
  }
}
</script>
