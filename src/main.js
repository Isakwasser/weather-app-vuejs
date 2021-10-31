import Vue from 'vue'
import App from './App.vue'

import 'core-js/stable'; // only stable feature also is possible with only `core-js`
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally

import 'bootstrap/dist/css/bootstrap.min.css';

new Vue({
  el: '#app',
  render: h => h(App)
})
