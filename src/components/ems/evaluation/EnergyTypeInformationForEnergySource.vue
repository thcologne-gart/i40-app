<template>
    <div>
        <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
            <v-card-title id="card-title">Ausgewählte Energiearten</v-card-title>
            <hr>
            <div id ="displayBuildingInformation">
                <div v-for="energyType in energyTypes" :key="energyType[0].key">
                    <div v-if="energyType[1][0].modelType.name === 'Property'">
                        <div v-if="energyType[1][0].value === site[4].value && energyType[2][1].value === building" >
                            <v-row id="ausgewählteEnergieart">
                                <v-col>
                                    <div class="mb-3">
                                        <v-btn variant="outline-secondary" class="mx-auto" @click="expand = !expand">
                                            {{ energyType[0].submodelName }}
                                        </v-btn>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeElectricity'">
                                        <v-expand-transition>
                                            <EnergyTypeElectricity :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeHeat'">
                                        <v-expand-transition>
                                            <EnergyTypeHeat :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeGas'">
                                        <v-expand-transition>
                                            <EnergyTypeGas :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeOil'">
                                        <v-expand-transition>
                                            <EnergyTypeOil :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeBiomass'">
                                        <v-expand-transition>
                                            <EnergyTypeBiomass :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypePellets'">
                                        <v-expand-transition>
                                            <EnergyTypePellets :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>

                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeSteam'">
                                        <v-expand-transition>
                                            <EnergyTypeSteam :energyType="energyType" :enpis="enpis" :site="site[4].value" :building="building" :expand="expand"/>
                                        </v-expand-transition>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import EnergyTypeElectricity from '@/components/ems/evaluation/EnergyTypeElectricity.vue'
import EnergyTypeHeat from '@/components/ems/evaluation/EnergyTypeHeat.vue'
import EnergyTypeGas from '@/components/ems/evaluation/EnergyTypeGas.vue'
import EnergyTypeOil from '@/components/ems/evaluation/EnergyTypeOil.vue'
import EnergyTypeBiomass from '@/components/ems/evaluation/EnergyTypeBiomass.vue'
import EnergyTypePellets from '@/components/ems/evaluation/EnergyTypePellets.vue'
import EnergyTypeSteam from '@/components/ems/evaluation/EnergyTypeSteam.vue'

export default {
  data: () => ({
    expand: false
  }),
  props: {
    site: Array,
    building: Number,
    buildings: Array
  },
  components: { EnergyTypeElectricity, EnergyTypeHeat, EnergyTypeGas, EnergyTypeOil, EnergyTypeBiomass, EnergyTypePellets, EnergyTypeSteam },
  computed: {
    energyTypes () {
      return this.$store.getters.loadedEnergyTypeInformation
    },
    enpis () {
      return this.$store.getters.loadedEnpiSubmodels
    },
    aas () {
      const aas = this.$store.getters.loadedAas
      return aas
    }
  }
}
</script>
<style scoped>
#ausgewählteEnergieart {
    margin-top: 5px;
}
.card {
    margin-inline: 10%;
    margin-bottom: 30px;
}
.card-title {
    margin-top: -10px;
    font-size: 20px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#energy-type-button {
    width: 10rem;
}
#displayBuildingInformation {
    margin-inline: 10%;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
#selected {
    color: #0a322b;
    border-bottom-style: solid;
    border-color: #F2F2F2;
    margin-inline: 10%;
}
.showBuildingInfo {
    margin-top: 20px;
}
</style>
