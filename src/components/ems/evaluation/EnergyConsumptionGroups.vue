<template>
    <div>
      <v-sheet>
        <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
          <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
            <v-tab class ="pa-4" v-if="element.site === site && building === element.building">
              {{ element.group.toString() }}
            </v-tab>
          </div>
        </v-tabs>
        <v-tabs-items v-model="tab" id="custom-tab-items">
          <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
              <v-tab-item v-if="element.site === site && building === element.building">
                <EnergyConsumptionBuilding :energySources="energySources" :building="building" :energySourceGroup="element" :heatingComponents="heatingComponents" :airComponents="airComponents"/>
              </v-tab-item>
          </div>
        </v-tabs-items>
      </v-sheet>

      <!-- <v-sheet elevation="2">
        <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
          <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
            <v-tab v-if="element.site === site && building === element.building">{{ element.group.toString() }}</v-tab>
          </div>
        </v-tabs>
      </v-sheet>
      <v-tabs-items v-model="tab" id="custom-tab-items">
        <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
          <v-tab-item v-if="element.site === site && building === element.building">
            <EnergyConsumptionBuilding :energySources="energySources" :building="building" :energySourceGroup="element" :heatingComponents="heatingComponents" :airComponents="airComponents" />
          </v-tab-item>
        </div>
      </v-tabs-items> -->
        <!-- <b-tabs content-class="mt-3" id ="source-groups-tabs">
            <div v-for="element in allEnergyTypesWithGroup" :key="element.elementCollectionId">
                <div v-if="element.site === site && building === element.building">
                    <b-tab v-bind:title="element.group.toString()">
                        <EnergyConsumptionBuilding :energySources="energySources" :building="building" :energySourceGroup="element" :heatingComponents="heatingComponents" :airComponents="airComponents" />
                    </b-tab>
                </div>
            </div>
        </b-tabs> -->
    </div>
</template>

<script>
import EnergyConsumptionBuilding from '@/components/ems/evaluation/EnergyConsumptionBuilding.vue'

export default {
  data () {
    return {
      allEnergyTypesWithGroup: '',
      tab: null
    }
  },
  components: { EnergyConsumptionBuilding },
  props: {
    site: Number,
    building: Number,
    buildings: Array
  },
  computed: {
    energyTypes () {
      const energySourceGroups = []
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
    }
  },
  mounted () {
    this.energySourceGroupsBuilding()
  },

  methods: {
    energySourceGroupsBuilding () {
      const allEnergyTypes = this.energyTypes
      for (const building in this.buildings) {
        let numberOfGroups = 0
        const numberOfGroupsArray = []
        // console.log(this.buildings[building])
        allEnergyTypes.map(item => {
          if (item.building === this.buildings[building].buildingNumber && item.site === this.buildings[building].numberOfSite) {
            // console.log('test')
            numberOfGroups += 1
            numberOfGroupsArray.push(numberOfGroups)
            // console.log(test)
            item.group = numberOfGroups
          }
        })
        for (const item in allEnergyTypes) {
          if (allEnergyTypes[item].building === this.buildings[building].buildingNumber && allEnergyTypes[item].site === this.buildings[building].numberOfSite) {
            allEnergyTypes[item].numberOfGroupsAsArray = numberOfGroupsArray
          }
        }
      }
      this.allEnergyTypesWithGroup = allEnergyTypes
    }
  },
  created () {
    this.energySourceGroups = [
      { id: 1, groupName: 'Energie Gruppe Heizung', pic: require('@/assets/heating-system.jpeg'), name: 'Energy Source Group' },
      { id: 2, groupName: 'Energie Gruppe Kühlung', pic: require('@/assets/cooling-system.jpeg'), name: 'Energy Source Group' },
      { id: 3, groupName: 'Energie Gruppe Lüftung', pic: require('@/assets/air-system.jpeg'), name: 'Energy Source Group' }
    ]
    this.energySources = [
      { id: 1, groupType: 'Heizung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundwaterHeatPump' },
      { id: 2, groupType: 'Heizung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump' },
      { id: 3, groupType: 'Heizung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump' },
      { id: 4, groupType: 'Kühlung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundWaterHeatPump' },
      { id: 5, groupType: 'Kühlung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump' },
      { id: 6, groupType: 'Kühlung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump' },
      { id: 7, groupType: 'Kühlung', sourceName: 'Kaltwassersatz', pic: require('@/assets/kaltwasser.svg'), name: 'Component', idShortCD: 'ColdWaterSet' },
      { id: 8, groupType: 'Kühlung', sourceName: 'Splitgerät', pic: require('@/assets/split.svg'), name: 'Component', idShortCD: 'SplitDevice' },
      { id: 9, groupType: 'Lüftung', sourceName: 'Klimaanlage', pic: require('@/assets/klimaanlage.svg'), name: 'Component', idShortCD: 'AirConditioningSystem' },
      // { id: 10, groupType: 'Lüftung', sourceName: 'Teilklimaanlage', pic: require('../assets/teilklimaanlage.svg'), name: 'Component' },
      { id: 11, groupType: 'Lüftung', sourceName: 'Lüftungsanlage', pic: require('@/assets/lüftungsanlage.svg'), name: 'Component', idShortCD: 'VentilationSystem' }
    ]
    this.heatingComponents = [
      { id: 1, groupType: 'Pumpe', sourceName: 'Kreiselpumpe', pic: require('@/assets/kreiselpumpe.svg'), name: 'Component', idShortCD: 'CentrifugalPump' },
      { id: 2, groupType: 'Pumpe', sourceName: 'Verdrängerpumpe', pic: require('@/assets/verdrängerpumpe.svg'), name: 'Component', idShortCD: 'DisplacementPump' },
      { id: 3, groupType: 'Pumpe', sourceName: 'Strahlpumpe', pic: require('@/assets/strahlpumpe.svg'), name: 'Component', idShortCD: 'JetPump' }
    ]
    this.airComponents = [
      { id: 1, groupType: 'Lüftung', sourceName: 'Ventilator', pic: require('@/assets/ventilator.svg'), name: 'Component', idShortCD: 'Fan' },
      { id: 2, groupType: 'Klimaanlage', sourceName: 'Erhitzer', pic: require('@/assets/erhitzer.svg'), name: 'Component', idShortCD: 'Heater' },
      { id: 3, groupType: 'Klimaanlage', sourceName: 'Kühler', pic: require('@/assets/kühler.svg'), name: 'Component', idShortCD: 'Cooler' },
      { id: 4, groupType: 'Klimaanlage', sourceName: 'Wärmerückgewinnung', pic: require('@/assets/wrg.svg'), name: 'Component', idShortCD: 'HeatRecovery' }
    ]
  }
}

</script>

<style scoped>
#displayBuildingInformation {
    margin-inline: 10%;
}
.card {
    margin-inline: 10%;
    margin-bottom: 30px;
}
</style>
