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

            <date-range-picker-default v-model="daterange" />
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

import DateRangePickerDefault from '~/components/DateRangePickerDefault.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    DateRangePickerDefault
  },

  props: {
    location: {
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
      description: '',
      daterange: {
        start: {},
        end: {}
      },
      lat: null,
      lng: null
    }
  },

  watch: {
    dialog(val) {
      if (val) {
        // Dialog open
        if (this.location) {
          this.name = this.location.name
          this.description = this.location.description
          this.daterange.start = this.location.beginn
          this.daterange.end = this.location.end
          this.lat = this.location.lat
          this.lng = this.location.lng
        }
      } else {
        this.reset()
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
        Object.assign(this.location || {}, {
          name: this.name,
          description: this.description,
          beginn: this.daterange.start,
          end: this.daterange.end,
          lat: this.lat,
          lng: this.lng
        })
      )

      this.dialog = false
    },

    reset() {
      this.name = ''
      this.description = ''
      this.daterange = {
        start: {},
        end: {}
      }
      this.lat = null
      this.lng = null
    }
  }
}
</script>
