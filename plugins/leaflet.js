import Vue from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LControl,
  LControlZoom,
  LControlScale,
  LPopup
} from 'vue2-leaflet'

import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-control', LControl)
Vue.component('l-control-zoom', LControlZoom)
Vue.component('l-control-scale', LControlScale)
Vue.component('l-popup', LPopup)
