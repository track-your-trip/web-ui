<template>
  <v-app>
    <router-view></router-view>
    <global-snackbar />
  </v-app>
</template>

<script>
import GlobalSnackbar from './components/GlobalSnackbar.vue'

export default {
  name: 'App',

  components: {
    GlobalSnackbar
  },

  data() {
    return {
      //
    }
  },

  created() {
    /*
    this.$axios.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
      })
    })
    */
  }
}
</script>
