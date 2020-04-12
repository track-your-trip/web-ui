<template>
  <v-text-field
    :id="triggerId"
    :value="rangeFormatted"
    label="Zeitraum"
    hide-details
    prepend-icon="calendar_today"
    readonly
  />
</template>

<script>
import $ from 'jquery'
import 'daterangepicker/daterangepicker.js'
import 'daterangepicker/daterangepicker.css'

import moment from 'moment'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    ranges: {
      type: Object,
      required: false,
      default: function() {
        return {
          Heute: [moment(), moment()],
          Gestern: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Letzte 7 Tage': [moment().subtract(6, 'days'), moment()],
          'Letzte 30 Tage': [moment().subtract(29, 'days'), moment()],
          'Dieser Monat': [moment().startOf('month'), moment().endOf('month')],
          'Letzer Monat': [
            moment()
              .subtract(1, 'month')
              .startOf('month'),
            moment()
              .subtract(1, 'month')
              .endOf('month')
          ]
        }
      }
    }
  },

  data() {
    return {
      text: '',
      triggerId: this._uid + '_trigger'
    }
  },

  mounted() {
    $('#' + this.triggerId).daterangepicker(
      {
        ranges: this.ranges,
        locale: {
          format: 'DD.MM.YYYY',
          separator: ' - ',
          applyLabel: 'OK',
          cancelLabel: 'Abbrechen',
          fromLabel: 'Von',
          toLabel: 'Bis',
          customRangeLabel: 'Eigener Zeitraum',
          weekLabel: 'W',
          daysOfWeek: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          monthNames: [
            'Januar',
            'Februar',
            'MÃ¤rz',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
          ],
          firstDay: 1
        },
        alwaysShowCalendars: true,
        startDate: this.start,
        endDate: this.end
      },
      this.onDateSelected
    )
  },

  computed: {
    local() {
      return this.value ? this.value : {}
    },

    start: {
      get() {
        return this.local.start
      },
      set(val) {
        this.update('start', val)
      }
    },

    end: {
      get() {
        return this.local.end
      },
      set(val) {
        this.update('end', val)
      }
    },

    rangeFormatted() {
      if (!this.start && !this.end) return ''

      const filter = this.$options.filters

      return (
        filter.moment(this.start, 'DD.MM.YYYY') +
        ' - ' +
        filter.moment(this.end, 'DD.MM.YYYY')
      )
    }
  },

  methods: {
    update(key, value) {
      this.$emit('input', Object.assign({}, this.value, { [key]: value }))
    },

    onDateSelected(start, end) {
      this.$emit('input', {
        start: start,
        end: end
      })
    }
  }
}
</script>
