<template>
  <div class="asdf">
    <ComponentAdsf />,
    <Seasons />,
    <Episodes />
  </div>
</template>

<script>
import ComponentAdsf from '@/components/ComponentAsdf.vue' // @ is an alias to /src
import Seasons from '@/components/ComponentSeasons.vue' // @ is an alias to /src
import Episodes from '@/components/ComponentEpisodes.vue'

export default {
  name: 'Asdf',
  components: {
    ComponentAdsf,
    Seasons,
    Episodes
  }
}
</script>
