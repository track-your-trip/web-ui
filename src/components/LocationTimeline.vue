<template>
  <v-container class="pa-0 fill-height">
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular indeterminate color="primary" size="50" />
    </v-row>

    <v-row v-else-if="locations.length === 0" align="center" justify="center">
      <v-btn color="primary" small @click="$emit('click:add-location')"
        >Add your first location</v-btn
      >
    </v-row>

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
import Item from '@/components/LocationTimelineItem.vue'

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
