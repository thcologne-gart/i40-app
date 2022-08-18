<template>
    <div>
        <v-card class ="mx-auto my-8" max-width="80%" elevation="2">
            <v-card-title id="card-title">Energiearten</v-card-title>
            <hr>
              <v-container>
                <v-row>
                    <v-col :key="energyType.id" v-for="energyType in energyTypes">
                        <!--<EnergyTypeCard :energyType="energyType" @add-new-energy-type=addEnergyType @add-submodel-ref-aas=addAasRef />//-->
                         <EnergyTypeCard :energyType="energyType" :site ="building.numberOfSite" :buildingNumber="building.buildingNumber" :submodelId="building.submodelId" :buildings="buildings" />
                    </v-col>
                </v-row>
              </v-container>
          </v-card>
          <EnergyTypeInformation :site="building.numberOfSite" :building="building.buildingNumber" :buildings="buildings" />
    </div>
</template>

<script>
import EnergyTypeCard from '@/components/ems/eval/EnergyTypeCard.vue'
import EnergyTypeInformation from '@/components/ems/eval/EnergyTypeInformation.vue'

export default {
  props: {
    building: Object,
    buildings: Array
  },
  components: { EnergyTypeCard, EnergyTypeInformation },
  async created () {
    this.energyTypes = [
      { id: 'submodel/energyTypeElectricity', name: 'Strom', pic: require('@/assets/electricity.svg'), nameForSubmodel: 'Energieart Strom', idShortCD: 'SubmodelEnergyTypeElectricity', idEnpi: 'submodel/enpiElectricity', nameEnpi: 'Strom', nameForSubmodelEnpi: 'EnPis Strom', idShortCDEnpi: 'SubmodelEnpiElectricity' },
      { id: 'submodel/energyTypeHeat', name: 'Wärme', pic: require('@/assets/heat.svg'), nameForSubmodel: 'Energieart Wärme', idShortCD: 'SubmodelEnergyTypeHeat', idEnpi: 'submodel/enpiHeat', nameEnpi: 'Wärme', nameForSubmodelEnpi: 'EnPis Wärme', idShortCDEnpi: 'SubmodelEnpiHeat' },
      { id: 'submodel/energyTypeGas', name: 'Gas', pic: require('@/assets/gas.svg'), nameForSubmodel: 'Energieart Gas', idShortCD: 'SubmodelEnergyTypeGas', idEnpi: 'submodel/enpiGas', nameEnpi: 'Gas', nameForSubmodelEnpi: 'EnPis Gas', idShortCDEnpi: 'SubmodelEnpiGas' },
      { id: 'submodel/energyTypeOil', name: 'Öl', pic: require('@/assets/oil.svg'), nameForSubmodel: 'Energieart Öl', idShortCD: 'SubmodelEnergyTypeOil', idEnpi: 'submodel/enpiOil', nameEnpi: 'Öl', nameForSubmodelEnpi: 'EnPis Öl', idShortCDEnpi: 'SubmodelEnpiOil' },
      { id: 'submodel/energyTypeBiomass', name: 'Biomasse', pic: require('@/assets/biomass.svg'), nameForSubmodel: 'Energieart Biomasse', idShortCD: 'SubmodelEnergyTypeBiomass', idEnpi: 'submodel/enpiBiomass', nameEnpi: 'Biomasse', nameForSubmodelEnpi: 'EnPi Biomasse', idShortCDEnpi: 'SubmodelEnpiBiomass' },
      { id: 'submodel/energyTypePellets', name: 'Holzpellets', pic: require('@/assets/pellets.svg'), nameForSubmodel: 'Energieart Holzpellets', idShortCD: 'SubmodelEnergyTypePellets', idEnpi: 'submodel/enpiPellets', nameEnpi: 'Holzpellets', nameForSubmodelEnpi: 'EnPis Holzpellets', idShortCDEnpi: 'SubmodelEnpiPellets' },
      { id: 'submodel/energyTypeSteam', name: 'Dampf', pic: require('@/assets/steam.svg'), nameForSubmodel: 'Energieart Danpf', idShortCD: 'SubmodelEnergyTypeSteam', idEnpi: 'submodel/enpiSteam', nameEnpi: 'Dampf', nameForSubmodelEnpi: 'EnPis Dampf', idShortCDEnpi: 'SubmodelEnpiSteam' }
    ]
    this.submodelName = 'Energieart'
  }
}
</script>
