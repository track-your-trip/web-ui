import Vue from 'vue'

Vue.filter('currency', function(value) {
  return (value || 0).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })
})
