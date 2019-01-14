<template>
  <div id="component-map">
    <no-ssr>
      <l-map 
        ref="map" 
        :zoom="zoom"
        :center="center"
        :options="{ zoomControl: false }"
        @update:center="centerUpdate">
        <l-tile-layer 
          :url="tileUrl"
          :attribution="tileAttribution" />
        <l-control-zoom position="bottomright" />
        <l-control 
          v-if="canGeolocation" 
          position="bottomright">
          <div class="leaflet-bar">
            <a @click="panToCurrentPosition">
              <v-icon class="icon-current">gps_fixed</v-icon>
            </a>
          </div>
        </l-control>
        <l-control-scale position="bottomleft" />

        <l-marker 
          v-for="marker in markers"
          :key="marker.Id"
          :lat-lng="{ lat: marker.Latitude, lng: marker.Longitude }">
          <l-popup 
            :content="marker.LocationName" 
            :title="marker.LocationName" />
        </l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      canGeolocation: navigator.geolocation ? true : false,
      zoom: 16,
      center: { lat: 35.681236, lng: 139.767125 }, // 東京駅
      tileUrl: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      tileAttribution:
        '&copy; <a href="http://osm.org/copyright" target="blank">OpenStreetMap</a> contributors',
      markers: []
    }
  },
  computed: {
    aedPositions() {
      return this.$store.getters['maps/aedPositions']
    }
  },
  watch: {
    aedPositions(value) {
      for (let position of value) {
        const find = this.markers.find(item => {
          return item.Id === position.Id
        })
        if (!find) {
          this.markers.push(position)
        }
      }
    }
  },
  mounted() {
    // 現在地に移動
    this.panToCurrentPosition()

    // 初回のcenterUpdateを実行
    this.centerUpdate(this.center)
  },
  methods: {
    centerUpdate(center) {
      this.center.lat = center.lat
      this.center.lng = center.lng
      this.$store.dispatch('maps/getAedPositions', {
        latitude: center.lat,
        longitude: center.lng
      })
    },
    // 地図の中心を移動
    panTo(lat, lng) {
      this.center.lat = lat
      this.center.lng = lng
    },
    // 地図の中心を現在地に移動
    panToCurrentPosition() {
      if (this.canGeolocation) {
        const panTo = this.panTo
        navigator.geolocation.getCurrentPosition(function(position) {
          panTo(position.coords.latitude, position.coords.longitude)
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
#component-map {
  width: 100%;
  height: 100%;
}
.icon-current {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
}
</style>
