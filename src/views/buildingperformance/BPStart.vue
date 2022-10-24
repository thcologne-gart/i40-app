<template>
  <div>
    <GeneralGrid :sites="sites" :buildings="buildings" :linkToInfos="linkToInfos">
      <div v-for="data in bacnetData" :key="data.name">{{ data }}</div>
        <!-- <v-sheet elevation="2">
          <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
            <v-tab v-for="site in numberofSites" :key="site">{{ sites[site][1].value }}</v-tab>
          </v-tabs>
        </v-sheet>
        <v-tabs-items v-model="tab" id="custom-tab-items">
          <v-tab-item v-for="site in numberofSites" :key="site">
            <slot name="site" v-bind:site="site">Platzhalter</slot>
          </v-tab-item>
        </v-tabs-items> -->
      <!-- <slot name="site" v-bind:site="site">Platzhalter</slot> -->
      <!-- <slot>Platzhalter</slot> -->
    </GeneralGrid>
  </div>
</template>

<script>
import GeneralGrid from '@/components/general/GeneralGrid.vue'

export default {
  components: { GeneralGrid },
  data () {
    return {
      linkToInfos: '/buildingperformance',
      tab: null,
      submodels: []
    }
  },
  computed: {
    buildings () {
      // console.log(this.sites)
      // console.log(this.$store.getters.loadedBuildingInformation)
      const buildings = this.$store.getters.loadedBuildingInformation
      console.log(buildings)
      const buildingsArray = []
      for (const item in buildings) {
        buildingsArray.push({
          numberOfSite: buildings[item][2].value,
          buildingNumber: buildings[item][3].value,
          submodelId: buildings[item][4].submodelId,
          buildingDesignation: buildings[item][1].value
        })
      }
      console.log(buildingsArray)
      return buildingsArray
    },

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
    },
    bacnetData () {
      console.log(this.$store.getters.loadedBACnet)
      const loadedBacnetData = this.$store.getters.loadedBACnet
      // console.log(loadedAas.aas1)
      // this.loadAas = loadedAas
      // for (const item in loadedAas) {
      // console.log(loadedAas[item].payload.aasContent)
      // const json = atob(loadedAas[item].payload.aasContent)
      // const result = JSON.parse(json)
      // console.log(result)
      // }
      return loadedBacnetData
    }
  }
}
</script>
