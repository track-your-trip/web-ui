import axios from 'axios'

export default {
  list() {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_URL + '/trips')
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  load(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_URL + '/trips/' + id)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  store(trip) {
    return new Promise((resolve, reject) => {
      if (!trip.id) {
        axios
          .post(process.env.VUE_APP_API_URL + '/trips', {
            name: trip.name,
            description: trip.description
          })
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        reject({ message: 'Trip-ID must be empty' })
      }
    })
  },

  update(trip) {
    return new Promise((resolve, reject) => {
      if (trip.id) {
        axios
          .patch(process.env.VUE_APP_API_URL + '/trips/' + trip.id, {
            name: trip.name,
            description: trip.description
          })
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        reject({ message: 'Empty Trip-ID' })
      }
    })
  },

  destroy(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.VUE_APP_API_URL + '/trips/' + id)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
