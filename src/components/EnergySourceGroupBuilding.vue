<template>
    <div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupHeating'">
            <EnergyGroupHeating :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :heatingComponents="heatingComponents"/>
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupCooling'">
            <EnergyGroupCooling  :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" />
        </div>
        <div v-if="energySourceGroup.elementCollectionSemanticId === 'energyUseGroupAirHandling'">
            <EnergyGroupAir :energySources="energySources" :energySourceGroup="energySourceGroup" :building="building" :airComponents="airComponents" />
        </div>
    </div>
</template>

<script>
import EnergyGroupHeating from '@/components/EnergyGroupHeating.vue'
import EnergyGroupCooling from '@/components/EnergyGroupCooling.vue'
import EnergyGroupAir from '@/components/EnergyGroupAir.vue'

export default {
  components: { EnergyGroupHeating, EnergyGroupCooling, EnergyGroupAir },
  props: {
    building: Number,
    energySourceGroup: Object,
    energySources: Array,
    heatingComponents: Array,
    airComponents: Array
  }
}

</script>
