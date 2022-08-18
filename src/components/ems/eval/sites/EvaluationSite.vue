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
            <EnergyTypeSites />
        </div>
        <div v-else-if="submodel.name == 'Energieeinsatz'">
            <EnergySourceSites />
        </div>
        <div v-else-if="submodel.name == 'Energieverbrauch'">
            <EnergyConsumptionSites />
        </div>
        <div v-else-if="submodel.name == 'SEU'">
            <SEUSites />
        </div>
    </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import EnergyTypeSites from '@/components/ems/eval/sites/EnergyTypeSites.vue'
import EnergySourceSites from '@/components/ems/eval/sites/EnergySourceSites.vue'
import EnergyConsumptionSites from '@/components/ems/eval/sites/EnergyConsumptionSites.vue'
import SEUSites from '@/components/ems/eval/sites/SEUSites.vue'

export default {
  data () {
    return {
      tab: null
    }
  },
  components: { EnergyTypeSites, EnergySourceSites, EnergyConsumptionSites, SEUSites },
  props: {
    site: Array,
    submodels: Array
  }
}
</script>
