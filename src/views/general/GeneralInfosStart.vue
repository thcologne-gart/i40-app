<template>
    <div>
      <GeneralGrid :sites="sites">
        <div v-if="sites === null">
          <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
            <v-tab v-for="site in numberofSites" :key="site">Standort
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" id="custom-tab-items">
            <v-tab-item v-for="site in numberofSites" :key="site">
              <slot name="site" v-bind:site="site">Platzhalter</slot>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <div v-else-if="sites.length != numberofSites.length">
          <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
            <v-tab v-for="site in numberofSites" :key="site">Standort
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" id="custom-tab-items">
            <v-tab-item v-for="site in numberofSites" :key="site">
              <slot name="site" v-bind:site="site">Platzhalter</slot>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <div v-else>
          <v-sheet elevation="2">
            <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
              <v-tab v-for="site in numberofSites" :key="site">{{ sites[site][1].value }}</v-tab>
            </v-tabs>
          </v-sheet>
          <v-tabs-items v-model="tab" id="custom-tab-items">
            <v-tab-item v-for="site in numberofSites" :key="site">
              <slot name="site" v-bind:site="site">Platzhalter</slot>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </GeneralGrid>
    </div>
</template>

<script>
import GeneralGrid from '@/components/general/GeneralGrid.vue'

export default {
  components: { GeneralGrid },
  data () {
    return {
      tab: null,
      submodels: []
    }
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      // console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      // console.log(numberOfSites)
      return numberOfSites
    },
    sites () {
      console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    }
  },
  created () {
    this.submodels = [
      { id: 1, name: 'Unternehmen', link: '/contextstart/organization' },
      { id: 2, name: 'Standorte', link: '/contextstart/sites' },
      { id: 3, name: 'Gebäude', link: '/contextstart/buildings' }
    ]
    this.emsChapter = { name: 'Kontext', link: '/contextstart' }
  }
}
</script>
