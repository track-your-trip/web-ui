import Vue from 'vue'

Vue.filter('number', function(value) {
  return (value || 0).toLocaleString('de-DE')
})
