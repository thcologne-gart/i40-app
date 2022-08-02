<template>
    <div>
        <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
          <v-card-title id="source-group-title">{{ energySourceGroup.elementCollection }}</v-card-title>
          <v-card-subtitle>Energieeinsatz Gruppe</v-card-subtitle>
            <h5>Komponenten des Systems</h5>
            <hr>
            <h5>Lüftungsgerät</h5>
                <v-btn id="buttons-card" v-b-toggle="energySources[2].groupType" variant="outline-secondary">
                    Hinzufügen
                </v-btn>
                <b-collapse v-bind:id="energySources[2].groupType">
                    <div v-for="energySource in energySources" :key="energySource.id">
                        <div v-if="energySource.groupType ==='Lüftung'">
                            <v-row>
                                <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                            </v-row>
                        </div>
                    </div>
                </b-collapse>
                <hr>
                <div v-if="energySourceComponents.length != 0">
                    <div v-if="energySourceComponents[0].idShort === 'Klimaanlage'">
                        <h5>Komponenten Klimaanlage</h5>
                        <v-btn id="buttons-card" v-b-toggle="airComponents[0].groupType" variant="outline-secondary">
                          Hinzufügen
                        </v-btn>
                        <b-collapse v-bind:id="airComponents[0].groupType">
                            <div v-for="energySource in airComponents" :key="energySource.id">
                                <div v-if="energySource.groupType ==='Klimaanlage' || energySource.groupType ==='Lüftung'">
                                    <v-row>
                                        <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                                    </v-row>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                    <div v-else-if="energySourceComponents[0].idShort === 'Lüftungsanlage'">
                        <h5>Komponenten Lüftungsanlage</h5>
                        <v-btn id="buttons-card" v-b-toggle="airComponents[0].groupType" variant="outline-secondary">
                            Hinzufügen
                        </v-btn>
                        <b-collapse v-bind:id="airComponents[0].groupType">
                            <div v-for="energySource in airComponents" :key="energySource.id">
                                <div v-if="energySource.groupType ==='Lüftung'">
                                    <v-row>
                                        <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" />
                                    </v-row>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                    <SelectedEnergySourceComponents :energySources="energySources" :energySourceGroup="energySourceGroup" :energySourceComponents="energySourceComponents" />
                </div>
        </v-card>
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
