<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <GridRessources :sites="sites" :buildings="buildings">
      </GridRessources>
      <!-- <EmsGrid :submodels="submodels">
          <div>Platzhalter
          </div>
      </EmsGrid> -->
    </div>
</template>

<script>
import EmsChapter from '@/components/ems/EmsChapter.vue'
// import EmsGrid from '@/components/ems/EmsGrid.vue'
import GridRessources from '@/components/ems/ressources/GridRessources.vue'

export default {
  name: 'Ressources',
  data () {
    return {
      submodels: []
    }
  },
  // components: { EmsChapter, EmsGrid, GeneralGridEMS },
  components: { EmsChapter, GridRessources },
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
    }
  },
  created () {
    this.submodels = [
      { id: 1, name: 'Beauftragte', link: '/ressources-start/agents' }
    ]
    this.emsChapter = { name: 'Ressourcen', link: '/ressources-start' }
  }
}
</script>
