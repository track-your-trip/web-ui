<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <ValidationObserver ref="observer" v-slot="{ invalid, pending }">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <ValidationProvider
                      ref="providerName"
                      rules="required|max:255"
                      name="Name"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="name"
                        :disabled="loading"
                        :error-messages="errors"
                        prepend-icon="person"
                        name="name"
                        label="Name"
                        type="text"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      ref="providerEmail"
                      rules="required|email|max:255|uniqueuser"
                      name="E-Mail"
                      v-slot="{ errors, flags }"
                    >
                      <v-text-field
                        v-model="email"
                        :disabled="loading"
                        :error-messages="errors"
                        :loading="flags.pending"
                        prepend-icon="mail"
                        name="email"
                        label="E-Mail"
                        hint="This is your username"
                        type="text"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      ref="providerPassword"
                      vid="password"
                      rules="required|min:6"
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

                    <ValidationProvider
                      ref="providerPasswordConfirm"
                      rules="required|confirmed:password"
                      name="Confirm Password"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="confirm"
                        :disabled="loading"
                        :error-messages="errors"
                        prepend-icon="lock"
                        name="confirm"
                        label="Confirm Password"
                        type="password"
                      />
                    </ValidationProvider>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <router-link :to="{ name: 'login' }" class="ml-3"
                    >Already have an account? Login here</router-link
                  >
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :loading="loading || pending"
                    :disabled="invalid || loading"
                    @click="register"
                    >Register</v-btn
                  >
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import MessagesUtils from '../utils/messages'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm: ''
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
    async register() {
      const isValid = await this.$refs.observer.validate()

      if (!isValid) return

      let name = this.name
      let email = this.email
      let password = this.password

      this.$store
        .dispatch('auth/register', { name, email, password })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(err => {
          MessagesUtils.showGenericErrorNotification();
        })
    }
  }
}
</script>
