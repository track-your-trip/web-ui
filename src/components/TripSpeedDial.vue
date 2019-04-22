<template>
  <v-speed-dial
    v-model="fab"
    top
    left
    direction="bottom"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="primary" dark fab>
        <v-icon>edit</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="primary" @click="$emit('clickEditTrip')">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="primary"
      @click="$emit('clickAddLocation')"
      disabled
    >
      <v-icon>fas fa-map-marked</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    }
  },

  methods: {
    save() {
      console.log('save', this.name, this.description)
    }
  }
}
</script>

<style>
.v-speed-dial {
  position: absolute;
}
</style>
