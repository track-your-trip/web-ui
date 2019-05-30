<template>
  <layout-app-fullscreen>
    <trip-map :trip="trip" :loading="loadingTrip" @update:trip="onUpdateTrip" />

    <template v-slot:drawerRight>
      <location-timeline :locations="locations" :loading="loadingLocations" />
    </template>
  </layout-app-fullscreen>
</template>

<script>
import TripMap from '~/components/TripMap.vue'
import LocationTimeline from '~/components/LocationTimeline.vue'

import TripApi from '~/api/trips.js'
import LocationApi from '~/api/locations.js'

export default {
  components: {
    TripMap,
    LocationTimeline
  },

  data() {
    return {
      loadingTrip: false,
      loadingLocations: false,
      trip: {},
      locations: []
    }
  },

  async mounted() {
    let tripId = this.$route.params.id

    this.loadTrip(tripId)
    this.loadLocations(tripId)
  },

  watch: {
    $route(to, from) {
      console.log(to, from)
    }
  },

  methods: {
    onUpdateTrip(trip) {
      this.loadingTrip = true

      this.$store.dispatch('trips/update', trip).then(trip => {
        this.trip = trip
        this.loadingTrip = false
      })
    },

    loadTrip(id) {
      this.loadingTrip = true

      TripApi.load(id)
        .then(trip => {
          this.trip = trip
          this.loadingTrip = false
        })
        .catch(() => {
          this.trip = {}
          this.loadingTrip = false
        })
    },

    loadLocations(id) {
      this.loadingLocations = true

      LocationApi.list(id)
        .then(locations => {
          this.locations = locations
          this.loadingLocations = false
        })
        .catch(() => {
          this.locations = []
          this.loadingLocations = false
        })
    }
  }
}
</script>
