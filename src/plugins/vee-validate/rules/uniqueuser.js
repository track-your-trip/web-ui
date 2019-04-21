import axios from 'axios'

const validator = {
  getMessage(field, args, data) {
    return data.message
  },
  validate(value, args) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/register/uniqueuser', {
        email: value
      })
      .then(res => {
        return {
          valid: res.data.data.unique,
          data: {
            message: 'This user already exists'
          }
        }
      })
      .catch(err => {
        if (typeof err.response === 'undefined') {
          return {
            valid: false,
            data: {
              message: 'Network error'
            }
          }
        }
      })
  }
}

export default validator
