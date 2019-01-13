<template>
  <v-layout
    column
    justify-center
    align-center
    class="layout-map">
    <v-flex
      xs12
      sm12
      md12
      class="flex-map">
      <Map />
    </v-flex>
  </v-layout>
</template>

<script>
import Map from '~/components/Map.vue'

export default {
  components: {
    Map
  }
}
</script>

<style lang='scss' scoped>
.layout-map {
  width: 100%;
  height: 100%;
}
.flex-map {
  width: 100%;
  height: 100%;
}
</style>
