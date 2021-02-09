<template>
  <div class="show">
    <Seasons />
    <Episodes />
  </div>
</template>

<script>
import Seasons from '@/components/ComponentSeasons.vue' // @ is an alias to /src
import Episodes from '@/components/ComponentEpisodes.vue'

export default {
  name: 'Show',
  components: {
    Seasons,
    Episodes
  }
}
</script>
