import axios from 'axios'

export default {
  list(tripId) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_URL + '/trips/' + tripId + '/locations')
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  load(tripId, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_API_URL + '/trips/' + tripId + '/locations/' + id
        )
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  store(tripId, location) {
    return new Promise((resolve, reject) => {
      if (!location.id) {
        axios
          .post(
            process.env.VUE_APP_API_URL + '/trips/' + tripId + '/locations',
            {
              name: location.name,
              description: location.description,
              beginn: location.beginn,
              end: location.end,
              lat: location.lat,
              lng: location.lng
            }
          )
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        reject({ message: 'Location-ID must be empty' })
      }
    })
  },

  update(tripId, location) {
    return new Promise((resolve, reject) => {
      if (location.id) {
        axios
          .patch(
            process.env.VUE_APP_API_URL +
              '/trips/' +
              tripId +
              '/locations/' +
              location.id,
            {
              name: location.name,
              description: location.description,
              beginn: location.beginn,
              end: location.end,
              lat: location.lat,
              lng: location.lng
            }
          )
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        reject({ message: 'Empty Location-ID' })
      }
    })
  },

  destroy(tripId, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          process.env.VUE_APP_API_URL + '/trips/' + tripId + '/locations/' + id
        )
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
