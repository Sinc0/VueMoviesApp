<template>
  <div id="viewStart">
    <ComponentStart />
  </div>
</template>

<script>
import ComponentStart from '@/components/ComponentStart.vue'

export default {
  name: 'viewStart',
  components: {
      ComponentStart
  }
}
</script>

<style scoped>
  #viewStart
  {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;
  }
</style>
