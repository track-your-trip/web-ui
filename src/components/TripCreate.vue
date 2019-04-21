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
      <v-data-table :headers="headers" :items="trips" :search="search">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="justify-center">
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <router-link to="/trips/create">Add your first trip</router-link>
        </template>
      </v-data-table>
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
      trips: [
        {
          name: 'Trip 1',
          description: 'Description of Trip 1'
        },
        {
          name: 'Trip 2',
          description: 'Description of Trip 2'
        }
      ],
      search: ''
    }
  },

  methods: {}
}
</script>
