<template>
    <div>
        <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
          <v-card-title id="source-group-title">{{ energySourceGroup.elementCollection }}</v-card-title>
          <v-card-subtitle>Energieeinsatz Gruppe</v-card-subtitle>
            <h5>Komponenten des Systems</h5>
            <hr>
            <h5>Wärmeerzeuger</h5>
            <v-btn id="buttons-card" v-b-toggle="energySources[0].groupType" variant="outline-secondary">
                Hinzufügen
            </v-btn>
            <b-collapse v-bind:id="energySources[0].groupType">
                <div v-for="energySource in energySources" :key="energySource.id">
                    <div v-if="energySource.groupType ==='Heizung'">
                        <v-row>
                            <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" :enpiSubmodels="enpiSubmodels" />
                        </v-row>
                    </div>
                </div>
            </b-collapse>
            <hr>
            <h5>Pumpen</h5>
            <v-btn id="buttons-card" v-b-toggle="heatingComponents[0].groupType" variant="outline-secondary">
                Hinzufügen
            </v-btn>
            <b-collapse v-bind:id="heatingComponents[0].groupType">
                <div v-for="energySource in heatingComponents" :key="energySource.id">
                    <div v-if="energySource.groupType ==='Pumpe'">
                        <v-row>
                            <EnergySourceCard :energySource="energySource" :energySourceGroup="energySourceGroup" :enpiSubmodels="enpiSubmodels" />
                        </v-row>
                    </div>
                </div>
            </b-collapse>
            <SelectedEnergySourceComponents :energySources="energySources" :energySourceGroup="energySourceGroup" :energySourceComponents="energySourceComponents" />
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
    heatingComponents: Array,
    enpiSubmodels: Array
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
      // console.log(componentInfo)
      return componentInfo
    }
    /*
    enpiSubmodels () {
      const enpiSubmodels = this.$store.getters.loadedEnpiSubmodels
      let enpiComponents
      for (const item in enpiSubmodels) {
        if (enpiSubmodels[item][0].submodelId === this.energySourceGroup.submodelId) {
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
      // console.log(componentInfo)
      return componentInfo
    }
    */
  }
}
</script>

<style scoped>
.btn {
    margin-bottom: 10px;
    width: 15rem;
}
</style>
