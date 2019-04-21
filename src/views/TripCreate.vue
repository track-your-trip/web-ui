<template>
  <layout-app-fullscreen>
    <!-- <trip-create /> -->
    <div id="map"></div>    
  </layout-app-fullscreen>
</template>

<script>
import TripCreate from '../components/TripCreate.vue'
import gmapsInit from '../utils/gmaps'

export default {
  components: {
    TripCreate
  },

  data() {
    return {
    }
  },

  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });

      /*
      geocoder.geocode({ address: 'Germany' }, (result, status) => {
        if (status !== 'OK' || !result[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })
      */

    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>