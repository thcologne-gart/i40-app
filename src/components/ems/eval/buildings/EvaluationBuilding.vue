<template>
  <div>
    <v-sheet elevation="2">
    <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
        <v-tab v-for="submodel in submodels" :key="submodel.id">{{ submodel.name }}</v-tab>
    </v-tabs>
    </v-sheet>
    <v-tabs-items v-model="tab" id="custom-tab-items">
    <v-tab-item v-for="submodel in submodels" :key="submodel.id">
        <div v-if="submodel.name == 'Energieart'">
            <EnergyTypeBuildings />
        </div>
        <div v-else-if="submodel.name == 'Energieeinsatz'">
            <EnergySourceBuildings />
        </div>
        <div v-else-if="submodel.name == 'Energieverbrauch'">
            <EnergyConsumptionBuildings />
        </div>
        <div v-else-if="submodel.name == 'SEU'">
            <SEUBuildings />
        </div>
    </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import EnergyTypeBuildings from '@/components/ems/eval/buildings/EnergyTypeBuildings.vue'
import EnergySourceBuildings from '@/components/ems/eval/buildings/EnergySourceBuildings.vue'
import EnergyConsumptionBuildings from '@/components/ems/eval/buildings/EnergyConsumptionBuildings.vue'
import SEUBuildings from '@/components/ems/eval/buildings/SEUBuildings.vue'

export default {
  data () {
    return {
      tab: null
    }
  },
  components: { EnergyTypeBuildings, EnergySourceBuildings, EnergyConsumptionBuildings, SEUBuildings },
  props: {
    site: Array,
    submodels: Array
  }
}
</script>
