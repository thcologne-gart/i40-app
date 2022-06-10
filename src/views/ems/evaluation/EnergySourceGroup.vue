<template>
    <div>
        <EnergeticEvaluation>
            <template v-slot:site="{ site }" >
                <div v-for="site2 in numberofSites" :key="site2">
                    <div v-if="site === site2">
                        <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                            <template v-slot:building="{ building }">
                                <b-card id="energy-source-card" class="shadow p-3 mb-5 bg-white rounded">
                                    <b-tabs content-class="mt-3" id ="source-groups-tabs">
                                        <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
                                            <div v-if="element.site === site2 && building === element.building">
                                                <b-tab v-bind:title="element.group.toString()">
                                                    <EnergySourceGroupBuilding :energySources="energySources" :building="building" :energySourceGroup="element" :heatingComponents="heatingComponents" :airComponents="airComponents" :enpiSubmodels="enpiSubmodels" />
                                                </b-tab>
                                            </div>
                                        </div>
                                    </b-tabs>
                                </b-card>
                            </template>
                        </SubmodelHeader>
                    </div>
                </div>
            </template>
        </EnergeticEvaluation>
    </div>
</template>

<script>
import EnergeticEvaluation from '@/views/ems/evaluation/EnergeticEvaluation.vue'
import EnergySourceGroupBuilding from '@/components/ems/evaluation/EnergySourceGroupBuilding.vue'
import SubmodelHeader from '@/components/ems/SubmodelHeader.vue'

export default {
  props: {
    site: Array,
    building: Number,
    buildings: Array,
    energySourceGroup: Object,
    energySources: Array,
    energyTypes: Array,
    allEnergyTypesWithGroup: Array,
    heatingComponents: Array,
    airComponents: Array
  },
  components: { EnergeticEvaluation, SubmodelHeader, EnergySourceGroupBuilding },
  /*
  mounted () {
    this.energySourceGroupsBuilding()
  },
  methods: {
    energySourceGroupsBuilding () {
      const allEnergyTypes = this.energyTypes
      console.log(this.energyTypes)
      let numberOfGroups = 0
      const numberOfGroupsArray = []
      for (const item in allEnergyTypes) {
        console.log(this.site)
        if (this.building === allEnergyTypes[item].building && this.site[4].value === allEnergyTypes[item].site) {
          console.log(allEnergyTypes[item])
          numberOfGroups += 1
          numberOfGroupsArray.push(numberOfGroups)
          allEnergyTypes[item].group = numberOfGroups
        }
      }
      this.numberOfGroupsArray = numberOfGroupsArray
      this.allEnergyTypesWithGroup = allEnergyTypes
      console.log(allEnergyTypes)
    }
  },
  */
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      // console.log(loadInfos)
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
      // console.log(numberOfSites)
      return numberOfSites
    },
    numberOfBuildings () {
      const loadSiteInfos = this.$store.getters.loadedSiteInformation
      const numberBuildings = []
      for (const item in loadSiteInfos) {
        numberBuildings.push({
          key: loadSiteInfos[item][5].key,
          numberOfSite: loadSiteInfos[item][4].value,
          numberOfBuildings: loadSiteInfos[item][3].value
        })
      }
      return numberBuildings
    },

    sites () {
      return this.$store.getters.loadedSiteInformation
    },
    energySourceComponents () {
      const energySourceGroups = []
      console.log(this.$store.getters.loadedEnergyTypeInformation)
      const loadedEnergyInformation = this.$store.getters.loadedEnergyTypeInformation
      for (const item in loadedEnergyInformation) {
        let i
        for (i = 1; i < loadedEnergyInformation[item].length; i++) {
          for (const key in loadedEnergyInformation[item][i]) {
            if (loadedEnergyInformation[item][i][key].modelType.name === 'SubmodelElementCollection') {
              energySourceGroups.push({
                submodelKey: loadedEnergyInformation[item][0].key,
                submodelId: loadedEnergyInformation[item][0].submodelId,
                submodelName: loadedEnergyInformation[item][0].submodelName,
                submodelSemanticId: loadedEnergyInformation[item][0].submodelSemanticId,
                elementCollection: loadedEnergyInformation[item][i][key].idShort,
                elementCollectionId: key,
                site: loadedEnergyInformation[item][1][0].value,
                building: loadedEnergyInformation[item][2][1].value,
                elementCollectionSemanticId: loadedEnergyInformation[item][i][key].semanticId.keys[0].value
              })
            }
          }
        }
      }
      return energySourceGroups
    },
    enpiSubmodels () {
      const enpiSubmodels = []
      const loadedEnpiInformation = this.$store.getters.loadedEnpiSubmodels
      for (const item in loadedEnpiInformation) {
        let i
        for (i = 1; i < loadedEnpiInformation[item].length; i++) {
          for (const key in loadedEnpiInformation[item][i]) {
            if (loadedEnpiInformation[item][i][key].modelType.name === 'SubmodelElementCollection') {
              enpiSubmodels.push({
                submodelKey: loadedEnpiInformation[item][0].key,
                submodelId: loadedEnpiInformation[item][0].submodelId,
                submodelName: loadedEnpiInformation[item][0].submodelName,
                submodelSemanticId: loadedEnpiInformation[item][0].submodelSemanticId,
                elementCollection: loadedEnpiInformation[item][i][key].idShort,
                elementCollectionId: key,
                site: loadedEnpiInformation[item][1][0].value,
                building: loadedEnpiInformation[item][2][1].value,
                elementCollectionSemanticId: loadedEnpiInformation[item][i][key].semanticId.keys[0].value
              })
            }
          }
        }
      }
      return enpiSubmodels
    }
  },
  created () {
    this.submodelName = 'Energieeinsatz'
    this.submodels = [
      { id: 1, name: 'Energieart', link: '/energetic-evaluation/energy-type' },
      { id: 2, name: 'Energieeinsatz', link: '/energetic-evaluation/energy-source' },
      { id: 3, name: 'Energieverbrauch', link: '/energetic-evaluation/energy-consumption' },
      { id: 4, name: 'SEU', link: '/energetic-evaluation/seu' }
    ]
    this.emsChapter = { name: 'Energetische Bewertung', link: '/energetic-evaluation' }
    /*
    this.energySources = [
      { id: 1, sourceName: 'Grundwasserwärmepumpe', pic: require('../assets/grundwärmepumpe.jpg'), name: 'Heat Pump' },
      { id: 2, sourceName: 'Luftwärmepumpe', pic: require('../assets/luftwärmepumpe.jpg'), name: 'Heat Pump' }
    ]
    */
  }
}
</script>

<style>
#site-title {
    margin-top: 20px;
}
#energy-source-card {
    max-inline-size: 95%;
    margin-top: -15px;
}
#source-groups-tabs {
    margin-top: -10px;
}
</style>
