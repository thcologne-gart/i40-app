<template>
    <div>
      <OrganizationContext>
        <template v-slot:site="{ site }" >
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                        <template v-slot:building="{ building }">
                            <AddBuildingInformation :site ="site" :numberOfBuildings="numberOfBuildings" :buildingNumber="building" :buildings="buildings" />
                            <!--
                            <div v-for="item in buildings" :key="item.buildingNumber">
                                <div v-if="site === item.numberOfSite && building != item.buildingNumber">
                                    <AddBuildingInformation :site ="site2" :numberOfBuildings="numberOfBuildings" :buildingNumber="building" />
                                </div>
                            </div>

                            <div v-for ="item in buildings" :key="item[0].value">
                                <div v-if="building >= buildings.length">
                                    <AddBuildingInformation :site ="site2" :numberOfBuildings="numberOfBuildings" :buildingNumber="building" />
                                </div>
                            </div>
                            -->
                            <div v-for="site in sites" :key="site[2].value">
                                <div v-if="site[4].value === site2">
                                    <BuildingInformation :site="site" :building="building" />
                                </div>
                            </div>
                            <div>
                                <!-- <UploadBuildingModel /> -->
                            </div>
                        </template>
                    </SubmodelHeader>
                </div>
            </div>
        </template>
      </OrganizationContext>
    </div>
</template>

<script>
import OrganizationContext from '@/views/OrganizationContext.vue'
import SubmodelHeader from '@/components/ems/SubmodelHeader.vue'
import AddBuildingInformation from '@/components/ems/context/AddBuildingInformation.vue'
import BuildingInformation from '@/components/ems/context/BuildingInformation.vue'
// import UploadBuildingModel from '@/components/UploadBuildingModel.vue'

export default {
  components: { OrganizationContext, SubmodelHeader, AddBuildingInformation, BuildingInformation },
  data () {
    return {}
  },
  mounted () {
    console.log(this.$refs.site)
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      // console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(numberSites)
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
    numberOfBuildings () {
      const loadSiteInfos = this.$store.getters.loadedSiteInformation
      // console.log(typeof loadSiteInfos)
      // console.log(loadSiteInfos)
      // console.log(this.site)
      const numberBuildings = []
      for (const item in loadSiteInfos) {
        // console.log(loadSiteInfos[item])
        // console.log(item)
        numberBuildings.push({
          key: loadSiteInfos[item][5].key,
          numberOfSite: loadSiteInfos[item][4].value,
          numberOfBuildings: loadSiteInfos[item][3].value
        })
      }
      // console.log(numberBuildings)
      return numberBuildings
    },
    numberOfBuildingsAsArray () {
      const loadSiteInfos = this.$store.getters.loadedSiteInformation
      // console.log(typeof loadSiteInfos)
      // console.log(loadSiteInfos)
      const numberBuildings = []
      for (const item in loadSiteInfos) {
        // console.log(loadSiteInfos[item])
        // console.log(item)
        numberBuildings.push({
          key: loadSiteInfos[item][5].key,
          id: loadSiteInfos[item][5].id,
          numberOfSite: loadSiteInfos[item][4].value,
          numberOfBuildings: loadSiteInfos[item][3].value,
          numberBuildingsArray: [0]
        })
      }
      // console.log(numberBuildings)
      // const buildings = []
      for (const item in numberBuildings) {
        // console.log(item)
        // console.log(numberBuildings[item].numberOfBuildings)
        // if (numberBuildings[item].numberOfSite === this.site) {
        // console.log(numberBuildings[item].numberOfSite)
        let i
        for (i = 1; i < numberBuildings[item].numberOfBuildings; i++) {
          // console.log(numberBuildings[item].numberOfBuildings)
          numberBuildings[item].numberBuildingsArray.push(i)
        }
      }
      // console.log(numberBuildings)
      return numberBuildings
    },
    sites () {
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    },
    aas () {
      // console.log(this.$store.getters.loadedAas)
      const allAas = this.$store.getters.loadedAas
      const submodelNamesFromAas = []
      for (const item in allAas) {
        // console.log(typeof allAas[item].payload.submodels.keys)
        const keys = allAas[item].payload.submodels.keys
        for (const i in keys) {
          // console.log(keys[i].value)
          const submodelName = keys[i].value
          if (submodelName.includes('submodels/site-information/')) {
            // console.log(submodelName)
            submodelNamesFromAas.push(submodelName)
          }
        }
      }
      // console.log(submodelNamesFromAas)
      return submodelNamesFromAas
    },
    submodels () {
      // console.log(this.$store.getters.loadedSubmodels)
      const allSubmodels = this.$store.getters.loadedSubmodels
      const submodelNamesFromSubmodels = []
      for (const item in allSubmodels) {
        // console.log(allSubmodels[item].payload.identification.id)
        const submodelName = allSubmodels[item].payload.identification.id
        if (submodelName.includes('submodels/site-information/')) {
          // console.log(submodelName)
          submodelNamesFromSubmodels.push(submodelName)
        }
      }
      // console.log(submodelNamesFromSubmodels)
      return submodelNamesFromSubmodels
    },
    buildings () {
      // console.log(this.sites)
      // console.log(this.$store.getters.loadedBuildingInformation)
      const buildings = this.$store.getters.loadedBuildingInformation
      const buildingsArray = []
      for (const item in buildings) {
        for (const test in this.numberOfBuildingsAsArray) {
          if (buildings[item][2].value === this.numberOfBuildingsAsArray[test].numberOfSite) {
            buildingsArray.push({
              numberOfSite: buildings[item][2].value,
              buildingNumber: buildings[item][3].value,
              numberBuildings: this.numberOfBuildingsAsArray[test].numberBuildingsArray
            })
          }
        }
      }
      // console.log(buildingsArray)
      return buildingsArray
      // Hier jetzt ein Array mit der Anzahl der Gebäude pro Site-> Wie bei numberOfBuildingsArray ?!
      // Dann dies in HTMl mit einer for-Schleife und der Länge der einzelnen Arrays durchlaufen lassen
    }
  },
  created () {
    this.submodelName = 'Gebäude'
  }
}
</script>
