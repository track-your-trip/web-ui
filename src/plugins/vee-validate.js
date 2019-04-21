import Vue from 'vue'
import VeeValidate from 'vee-validate'
// import { Validator } from 'vee-validate';

// custom validation rules
import UniqueUser from './vee-validate/rules/uniqueuser.js'

VeeValidate.Validator.extend('uniqueuser', UniqueUser)

Vue.use(VeeValidate)
