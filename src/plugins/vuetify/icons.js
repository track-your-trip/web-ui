import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// INFO: We have to import the font-awesome icons in the file vue-fontawesome.js first

export default {
  'user-tie': {
    component: FontAwesomeIcon,
    props: {
      icon: ['fas', 'user-tie']
    }
  },
  map: {
    component: FontAwesomeIcon,
    props: {
      icon: ['fas', 'map']
    }
  },
  'map-marked': {
    component: FontAwesomeIcon,
    props: {
      icon: ['fas', 'map-marked']
    }
  }
}
