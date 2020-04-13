import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import {
  required,
  between,
  min,
  max,
  email,
  numeric,
  confirmed
} from 'vee-validate/dist/rules'
import de from 'vee-validate/dist/locale/de.json'

// Add rules
extend('required', required)
extend('between', between)
extend('min', min)
extend('max', max)
extend('email', email)
extend('numeric', numeric)
extend('confirmed', confirmed)

// install and set language
localize('de', de)

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
