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
          <td class="justify-center">
            <v-icon small class="mr-2" @click="editTrip(props.item)"
              >edit</v-icon
            >
            <v-icon small @click="deleteTrip(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <router-link to="/trips/create">Add your first trip</router-link>
        </template>
      </v-data-table>
      <v-btn color="primary" to="/trips/create">Add Trip</v-btn>
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
    this.$store.dispatch('trips/load')
  },

  methods: {
    deleteTrip(trip) {
      if (
        confirm('Would you really like to delete the trip "' + trip.name + '"?')
      ) {
        this.$store.dispatch('trips/delete', trip.id)
      }
    }
  }
}
</script>
