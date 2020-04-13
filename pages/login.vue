<template>
  <v-container>
    <v-row>
      <v-col>
        <card-base
          :title="$t('login.title')"
          :loading="loading"
          :error="error"
          show-actions
          :button-submit-text="$t('misc.login')"
          @submit="submit"
        >
          <ValidationObserver ref="observer">
            <!-- E-Mail -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email|max:255"
              :name="$t('login.email')"
            >
              <v-text-field
                v-model="email"
                :label="$t('login.email')"
                :error-messages="errors"
              />
            </ValidationProvider>

            <!-- Password -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('login.password')"
            >
              <v-text-field
                v-model="password"
                :label="$t('login.password')"
                :error-messages="errors"
              />
            </ValidationProvider>
          </ValidationObserver>
        </card-base>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

import CardBase from '@/components/CardBase'

export default {
  components: {
    CardBase
  },

  data() {
    return {
      loading: false,
      error: false,

      email: null,
      password: null
    }
  },

  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate()

      if (valid) {
        this.error = false
        this.loading = true

        this.$apollo
          .mutate({
            mutation: gql`
              mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  token
                }
              }
            `,
            variables: {
              email: this.email,
              password: this.password
            }
          })
          .then((data) => {
            this.loading = false
            this.$apolloHelpers.onLogin(data.data.login.token)
          })
          .catch((err) => {
            console.error(err)
            this.error = true
          })
      }
    }
  }
}
</script>
