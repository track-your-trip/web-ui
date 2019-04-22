<template>
  <layout-app-fullscreen>
    <div id="map"></div>
    <trip-speed-dial
      @clickEditTrip="openTripDetails"
      @clickAddLocation="openAddLocation"
    />
    <trip-details-dialog ref="refTripDetailsDialog" v-model="trip" />
  </layout-app-fullscreen>
</template>

<script>
import TripSpeedDial from '../components/TripSpeedDial.vue'
import TripDetailsDialog from '../components/TripDetailsDialog.vue'
import TripUtils from '../utils/trips.js'
import gmapsInit from '../utils/gmaps'

export default {
  components: {
    TripSpeedDial,
    TripDetailsDialog
  },

  data() {
    return {
      trip: {}
    }
  },

  async mounted() {
    if (this.$route.name === 'trip-create') {
      // a new trip should be created so we initially open the trip-details-dialog
      this.initNewTrip()
    } else {
      // a existing trip should be opened
      this.loadTrip()
    }

    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
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

  methods: {
    initNewTrip() {
      this.trip = {}
      this.openTripDetails()
    },

    loadTrip() {
      TripUtils.load(this.$route.params.id)
        .then((trip) => this.trip = trip)
    },

    openTripDetails() {
      this.$refs.refTripDetailsDialog.open()
    },

    openAddLocation() {
      console.log('open add location dialog')
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
