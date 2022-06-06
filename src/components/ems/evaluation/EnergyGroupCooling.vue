<template>
    <div>
        <b-card
        id="heating-systems"
        :title= energySourceGroup.elementCollection
        sub-title= "Energieeinsatz Gruppe"
        class="mb-2"
        >
            <h5 class="text-left">Komponenten des Systems</h5>
            <hr>
            <h5 class="text-left">Kälteerzeuger</h5>
            <b-button v-b-toggle="energySources[1].groupType" variant="outline-secondary">
                Kälteerzeuger hinzufügen
            </b-button>
            <b-collapse v-bind:id="energySources[1].groupType">
                <div v-for="energySource in energySources" :key="energySource.id">
                    <div v-if="energySource.groupType ==='Kühlung'">
                        <b-row>
                            <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                        </b-row>
                    </div>
                </div>
            </b-collapse>
            <SelectedEnergySourceComponents :energySources="energySources" :energySourceGroup="energySourceGroup" :energySourceComponents="energySourceComponents" />
        </b-card>
    </div>
</template>

<script>
import EnergySourceCard from '@/components/ems/evaluation/EnergySourceCard.vue'
import SelectedEnergySourceComponents from '@/components/ems/evaluation/SelectedEnergySourceComponents.vue'

export default {
  components: { EnergySourceCard, SelectedEnergySourceComponents },
  props: {
    energySources: Array,
    energySourceGroup: Object
  },
  computed: {
    energySourceComponents () {
      const energyTypeSubmodels = this.$store.getters.loadedEnergyTypeInformation
      // console.log(energyTypeSubmodels)
      // console.log(this.energySourceGroup)
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
      // let component
      const componentInfo = []
      // console.log(energySourceComponents)
      for (const element in energySourceComponents) {
        const allComponentsOfCollection = energySourceComponents[element].value
        for (const components in allComponentsOfCollection) {
          componentInfo.push({
            componenElementCollectionId: components,
            idShort: allComponentsOfCollection[components].idShort
          })
          // component = allComponentsOfCollection[components].idShort
        }
      }
      return componentInfo
    }
  }
}
</script>
