import Vue from 'vue'
import app from './app.vue'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/ion-\w*/];

// Bind the IonPhaser custom element to the window object
defineIonPhaser(window);

new Vue({
  render: h => h(app),
}).$mount('#app')
