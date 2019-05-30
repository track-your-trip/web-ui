<template>
  <layout-app-fullscreen>
    <div id="map"></div>
    <trip-speed-dial
      @click:edit-trip="onEditTrip"
      @click:add-location="onAddLocation"
    />
    <trip-details-dialog ref="refTripDetailsDialog" v-model="trip" />

    <template v-slot:drawerRight>
      <location-timeline :locations="locations" :loading="loadingLocations" />
    </template>
  </layout-app-fullscreen>
</template>

<script>
import TripSpeedDial from '~/components/TripSpeedDial.vue'
import TripDetailsDialog from '~/components/TripDetailsDialog.vue'
import LocationTimeline from '~/components/LocationTimeline.vue'
import TripApi from '~/api/trips.js'
import LocationApi from '~/api/locations.js'
import gmapsInit from '~/utils/gmaps'

export default {
  components: {
    TripSpeedDial,
    TripDetailsDialog,
    LocationTimeline
  },

  data() {
    return {
      loadingTrip: false,
      loadingLocations: false,
      trip: {},
      locations: [],
      mode: '',
      google: null,
      map: null
    }
  },

  async mounted() {
    if (this.$route.name === 'trip-create') {
      // a new trip should be created so we initially open the trip-details-dialog
      this.initNewTrip()
    } else {
      // a existing trip should be opened
      this.initExistingTrip()
    }

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

  watch: {
    $route(to, from) {
      console.log(to, from)
    }
  },

  computed: {
    isModeAddMarker() {
      return this.mode === 'ADD_MARKER'
    }
  },

  methods: {
    initNewTrip() {
      this.trip = {}
      this.onEditTrip()
    },

    initExistingTrip() {
      let tripId = this.$route.params.id

      this.loadTrip(tripId)
      this.loadLocations(tripId)
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
    },

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
