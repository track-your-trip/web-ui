<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-alert
                    :value="error"
                    type="error"
                    transition="scale-transition"
                    outline
                    >Incorrect username or password</v-alert
                  >
                  <ValidationProvider
                    ref="providerUsername"
                    rules="required"
                    name="Username"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="username"
                      :disabled="loading"
                      :error-messages="errors"
                      prepend-icon="person"
                      name="username"
                      label="Username"
                      type="text"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    ref="providerPassword"
                    rules="required"
                    name="Password"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="password"
                      :disabled="loading"
                      :error-messages="errors"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </ValidationProvider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  :loading="loading"
                  :disabled="invalid || loading"
                  @click="login"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </ValidationObserver>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      username: '',
      password: ''
    }
  },

  computed: {
    loading() {
      return this.$store.getters['auth/status'] === 'loading'
    },
    error() {
      return this.$store.getters['auth/status'] === 'error'
    }
  },

  methods: {
    async login() {
      const isValid = await this.$refs.observer.validate()

      if (!isValid) return

      let username = this.username
      let password = this.password

      this.$store
        .dispatch('auth/login', { username, password })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          if (err.response.status !== 401) {
            this.$store.dispatch('msg/show', { message: err })
          }
        })
    }
  }
}
</script>
