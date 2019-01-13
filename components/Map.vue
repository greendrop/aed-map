<template>
  <div id="component-map" />
</template>

<script>
import L from 'leaflet'

export default {
  name: 'Map',
  data() {
    return {
      canGeolocation: navigator.geolocation ? true : false,
      map: null,
      aedLayerGroup: null,
      addedAedPositions: []
    }
  },
  computed: {
    centerLatitude() {
      return this.$store.getters['maps/centerLatitude']
    },
    centerLongitude() {
      return this.$store.getters['maps/centerLongitude']
    },
    aedPositions() {
      return this.$store.getters['maps/aedPositions']
    }
  },
  watch: {
    centerLatitude(value) {
      const center = this.map.getCenter()
      if (center && value !== center.lat) {
        this.map.panTo([this.centerLatitude, this.centerLongitude])
      }
    },
    centerLongitude(value) {
      const center = this.map.getCenter()
      if (center && value !== center.lng) {
        this.map.panTo([this.centerLatitude, this.centerLongitude])
      }
    },
    aedPositions(value) {
      if (!this.aedLayerGroup) {
        this.aedLayerGroup = new L.LayerGroup()
        this.aedLayerGroup.addTo(this.map)
      }

      for (let position of value) {
        const find = this.addedAedPositions.find(item => {
          item.Latitude === position.Latitude &&
            item.Longitude === position.Longitude
        })
        if (!find) {
          const marker = L.marker([
            position.Latitude,
            position.Longitude
          ]).bindPopup(position.LocationName)
          this.aedLayerGroup.addLayer(marker)
          this.addedAedPositions.push(position)
        }
      }
    }
  },
  created() {
    // 初期地点を東京駅に設定
    this.$store.dispatch('maps/setCenter', {
      latitude: 35.681236,
      longitude: 139.767125
    })
  },
  mounted() {
    // 地図を定義
    const mapOption = { zoomControl: false }
    this.map = L.map('component-map', mapOption).setView(
      [this.centerLatitude, this.centerLongitude],
      16
    )

    // スケールを表示
    L.control.scale().addTo(this.map)

    // コントロールを追加
    L.control
      .zoom({
        position: 'bottomright'
      })
      .addTo(this.map)
    const panToCurrentPosition = this.panToCurrentPosition
    const currentPositionControl = L.Control.extend({
      options: { position: 'bottomright' },
      onAdd: function(map) {
        const control = L.DomUtil.create('div', 'leaflet-bar leaflet-control')
        const button = L.DomUtil.create('a', '', control)
        button.onclick = function(event) {
          event.stopPropagation()
          panToCurrentPosition()
        }
        const icon = L.DomUtil.create(
          'i',
          'v-icon material-icons theme--light',
          button
        )
        icon.style.width = '100%'
        icon.style.height = '100%'
        icon.style['text-align'] = 'center'
        icon.style['vertical-align'] = 'middle'
        icon.innerHTML = 'gps_fixed'
        return control
      }
    })
    this.map.addControl(new currentPositionControl())

    // 地図のタイルをセット
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright" target="blank">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    // イベントをセット
    this.map.on('moveend', this.moveend)

    // moveendイベントを発火
    this.map.fire('moveend')

    // 現在地に移動
    this.panToCurrentPosition()
  },
  methods: {
    moveend(event) {
      const center = this.map.getCenter()
      this.$store.dispatch('maps/setCenter', {
        latitude: center.lat,
        longitude: center.lng
      })
      this.$store.dispatch('maps/getAedPositions', {
        latitude: center.lat,
        longitude: center.lng
      })
    },
    // 地図の中心を移動
    panTo(latitude, longitude) {
      this.$store.dispatch('maps/setCenter', {
        latitude: latitude,
        longitude: longitude
      })
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
</style>
