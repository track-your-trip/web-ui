<template>
  <v-timeline-item small fill-dot icon="$vuetify.icons.map-marker">
    <v-layout column pt-3 pr-3>
      <v-flex xs12 class="font-weight-bold">
        {{ location.beginn }} - {{ location.end }}
      </v-flex>
      <v-flex xs12>
        <div class="subheading">{{ location.name }}</div>
      </v-flex>
      <v-flex xs12>
        <div class="caption">{{ location.description }}</div>
      </v-flex>
      <v-flex xs12>
        <v-btn small flat color="primary" @click="onClickShow">Show</v-btn>
        <v-btn small flat color="error" @click="onClickDelete">Delete</v-btn>
      </v-flex>
    </v-layout>
  </v-timeline-item>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClickShow() {
      this.$emit('show')
    },

    onClickDelete() {
      if (
        confirm(
          'Would you really like to delete the location "' +
            this.location.name +
            '"?'
        )
      ) {
        console.log('DELETE')
      }
    }
  }
}
</script>
