<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      //
    }
  },

  mounted() {
    this.$store.dispatch('settings/load')
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
