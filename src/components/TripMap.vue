<template>
  <v-container fill-height pa-0>
    <div id="map"></div>
    <trip-speed-dial
      :trip="trip"
      :loading="loading"
      @update:trip="$emit('update:trip', $event)"
      @click:edit-trip="onEditTrip"
      @click:add-location="onAddLocation"
    />
  </v-container>
</template>

<script>
import TripSpeedDial from '~/components/TripSpeedDial.vue'

import gmapsInit from '~/utils/gmaps'

export default {
  components: {
    TripSpeedDial
  },

  props: {
    trip: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      mode: '',
      google: null,
      map: null
    }
  },

  computed: {
    isModeAddMarker() {
      return this.mode === 'ADD_MARKER'
    }
  },

  async mounted() {
    try {
      this.google = await gmapsInit()
      const geocoder = new this.google.maps.Geocoder()
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })

      let vm = this

      this.google.maps.event.addListener(this.map, 'click', function(event) {
        console.log('HI')
        vm.placeMarker(event.latLng)
      })

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
  },

  methods: {
    onEditTrip() {
      this.$refs.refTripDetailsDialog.open()
    },

    onAddLocation() {
      console.log('open add location dialog')
      this.mode === 'ADD_MARKER'
    },

    placeMarker(location) {
      let marker = new this.google.maps.Marker({
        position: location,
        map: this.map
      })
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
