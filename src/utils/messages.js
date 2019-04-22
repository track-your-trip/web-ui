import Vue from 'vue'

export default {
  showGenericErrorNotification() {
    Vue.prototype.$dialog.notify.error('An error occured. Please try again later.', {
      position: 'top-right'
    })
  }
}
