<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="500"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card id="toolbar">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click="close" v-if="modeEdit">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <ValidationProvider
              rules="required"
              name="Name"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="value.name"
                :error-messages="errors"
                name="name"
                label="Name"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|max:2000"
              name="Description"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="value.description"
                :error-messages="errors"
                name="description"
                label="Description"
                counter="2000"
                no-resize
              />
            </ValidationProvider>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="{ name: 'trips' }" v-if="modeNew"
            >Cancel</v-btn
          >
          <v-spacer />
          <v-btn color="primary" :disabled="invalid" @click="save">
            <span v-if="modeNew">Save</span>
            <span v-else>Update</span>
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import MessagesUtils from '../utils/messages'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  props: {
    value: Object
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    mode() {
      return this.value.id ? 'EDIT' : 'NEW'
    },

    modeEdit() {
      return this.mode === 'EDIT'
    },

    modeNew() {
      return this.mode === 'NEW'
    }
  },

  methods: {
    async save() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return

      if (this.modeNew) {
        this.$store
          .dispatch('trips/add', this.value)
          .then(trip => {
            console.log(trip)
            this.$emit('input', trip)
            this.close()
          })
          .catch(err => {
            console.log(err)
            MessagesUtils.showGenericErrorNotification()
          })
      } else {
        this.$store
          .dispatch('trips/update', this.value)
          .then(trip => {
            console.log(trip)
            this.$emit('input', trip)
            this.close()
          })
          .catch(err => {
            console.log(err)
            MessagesUtils.showGenericErrorNotification()
          })
      }
    },
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
