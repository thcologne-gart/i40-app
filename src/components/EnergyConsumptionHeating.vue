<template>
    <div>
        <b-card
        id="heating-systems"
        title= 'Energieverbrauch'
        :sub-title= energySourceGroup.elementCollection
        class="mb-2"
        >
            <ConsumptionComponents :energySources="energySources" :energySourceGroup="energySourceGroup" :energySourceComponents="energySourceComponents" />
        </b-card>
    </div>
</template>

<script>
import ConsumptionComponents from '@/components/ConsumptionComponents.vue'

export default {
  components: { ConsumptionComponents },
  props: {
    energySources: Array,
    energySourceGroup: Object,
    heatingComponents: Array
  },
  computed: {
    energySourceComponents () {
      const energyTypeSubmodels = this.$store.getters.loadedEnergyTypeInformation
      let energySourceComponents
      for (const item in energyTypeSubmodels) {
        // console.log(energyTypeSubmodels[item])
        if (energyTypeSubmodels[item][0].submodelId === this.energySourceGroup.submodelId) {
          // console.log(energyTypeSubmodels[item])
          for (const elementCollection in energyTypeSubmodels[item]) {
            const test = energyTypeSubmodels[item][elementCollection]
            // console.log(test.idShort)
            for (const wow in test) {
              if (test[wow].idShort === this.energySourceGroup.elementCollection) {
                energySourceComponents = test
              }
            }
          }
        }
      }
      const componentInfo = []
      for (const element in energySourceComponents) {
        const allComponentsOfCollection = energySourceComponents[element].value
        for (const components in allComponentsOfCollection) {
          componentInfo.push({
            componenElementCollectionId: components,
            idShort: allComponentsOfCollection[components].idShort,
            property: allComponentsOfCollection[components].value
          })
        }
      }
      console.log(componentInfo)
      return componentInfo
    }
  }
}
</script>
