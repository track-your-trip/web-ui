<template>
  <v-speed-dial
    v-model="fab"
    top
    left
    direction="bottom"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        :disabled="loading"
        :loading="loading"
        color="primary"
        dark
        fab
      >
        <v-icon>edit</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </template>

    <trip-details-dialog
      :trip="trip"
      text-save="Update"
      @save="$emit('update:trip', $event)"
    >
      <template v-slot:default="{ on }">
        <v-btn
          :disabled="loading"
          :loading="loading"
          fab
          dark
          small
          color="primary"
          v-on="on"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
    </trip-details-dialog>

    <v-btn
      :disabled="loading"
      :loading="loading"
      fab
      dark
      small
      color="primary"
      @click="$emit('click:add-location')"
    >
      <v-icon small>$vuetify.icons.map-marked</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import TripDetailsDialog from '~/components/TripDetailsDialog.vue'

export default {
  components: {
    TripDetailsDialog
  },

  props: {
    trip: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      fab: false
    }
  }
}
</script>

<style>
.v-speed-dial {
  position: absolute;
}
</style>
