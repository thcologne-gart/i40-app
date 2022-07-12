import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vueCountryRegionSelect from 'vue-country-region-select'
import vuetify from './plugins/vuetify'
// Import Bootstrap an BootstrapVue CSS files (order is important)
// import Axios from 'axios'

const firebaseConfig = {
  apiKey: 'AIzaSyA0yIFiZY5K7_eSAuuJqs3ChzXFxGGzNWg',
  authDomain: 'energiemanagement-system.firebaseapp.com',
  databaseURL: 'https://energiemanagement-system-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'energiemanagement-system',
  storageBucket: 'gs://energiemanagement-system.appspot.com',
  messagingSenderId: '787629156255',
  appId: '1:787629156255:web:8267758bc17e82673d3faa',
  measurementId: 'G-XMKQFNR9BQ'
}

const app = initializeApp(firebaseConfig)
getDatabase(app)
getStorage(app)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueCountryRegionSelect)
// Vue.use(Axios)

new Vue({
  router,
  store,

  created () {
    // console.log(this.$store.dispatch('loadEnpis'))
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        // console.log(this.$store.dispatch('autoSignIn', user))
      }
    })
    // this.$store.dispatch('loadAasCaBo')
    this.$store.dispatch('loadOrganizationInformationCaBo')
    this.$store.dispatch('loadAas')
    this.$store.dispatch('loadAASJson')
    this.$store.dispatch('loadSubmodels')
    this.$store.dispatch('loadConceptDescriptions')
    this.$store.dispatch('loadOrganizationInformation')
    this.$store.dispatch('loadAasDeleteionEnergyTypes')
    this.$store.dispatch('loadSiteInformation')
    this.$store.dispatch('loadBuildingInformation')
    this.$store.dispatch('loadEnergyTypeInformation')
    this.$store.dispatch('loadEnpiSubmodels')
    this.$store.dispatch('loadEnpis')

    // this.$store.dispatch('loadEnergyTypes')
    this.$store.dispatch('loadPdfs')
    // this.$store.dispatch('loadOrganizationInformation')
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')
