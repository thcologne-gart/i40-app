<template>
    <div>
      <div v-if="showSelectedEnergyTypes != 0">
        <!-- <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
          <v-card-title id="card-title">Energieeinsatzgruppen</v-card-title>
            <hr>
            <div id ="displayBuildingInformation">
                <b-carousel
                  id="carousel-energy-source-groups"
                  v-model="slide"
                  :interval="4000"
                  background="#ababab"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                    <div v-for="item in energyTypes" :key="item.elementCollectionId">
                        <div v-if="item.site === site[4].value && item.building === building " >
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupHeating'">
                                <router-link :to = "{ name: energySourceGroups[0].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup, heatingComponents: heatingComponents, airComponents: airComponents } }">
                                    <b-carousel-slide
                                    v-bind:caption = energySourceGroups[0].groupName
                                    v-bind:text = item.elementCollection
                                    :img-src= energySourceGroups[0].pic
                                    ></b-carousel-slide>
                                </router-link>
                            </div>
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupCooling'">
                                 <router-link :to = "{ name: energySourceGroups[1].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup, heatingComponents: heatingComponents, airComponents: airComponents } }">
                                    <b-carousel-slide
                                    v-bind:caption = energySourceGroups[1].groupName
                                    v-bind:text = item.elementCollection
                                    :img-src= energySourceGroups[1].pic
                                    ></b-carousel-slide>
                                </router-link>
                            </div>
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupAirHandling'">
                                 <router-link :to = "{ name: energySourceGroups[2].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup } }">
                                    <b-carousel-slide
                                    v-bind:caption = energySourceGroups[2].groupName
                                    v-bind:text = item.elementCollection
                                    :img-src= energySourceGroups[2].pic
                                    ></b-carousel-slide>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </b-carousel>
            </div>
        </v-card> -->

        <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
          <v-card-title id="card-title">Energieeinsatzgruppen</v-card-title>
            <hr>
            <div id ="displayBuildingInformation">
                <v-carousel
                  id="carousel-energy-source-groups"
                  v-model="model"
                  :interval="4000"
                  background="#ababab"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                    <div v-for="item in energyTypes" :key="item.elementCollectionId">
                        <div v-if="item.site === site[4].value && item.building === building " >
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupHeating'">
                                <router-link :to = "{ name: energySourceGroups[0].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup, heatingComponents: heatingComponents, airComponents: airComponents } }">
                                    <v-carousel-item
                                    :src= energySourceGroups[0].pic
                                    >
                                        <v-row
                                          class="fill-height title"
                                          align="center"
                                          justify="center"
                                        >
                                          <div>
                                            {{ item.elementCollection }}
                                          </div>
                                        </v-row>
                                    </v-carousel-item>
                                </router-link>
                            </div>
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupCooling'">
                                 <router-link :to = "{ name: energySourceGroups[1].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup, heatingComponents: heatingComponents, airComponents: airComponents } }">
                                    <v-carousel-item
                                    :src= energySourceGroups[1].pic
                                    >
                                        <v-row
                                          class="fill-height title"
                                          align="center"
                                          justify="center"
                                        >
                                          <div>
                                            {{ item.elementCollection }}
                                          </div>
                                        </v-row>
                                    </v-carousel-item>
                                </router-link>
                            </div>
                            <div v-if="item.elementCollectionSemanticId === 'energyUseGroupAirHandling'">
                                 <router-link :to = "{ name: energySourceGroups[2].name, params: { site: site, building: building, buildings: buildings, energySourceGroup: item, energySources: energySources, energyTypes: energyTypes, allEnergyTypesWithGroup: allEnergyTypesWithGroup } }">
                                    <v-carousel-item
                                    :src= energySourceGroups[2].pic
                                    >
                                        <v-row
                                          class="fill-height title"
                                          align="center"
                                          justify="center"
                                        >
                                          <div>
                                            {{ item.elementCollection }}
                                          </div>
                                        </v-row>
                                    </v-carousel-item>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </v-carousel>
            </div>
        </v-card>
      </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      model: 0,
      slide: 0,
      sliding: null,
      // numberOfGroupsArray: '',
      allEnergyTypesWithGroup: ''
    }
  },
  props: {
    site: Array,
    building: Number,
    buildings: Array
  },
  computed: {
    showSelectedEnergyTypes () {
      const loadedEnergyInformation = this.$store.getters.loadedEnergyTypeInformation
      let selectedEnergyGroups = 0
      for (const item in loadedEnergyInformation) {
        let i
        for (i = 1; i < loadedEnergyInformation[item].length; i++) {
          for (const key in loadedEnergyInformation[item][i]) {
            if (loadedEnergyInformation[item][i][key].modelType.name === 'SubmodelElementCollection' && loadedEnergyInformation[item][1][0].value === this.site[4].value && loadedEnergyInformation[item][2][1].value === this.building) {
              selectedEnergyGroups = 1
            }
          }
        }
      }
      return selectedEnergyGroups
    },
    energyTypes () {
      const energySourceGroups = []
      const loadedEnergyInformation = this.$store.getters.loadedEnergyTypeInformation
      for (const item in loadedEnergyInformation) {
        // console.log(loadedEnergyInformation[item])
        // let element
        let i
        for (i = 1; i < loadedEnergyInformation[item].length; i++) {
          // console.log(i)
          for (const key in loadedEnergyInformation[item][i]) {
            // console.log(key)
            if (loadedEnergyInformation[item][i][key].modelType.name === 'SubmodelElementCollection') {
              // console.log('SubmodelElementCollection')
              // console.log(loadedEnergyInformation[item])
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
          // if (loadedEnergyInformation[item][i].modelType.name === 'SubmodelElementCollection') {
          // console.log('SubmodelElementCollection')
          // }
        }
      }
      console.log(typeof energySourceGroups)
      // console.log(this.$store.getters.loadedEnergyTypeInformation)
      return energySourceGroups
    }
  },
  mounted () {
    this.energySourceGroupsBuilding()
  },

  methods: {
    energySourceGroupsBuilding () {
      const allEnergyTypes = this.energyTypes
      // console.log(allEnergyTypes)
      // console.log(this.buildings)
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
        // allEnergyTypes[item].group = numberOfGroups
        // console.log(numberOfGroupsArray)
      }
      // console.log(allEnergyTypes)
      this.allEnergyTypesWithGroup = allEnergyTypes
      /*
      for (const item in allEnergyTypes) {

        for (const building in this.buildings) {
          if (this.buildings[building].numberOfSite === allEnergyTypes[item].site && this.buildings[building].buildingNumber === allEnergyTypes[item].building) {
            console.log('test')
          }

         console.log(allEnergyTypes[item])
         let numberOfGroups = 0
         numberOfGroups += 1
         numberOfGroupsArray.push(numberOfGroups)
         allEnergyTypes[item].group = numberOfGroups
       this.numberOfGroupsArray = numberOfGroupsArray
       this.allEnergyTypesWithGroup = allEnergyTypes
       console.log(allEnergyTypes)
       */
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  created () {
    this.energySourceGroups = [
      { id: 1, groupName: 'Energie Gruppe Heizung', pic: require('@/assets/heating-system.jpeg'), name: 'Energy Source Group' },
      { id: 2, groupName: 'Energie Gruppe Kühlung', pic: require('@/assets/cooling-system.jpeg'), name: 'Energy Source Group' },
      { id: 3, groupName: 'Energie Gruppe Lüftung', pic: require('@/assets/air-system.jpeg'), name: 'Energy Source Group' }
    ]
    this.energySources = [
      { id: 1, groupType: 'Heizung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundwaterHeatPump', idShortEnpi: 'EnPis Grundwasserwärmepumpe', idShortCDEnpi: 'EnpiGroundwaterHeatpump' },
      { id: 2, groupType: 'Heizung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump', idShortEnpi: 'EnPis Luftwärmepumpe', idShortCDEnpi: 'EnpiAirHeatpump' },
      { id: 3, groupType: 'Heizung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump', idShortEnpi: 'EnPis Erdwärmepumpe', idShortCDEnpi: 'EnpiGroundSourceHeatpump' },
      { id: 4, groupType: 'Kühlung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundWaterHeatPump', idShortEnpi: 'EnPis Grundwasserwärmepumpe', idShortCDEnpi: 'EnpiGroundwaterHeatpump' },
      { id: 5, groupType: 'Kühlung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump', idShortEnpi: 'EnPis Luftwärmepumpe', idShortCDEnpi: 'EnpiAirHeatpump' },
      { id: 6, groupType: 'Kühlung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump', idShortEnpi: 'EnPis Erdwärmepumpe', idShortCDEnpi: 'EnpiGroundSourceHeatpump' },
      { id: 7, groupType: 'Kühlung', sourceName: 'Kaltwassersatz', pic: require('@/assets/kaltwasser.svg'), name: 'Component', idShortCD: 'ColdWaterSet', idShortEnpi: 'EnPis Kalwassersatz', idShortCDEnpi: 'EnpiColdWaterSet' },
      { id: 8, groupType: 'Kühlung', sourceName: 'Splitgerät', pic: require('@/assets/split.svg'), name: 'Component', idShortCD: 'SplitDevice', idShortEnpi: 'EnPis Splitgerät', idShortCDEnpi: 'EnpiSplitDevice' },
      { id: 9, groupType: 'Lüftung', sourceName: 'Klimaanlage', pic: require('@/assets/klimaanlage.svg'), name: 'Component', idShortCD: 'AirConditioningSystem', idShortEnpi: 'EnPis Klimaanlage', idShortCDEnpi: 'EnpiAirConditioningSystem' },
      // { id: 10, groupType: 'Lüftung', sourceName: 'Teilklimaanlage', pic: require('../assets/teilklimaanlage.svg'), name: 'Component' },
      { id: 11, groupType: 'Lüftung', sourceName: 'Lüftungsanlage', pic: require('@/assets/lüftungsanlage.svg'), name: 'Component', idShortCD: 'VentilationSystem', idShortEnpi: 'EnPis Lüftungsanlagae', idShortCDEnpi: 'EnpiVentilationSystem' }
    ]
    this.heatingComponents = [
      { id: 1, groupType: 'Pumpe', sourceName: 'Kreiselpumpe', pic: require('@/assets/kreiselpumpe.svg'), name: 'Component', idShortCD: 'CentrifugalPump', idShortEnpi: 'EnPis Kreiselpumpe', idShortCDEnpi: 'EnpiCentrifugalPump' },
      { id: 2, groupType: 'Pumpe', sourceName: 'Verdrängerpumpe', pic: require('@/assets/verdrängerpumpe.svg'), name: 'Component', idShortCD: 'DisplacementPump', idShortEnpi: 'EnPis Verdrängerpumpe', idShortCDEnpi: 'EnpiDisplacementPump' },
      { id: 3, groupType: 'Pumpe', sourceName: 'Strahlpumpe', pic: require('@/assets/strahlpumpe.svg'), name: 'Component', idShortCD: 'JetPump', idShortEnpi: 'EnPis Strahlpumpe', idShortCDEnpi: 'EnpiJetPump' }
    ]
    this.airComponents = [
      { id: 1, groupType: 'Lüftung', sourceName: 'Ventilator', pic: require('@/assets/ventilator.svg'), name: 'Component', idShortCD: 'Fan', idShortEnpi: 'EnPis Ventilator', idShortCDEnpi: 'EnpiFan' },
      { id: 2, groupType: 'Klimaanlage', sourceName: 'Erhitzer', pic: require('@/assets/erhitzer.svg'), name: 'Component', idShortCD: 'Heater', idShortEnpi: 'EnPis Erhitzer', idShortCDEnpi: 'EnpiHeater' },
      { id: 3, groupType: 'Klimaanlage', sourceName: 'Kühler', pic: require('@/assets/kühler.svg'), name: 'Component', idShortCD: 'Cooler', idShortEnpi: 'EnPis Kühler' },
      { id: 4, groupType: 'Klimaanlage', sourceName: 'Wärmerückgewinnung', pic: require('@/assets/wrg.svg'), name: 'Component', idShortCD: 'HeatRecovery', idShortEnpi: 'EnPis Wärmerückgewinnung', idShortCDEnpi: 'EnpiHeatRecovery' }
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
.card-title {
    margin-top: -10px;
    font-size: 20px;
}
.title {
    color: white;
    position: relative;
    z-index: 2;
    font-size: 200% !important;
    font-family: Helvetica, Arial, sans-serif !important;
}
</style>
