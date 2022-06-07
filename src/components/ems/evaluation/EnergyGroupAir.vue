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
            <h5 class="text-left">Lüftungsgerät</h5>
                <b-button v-b-toggle="energySources[2].groupType" variant="outline-secondary">
                    Lüftungsgerät hinzufügen
                </b-button>
                <b-collapse v-bind:id="energySources[2].groupType">
                    <div v-for="energySource in energySources" :key="energySource.id">
                        <div v-if="energySource.groupType ==='Lüftung'">
                            <b-row>
                                <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                            </b-row>
                        </div>
                    </div>
                </b-collapse>
                <hr>
                <div v-if="energySourceComponents.length != 0">
                    <div v-if="energySourceComponents[0].idShort === 'Klimaanlage'">
                        <h5 class="text-left">Komponenten Klimaanlage</h5>
                        <b-button v-b-toggle="airComponents[0].groupType" variant="outline-secondary">
                            Komponente hinzufügen
                        </b-button>
                        <b-collapse v-bind:id="airComponents[0].groupType">
                            <div v-for="energySource in airComponents" :key="energySource.id">
                                <div v-if="energySource.groupType ==='Klimaanlage' || energySource.groupType ==='Lüftung'">
                                    <b-row>
                                        <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                                    </b-row>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                    <div v-else-if="energySourceComponents[0].idShort === 'Lüftungsanlage'">
                        <h5 class="text-left">Komponenten Lüftungsanlage</h5>
                        <b-button v-b-toggle="airComponents[0].groupType" variant="outline-secondary">
                            Komponente hinzufügen
                        </b-button>
                        <b-collapse v-bind:id="airComponents[0].groupType">
                            <div v-for="energySource in airComponents" :key="energySource.id">
                                <div v-if="energySource.groupType ==='Lüftung'">
                                    <b-row>
                                        <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                                    </b-row>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                    <SelectedEnergySourceComponents :energySources="energySources" :energySourceGroup="energySourceGroup" :energySourceComponents="energySourceComponents" />
                </div>
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
    energySourceGroup: Object,
    airComponents: Array
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
      const componentInfo = []
      // let component
      // console.log(energySourceComponents)
      for (const element in energySourceComponents) {
        const allComponentsOfCollection = energySourceComponents[element].value
        for (const components in allComponentsOfCollection) {
          // console.log(allComponentsOfCollection)
          componentInfo.push({
            componenElementCollectionId: components,
            idShort: allComponentsOfCollection[components].idShort
          })
          // component = allComponentsOfCollection[components].idShort
        }
      }
      // console.log(componentInfo)
      return componentInfo
    }
  }
}
</script>
