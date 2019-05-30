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
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">
            <v-btn
              flat
              small
              icon
              :to="{ name: 'trip', params: { id: props.item.id } }"
            >
              <v-icon small>remove_red_eye</v-icon>
            </v-btn>
            <v-btn flat small icon @click="shareTrip(props.item)">
              <v-icon small>share</v-icon>
            </v-btn>
            <v-btn flat small icon @click="deleteTrip(props.item)">
              <v-icon small>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template v-slot:no-data>
          <v-layout justify-center>
            <trip-details-dialog @save="onAddTrip">
              <template v-slot:default="{ on }">
                <v-btn color="primary" small block flat v-on="on">Add your first trip</v-btn>
              </template>
            </trip-details-dialog>
          </v-layout>
        </template>
      </v-data-table>

      <trip-details-dialog v-if="$store.getters['trips/trips'].length > 0" @save="onAddTrip">
        <template v-slot:default="{ on }">
          <v-btn color="primary" v-on="on">Add Trip</v-btn>
        </template>
      </trip-details-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import TripDetailsDialog from '~/components/TripDetailsDialog.vue'

export default {
  components: {
    TripDetailsDialog
  },

  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
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
