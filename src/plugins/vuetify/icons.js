import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// INFO: We have to import the font-awesome icons in the file vue-fontawesome.js first

export default {
  'user-tie': {
    component: FontAwesomeIcon,
    props: {
      icon: ['fas', 'user-tie']
    }
  }
}
