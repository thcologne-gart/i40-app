<template>
    <div>
      <EnergyPerformanceIndicators>
        <template v-slot:site="{ site }">
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                        <template v-slot:building="{ building }">
                          <v-sheet>
                            <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
                              <div v-for="enpi in enpisBuilding" :key="enpi.submodelKey">
                                <v-tab v-if="site === enpi.numberOfSite && building === enpi.numberOfBuilding">
                                  {{ enpi.submodelName }}
                                </v-tab>
                              </div>
                            </v-tabs>
                            <v-tabs-items v-model="tab" id="custom-tab-items">
                              <div v-for="enpi in enpiSubmodels" :key="enpi.submodelKey">
                                  <v-tab-item v-if="site === enpi.numberOfSite && building === enpi.numberOfBuilding">
                                    <!-- <slot name="enpiSubmodel" v-bind:enpiSubmodel="enpi.submodelName">Platzhalter</slot> -->
                                    <EnpisEnergyGroups :enpiSubmodel="enpi" :site="site2" :building="building" />
                                  </v-tab-item>
                              </div>
                            </v-tabs-items>
                          </v-sheet>
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
// import EnPis from '@/components/ems/indicators/EnPis.vue'
import EnpisEnergyGroups from '@/components/ems/indicators/EnpisEnergyGroups.vue'

export default {
  // components: { EnergyPerformanceIndicators, SubmodelHeader, EnPis, EnpisEnergyGroups },
  components: { EnergyPerformanceIndicators, SubmodelHeader, EnpisEnergyGroups },
  data () {
    return {
      enpiGroup: []
    }
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(loadInfos)
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
    },
    enpisBuilding () {
      const enpiSubmodels = this.$store.getters.loadedEnpiSubmodels
      // console.log(enpiSubmodels)
      const enpis = []
      for (const item in enpiSubmodels) {
        // console.log(enpiSubmodels[item])
        const enpiSubmodel = enpiSubmodels[item]
        const enpiInformation = {
          submodelKey: enpiSubmodel[0].key,
          submodelId: enpiSubmodel[0].submodelId,
          submodelName: enpiSubmodel[0].submodelName,
          numberOfSite: enpiSubmodel[1][0].value,
          numberOfBuilding: enpiSubmodel[2][1].value
        }
        enpis.push(enpiInformation)
        // for (const element in enpiSubmodel) {
        //   for (const nextElement in enpiSubmodel[element]) {
        //     if (typeof enpiSubmodel[element][nextElement].idShort !== 'undefined') {
        //       const enpiInformation = {
        //         submodelKey: enpiSubmodel[0].key,
        //         submodelId: enpiSubmodel[0].submodelId,
        //         submodelName: enpiSubmodel[0].submodelName,
        //         numberOfSite: enpiSubmodel[1][0].value,
        //         numberOfBuilding: enpiSubmodel[2][1].value,
        //         submodelSemanticId: enpiSubmodel[0].submodelSemanticId,
        //         enpiGroupKey: enpiSubmodel[element][nextElement].value,
        //         idShort: enpiSubmodel[element][nextElement].idShort,
        //         semanticId: enpiSubmodel[element][nextElement].semanticId.keys[0].value
        //       }
        //       enpis.push(enpiInformation)
        //     }
        //   }
        // }
      }
      console.log(enpis)
      return enpis
    },

    enpiSubmodels () {
      const enpiSubmodels = this.$store.getters.loadedEnpiSubmodels
      // console.log(enpiSubmodels)
      const submodels = []
      // const enpiSubmodelCollections = []
      for (const item in enpiSubmodels) {
        // console.log(enpiSubmodels[item])
        const enpiSubmodel = enpiSubmodels[item]
        for (const element in enpiSubmodel) {
          for (const nextElement in enpiSubmodel[element]) {
            // console.log(enpiSubmodel[element][nextElement])
            if (typeof enpiSubmodel[element][nextElement].idShort !== 'undefined' && enpiSubmodel[element][nextElement].idShort.includes('EnPis Energiegruppe')) {
              // console.log(enpiSubmodels[item])
              const enpiInformation = {
                submodelKey: enpiSubmodel[0].key,
                submodelId: enpiSubmodel[0].submodelId,
                submodelName: enpiSubmodel[0].submodelName,
                numberOfSite: enpiSubmodel[1][0].value,
                numberOfBuilding: enpiSubmodel[2][1].value,
                submodelSemanticId: enpiSubmodel[0].submodelSemanticId,
                enpiGroupKey: enpiSubmodel[element][nextElement].value,
                idShort: enpiSubmodel[element][nextElement].idShort,
                semanticId: enpiSubmodel[element][nextElement].semanticId.keys[0].value
              }
              this.pushData(enpiInformation)
              submodels.push(enpiInformation)
            }
          }
        }
        // submodels.push(enpiSubmodels[item][0].submodelName)
        /*
        if (energyTypeSubmodels[item][0].submodelId === this.energySourceGroup.submodelId) {
          // console.log(energyTypeSubmodels[item])
          for (const elementCollection in energyTypeSubmodels[item]) {
            const test = energyTypeSubmodels[item][elementCollection]
            // console.log(test.idShort)
            for (const wow in test) {
              if (test[wow].idShort === this.energySourceGroup.elementCollection) {
                energySourceComponents = test
              }
            }
          }
        }
        */
      }
      // console.log(submodels)
      return submodels
    }
  },
  methods: {
    pushData (enpiInformation) {
      this.enpiGroup.push(enpiInformation)
      // console.log(this.enpiGroup)
    }
  },
  created () {
    this.submodelName = 'Energieleistungskennzahlen Heizung'
    this.submodelId = 'submodel/enpi-heating'
  }
}
</script>

<style>
#enpi-card {
  margin-inline: 0% !important;
}
</style>
