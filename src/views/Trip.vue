<template>
  <layout-app-fullscreen>
    <div id="map"></div>
    <trip-speed-dial
      @click:edit-trip="onEditTrip"
      @click:add-location="onAddLocation"
    />
    <trip-details-dialog ref="refTripDetailsDialog" v-model="trip" />

    <template v-slot:drawerRight>
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-layout pt-3>
            <v-flex xs3>
              <strong>5pm</strong>
            </v-flex>
            <v-flex>
              <strong>New Icon</strong>
              <div class="caption">Mobile App</div>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>3-4pm</strong>
            </v-flex>
            <v-flex>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">Hangouts</div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>

                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-layout pt-3>
            <v-flex xs3>
              <strong>12pm</strong>
            </v-flex>
            <v-flex>
              <strong>Lunch break</strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout pt-3>
            <v-flex xs3>
              <strong>9-11am</strong>
            </v-flex>
            <v-flex>
              <strong>Finish Home Screen</strong>
              <div class="caption">Web App</div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </template>
  </layout-app-fullscreen>
</template>

<script>
import TripSpeedDial from '../components/TripSpeedDial.vue'
import TripDetailsDialog from '../components/TripDetailsDialog.vue'
import TripApi from '../api/trips.js'
import gmapsInit from '../utils/gmaps'

export default {
  components: {
    TripSpeedDial,
    TripDetailsDialog
  },

  data() {
    return {
      trip: {},
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
      this.loadTrip()
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

    loadTrip() {
      TripApi.load(this.$route.params.id).then(trip => (this.trip = trip))
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
