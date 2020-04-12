<template>
  <v-timeline-item small fill-dot icon="$vuetify.icons.map-marker">
    <v-row class="pt-3 pr-3" column>
      <v-col cols="12" class="font-weight-bold">
        {{ location.beginn }} - {{ location.end }}
      </v-col>
      <v-col cols="12">
        <div class="subheading">{{ location.name }}</div>
      </v-col>
      <v-col cols="12">
        <div class="caption">{{ location.description }}</div>
      </v-col>
      <v-col cols="12">
        <v-btn small text color="primary" @click="onClickShow">Show</v-btn>
        <v-btn small text color="error" @click="onClickDelete">Delete</v-btn>
      </v-col>
    </v-row>
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
