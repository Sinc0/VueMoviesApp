<template>
  <div id="viewShow">
    <ComponentFetchShowData />
    <br />
    <ComponentSeasons />
    <br />
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

<style scoped>
  #viewShow
  {
    margin: 0px;
    padding: 0px;
    min-height: 1000px;
  }

  @media screen and (max-width: 1024px) {
    #viewShow
    {
      margin: 0px;
      padding: 0px;
      min-height: 0px;
    }
  }
</style>
