<template>
    <div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupHeating'">
            <EnergyConsumptionHeating :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :heatingComponents="heatingComponents"/>
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupCooling'">
            <EnergyConsumptionCooling  :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" />
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupAirHandling'">
            <EnergyConsumptionAir :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :airComponents="airComponents" />
        </div>
    </div>
</template>

<script>
import EnergyConsumptionHeating from '@/components/ems/evaluation/EnergyConsumptionHeating.vue'
import EnergyConsumptionCooling from '@/components/ems/evaluation/EnergyConsumptionCooling.vue'
import EnergyConsumptionAir from '@/components/ems/evaluation/EnergyConsumptionAir.vue'

export default {
  components: { EnergyConsumptionHeating, EnergyConsumptionCooling, EnergyConsumptionAir },
  props: {
    building: Number,
    energySourceGroup: Object,
    energySources: Array,
    heatingComponents: Array,
    airComponents: Array
  }
}

</script>
