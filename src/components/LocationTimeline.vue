<template>
  <v-container pa-0 fill-height>
    <v-layout v-if="loading" align-center justify-center>
      <v-progress-circular indeterminate color="primary" size="50" />
    </v-layout>

    <v-layout v-else-if="locations.length === 0" align-center justify-center>
      No locations found
    </v-layout>

    <v-timeline v-else align-top dense>
      <item
        v-for="location in locations"
        :key="location.id"
        :location="location"
      />
    </v-timeline>
  </v-container>
</template>

<script>
import Item from '~/components/LocationTimelineItem.vue'

export default {
  props: {
    locations: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    }
  },

  components: {
    Item
  }
}
</script>
