<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <GridManagement :sites="sites" :buildings="buildings">
      </GridManagement>
    </div>
</template>

<script>
import EmsChapter from '@/components/ems/EmsChapter.vue'
import GridManagement from '@/components/ems/management/GridManagement.vue'

export default {
  name: 'Management',
  data () {
    return {
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
    }
  },
  components: { EmsChapter, GridManagement },
  created () {
    this.submodels = [
      { id: 1, name: 'Operation', link: 'management-start/operation' },
      { id: 2, name: 'Management', link: '/management-start/management' }
    ]
    this.emsChapter = { name: 'Management', link: '/management-start' }
  }
}
</script>
