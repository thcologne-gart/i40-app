<template>
    <div>
      <EnergyPerformanceIndicators>
        <template v-slot:site="{ site }">
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                        <template v-slot:building="{ building }">
                            <b-card class="shadow p-3 mb-5 bg-white rounded" id="enpi-card">
                                <b-tabs content-class="mt-3" id ="nav-tabs">

                                  <div v-for="enpi in enpiSubmodels" :key="enpi.submodelKey">
                                      <div v-if="site === enpi.numberOfSite && building === enpi.numberOfBuilding">
                                          <b-tab v-bind:title= enpi.submodelName >
                                              <slot name="enpiSubmodel" v-bind:enpiSubmodel="enpi.submodelName"></slot>
                                              <EnpisEnergyGroups :enpiSubmodel="enpi" :site="site2" :building="building" />
                                          </b-tab>
                                      </div>
                                  </div>
                                    <!-- <div v-for="enpi in enpiSubmodels" :key="enpi[0].submodelId">
                                      {{ enpiGroup }}
                                        <div v-if="site === enpi[1][0].value && building === enpi[2][1].value">
                                            <b-tab v-bind:title= enpi[0].submodelName >
                                                <slot name="enpiSubmodel" v-bind:enpiSubmodel="enpi[0].submodelName"></slot>
                                                <EnpisEnergyGroups :enpiSubmodel="enpi" :site="site2" :building="building" />
                                            </b-tab>
                                        </div>
                                    </div> -->
                                </b-tabs>
                                <!--
                                <b-tabs card pills vertical id="enpis-vertical-tabs">
                                    <b-tab v-bind:title="'Gebäude ' + building" v-for="building in numberOfBuildingsAsArray" :key="building">
                                        <slot name="building" v-bind:building="building">Platzhalter</slot>
                                    </b-tab>
                                </b-tabs>
                                -->
                                <!--
                                <b-row>
                                    <EnPis :submodelId ="submodelId" :site="site" :building="building" :buildings="buildings" />
                                </b-row>
                                -->
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
    enpiSubmodels () {
      const enpiSubmodels = this.$store.getters.loadedEnpiSubmodels
      // console.log(enpiSubmodels)
      // console.log(this.energySourceGroup)
      const submodels = []
      // const enpiSubmodelCollections = []
      for (const item in enpiSubmodels) {
        // console.log(enpiSubmodels[item])
        const enpiSubmodel = enpiSubmodels[item]
        for (const element in enpiSubmodel) {
          for (const nextElement in enpiSubmodel[element]) {
            console.log(enpiSubmodel[element][nextElement])
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
      console.log(submodels)
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
