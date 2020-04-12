<template>
  <v-card>
    <v-card-title primary-title>
      <span class="headline">Trips</span>
      <v-spacer />
      <v-text-field
        v-model="search"
        :disabled="$store.getters['trips/loading']"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="$store.getters['trips/trips']"
        :search="search"
        :loading="$store.getters['trips/loading']"
      >    
        <template v-slot:no-data>
          <v-row justify="center">
            <trip-details-dialog @save="onAddTrip">
              <template v-slot:default="{ on }">
                <v-btn color="primary" small block text v-on="on"
                  >Add your first trip</v-btn
                >
              </template>
            </trip-details-dialog>
          </v-row>
        </template>

        <!-- action -->
        <template v-slot:item.action="{ item }">
          <v-btn
            text
            small
            icon
            :to="{ name: 'trip', params: { id: item.id } }"
          >
            <v-icon small>remove_red_eye</v-icon>
          </v-btn>
          <v-btn text small icon @click="shareTrip(item)">
            <v-icon small>share</v-icon>
          </v-btn>
          <v-btn text small icon @click="deleteTrip(item)">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <trip-details-dialog
        v-if="$store.getters['trips/trips'].length > 0"
        @save="onAddTrip"
      >
        <template v-slot:default="{ on }">
          <v-btn color="primary" v-on="on">Add Trip</v-btn>
        </template>
      </trip-details-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import TripDetailsDialog from '@/components/TripDetailsDialog.vue'

export default {
  components: {
    TripDetailsDialog
  },

  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      search: ''
    }
  },

  mounted() {
    this.loadTrips()
  },

  methods: {
    onAddTrip(trip) {
      this.$store.dispatch('trips/add', trip).then(trip => {
        this.$router.push({ name: 'trip', params: { id: trip.id } })
      })
    },

    loadTrips() {
      this.$store.dispatch('trips/load')
    },

    deleteTrip(trip) {
      if (
        confirm('Would you really like to delete the trip "' + trip.name + '"?')
      ) {
        this.$store.dispatch('trips/delete', trip.id)
      }
    },

    shareTrip(trip) {
      console.log('Share Trip', trip)
    }
  }
}
</script>
