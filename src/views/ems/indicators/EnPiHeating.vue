<template>
    <div>
      <EnergyPerformanceIndicators>
        <template v-slot:site="{ site }">
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                        <template v-slot:building="{ building }">
                            <b-card class="shadow p-3 mb-5 bg-white rounded" style="width: 100%;" :title="submodelName">
                                <hr>
                                <b-row>
                                    <EnPis :submodelId ="submodelId" :site="site" :building="building" :buildings="buildings" />
                                </b-row>
                            </b-card>
                        </template>
                    </SubmodelHeader>
                </div>
            </div>
        </template>
      </EnergyPerformanceIndicators>
    </div>
</template>

<script>
import EnergyPerformanceIndicators from '@/views/ems/indicators/EnergyPerformanceIndicators.vue'
import SubmodelHeader from '@/components/ems/SubmodelHeader.vue'
import EnPis from '@/components/ems/indicators/EnPis.vue'

export default {
  components: { EnergyPerformanceIndicators, SubmodelHeader, EnPis },
  data () {
    return {}
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      console.log(numberOfSites)
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

    sites () {
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    },
    buildings () {
      // console.log(this.sites)
      // console.log(this.$store.getters.loadedBuildingInformation)
      const buildings = this.$store.getters.loadedBuildingInformation
      // console.log(buildings)
      const buildingsArray = []
      for (const item in buildings) {
        buildingsArray.push({
          numberOfSite: buildings[item][2].value,
          buildingNumber: buildings[item][3].value,
          submodelId: buildings[item][4].submodelId
        })
      }
      // console.log(buildingsArray)
      return buildingsArray
    },
    selectSubmodels: function () {
      for (const i of this.submodels) {
        console.log(i)
      }
      return this.submodels
    }
  },
  created () {
    this.submodelName = 'Energieleistungskennzahlen Heizung'
    this.submodelId = 'submodel/enpi-heating'
  }
}
</script>
