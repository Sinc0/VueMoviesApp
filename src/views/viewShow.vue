<template>
  <div class="show">
    <ComponentFetchShowData />,
    <ComponentSeasons />,
    <ComponentEpisodes />
  </div>
</template>

<script>
import ComponentFetchShowData from '@/components/ComponentFetchShowData.vue' // @ is an alias to /src
import ComponentSeasons from '@/components/ComponentSeasons.vue'
import ComponentEpisodes from '@/components/ComponentEpisodes.vue'

export default {
  name: 'viewShow',
  components: {
    ComponentFetchShowData,
    ComponentSeasons,
    ComponentEpisodes
  }
}
</script>
