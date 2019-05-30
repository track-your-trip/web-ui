import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faUserTie as fasUserTie,
  faMap as fasMap,
  faMapMarked as fasMapMarked,
  faMapMarker as fasMapMarker
} from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'

// fontawesome solid icons
library.add(fasUserTie, fasMap, fasMapMarked, fasMapMarker)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
