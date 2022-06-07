<template>
    <div>
        <b-card class = "shadow p-3 mb-5 bg-white rounded showBuildingInfo" title="Ausgewählte Energiearten">
            <hr>
            <div id ="displayBuildingInformation">
                <div v-for="energyType in energyTypes" :key="energyType[0].key">
                    <div v-if="energyType[1][0].modelType.name === 'Property'">
                        <div v-if="energyType[1][0].value === site[4].value && energyType[2][1].value === building " >
                            <b-row id="ausgewählteEnergieart">
                                <b-col>
                                    <div class="mb-3">
                                        <b-button v-b-toggle="energyType[0].submodelId" variant="outline-secondary" id="energy-type-button">
                                        {{ energyType[0].submodelName }}
                                        </b-button>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeElectricity'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeElectricity :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeHeat'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeHeat :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeGas'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeGas :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeOil'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeOil :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeBiomass'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeBiomass :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypePellets'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypePellets :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                    <div v-if="energyType[0].submodelSemanticId === 'submodel/energyTypeSteam'">
                                        <b-collapse v-bind:id="energyType[0].submodelId">
                                            <EnergyTypeSteam :energyType="energyType" />
                                        </b-collapse>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </b-card>
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
    color: #025939;
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
    color: #025939;
    border-bottom-style: solid;
    border-color: #F2F2F2;
    margin-inline: 10%;
}
.showBuildingInfo {
    margin-top: 20px;
}
</style>
