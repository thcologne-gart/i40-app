<template>
    <div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupHeating'">
            <EnergyGroupHeating :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :heatingComponents="heatingComponents" :enpiSubmodels="enpiSubmodels"/>
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupCooling'">
            <EnergyGroupCooling  :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :enpiSubmodels="enpiSubmodels"/>
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupAirHandling'">
            <EnergyGroupAir :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :airComponents="airComponents" :enpiSubmodels="enpiSubmodels"/>
        </div>
    </div>
</template>

<script>
import EnergyGroupHeating from '@/components/ems/evaluation/EnergyGroupHeating.vue'
import EnergyGroupCooling from '@/components/ems/evaluation/EnergyGroupCooling.vue'
import EnergyGroupAir from '@/components/ems/evaluation/EnergyGroupAir.vue'

export default {
  components: { EnergyGroupHeating, EnergyGroupCooling, EnergyGroupAir },
  props: {
    building: Number,
    energySourceGroup: Object,
    energySources: Array,
    heatingComponents: Array,
    airComponents: Array,
    enpiSubmodels: Array
  }
}

</script>
