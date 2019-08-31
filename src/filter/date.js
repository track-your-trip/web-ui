import Vue from 'vue'

Vue.filter('date', function(value) {
  if (!value) return ''

  const filter = Vue.filter('moment')
  return filter(value, 'DD.MM.YYYY')
})
