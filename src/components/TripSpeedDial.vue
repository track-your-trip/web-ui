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
        <v-icon v-if="fab">edit</v-icon>
        <v-icon v-else>close</v-icon>
      </v-btn>
    </template>
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

    <location-details-dialog
      text-save="Update"
      @save="$emit('store:location', $event)"
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
          <v-icon small>$vuetify.icons.map-marked</v-icon>
        </v-btn>
      </template>
    </location-details-dialog>
  </v-speed-dial>
</template>

<script>
import TripDetailsDialog from '@/components/TripDetailsDialog.vue'
import LocationDetailsDialog from '@/components/LocationDetailsDialog.vue'

export default {
  components: {
    TripDetailsDialog,
    LocationDetailsDialog
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
