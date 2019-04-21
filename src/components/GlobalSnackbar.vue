<template>
  <v-snackbar v-model="show">
    {{ message }}
    <v-btn flat color="primary" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters['msg/message']
    },
    show: {
      get() {
        return this.$store.getters['msg/show']
      },
      set(value) {
        this.$store.commit('msg/update', { show: value })
      }
    }
  }
}
</script>
