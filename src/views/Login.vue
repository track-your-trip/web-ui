<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit="login">
                <v-text-field
                  v-model="username"
                  :disabled="loading"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :disabled="loading"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="login"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  computed: {
    loading() {
      return this.$store.getters['auth/status'] === 'loading'
    }
  },

  methods: {
    login() {
      let username = this.username
      let password = this.password

      this.$store
        .dispatch('auth/login', { username, password })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$store.dispatch('msg/show', { message: err })
        })
    }
  }
}
</script>
