<template>
  <v-card>
    <v-card-title primary-title>
      <span class="headline">Trips</span>
      <v-spacer />
      <v-text-field
        v-model="search"
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
          <div class="text-xs-center">
            <router-link :to="{ name: 'trip-create' }"
              >Add your first trip</router-link
            >
          </div>
        </template>
      </v-data-table>
      <v-btn color="primary" :to="{ name: 'trip-create' }">Add Trip</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
