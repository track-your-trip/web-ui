<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="500"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>

    <v-card id="toolbar">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click="onClickCancel">
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
                v-model="name"
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
                v-model="description"
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
          <v-btn color="primary" @click="onClickCancel">{{ textCancel }}</v-btn>
          <v-spacer />
          <v-btn color="primary" :disabled="invalid" @click="onClickSave">{{
            textSave
          }}</v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  props: {
    trip: {
      type: Object,
      required: false
    },
    textCancel: {
      type: String,
      default: 'Cancel'
    },
    textSave: {
      type: String,
      default: 'Save'
    }
  },

  data() {
    return {
      dialog: false,
      name: '',
      description: ''
    }
  },

  watch: {
    dialog(val) {
      if (val) {
        // Dialog open
        if (this.trip) {
          this.name = this.trip.name
          this.description = this.trip.description
        }
      }
    }
  },

  methods: {
    onClickCancel() {
      this.$emit('cancel')
      this.dialog = false
    },

    async onClickSave() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return

      this.$emit(
        'save',
        Object.assign(this.trip || {}, {
          name: this.name,
          description: this.description
        })
      )

      this.dialog = false
    }
  }
}
</script>
