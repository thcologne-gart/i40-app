<template>
  <div>
    <BPGrid :sites="sites" :buildings="buildings" :linkToInfos="linkToInfos">
    </BPGrid>
  </div>
</template>

<script>
import BPGrid from '@/components/bp/BPGrid.vue'

export default {
  components: { BPGrid },
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
          numberOfSite: buildings[item][7].value,
          buildingNumber: buildings[item][8].value,
          submodelId: buildings[item][9].submodelId,
          buildingDesignation: buildings[item][6].value
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
    }
  }
}
</script>
