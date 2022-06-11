<template>
    <div id = "header">
        <div v-if="getSubmodelCollections.length != 0">
            <b-card no-body>
                <b-tabs card pills vertical nav-wrapper-class="col-2" id="energy-group-enpis">
                    <b-tab v-bind:title="enpi.id" v-for="enpi in getSubmodelCollections" :key="enpi.id" id="enpi-tab">
                        <slot name="enpi" v-bind:enpi="enpi">Platzhalter</slot>
                        <EnpisComponents :enpiComponent="getComponentSubmodelCollections" :enpiEnergyGroup="enpi"/>
                        <div>{{ building }}</div>
                        <div>{{ site }}</div>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import EnpisComponents from '@/components/ems/indicators/EnpisComponents.vue'

export default {
  components: { EnpisComponents },
  props: {
    enpiSubmodel: Array,
    site: Number,
    building: Number
  },
  computed: {
    getSubmodelCollections () {
      const seCollections = []
      for (const item in this.enpiSubmodel) {
        for (const element in this.enpiSubmodel[item]) {
          // console.log(this.enpiSubmodel[item])
          const collection = this.enpiSubmodel[item][element]
          if (typeof collection.idShort !== 'undefined' && collection.idShort.includes('EnPis Energiegruppe')) {
            // console.log(this.enpiSubmodel[item][element])
            for (const value in collection) {
              // console.log(collection[value])
              if (typeof collection[value] === 'object') {
                // console.log(collection[value])
              }
            }
            const enpiCollection = {
              id: collection.idShort
            }
            seCollections.push(enpiCollection)
          }
        }
      }
      // console.log(this.enpiSubmodel)
      return seCollections
    },
    getComponentSubmodelCollections () {
      const test = []
      for (const item in this.enpiSubmodel) {
        for (const element in this.enpiSubmodel[item]) {
          console.log(this.enpiSubmodel[item])
          const componentCollection = this.enpiSubmodel[item][element]
          if (typeof componentCollection.idShort !== 'undefined' && typeof componentCollection.value !== 'undefined' && componentCollection.idShort.includes('EnPis Energiegruppe') && componentCollection.value !== 0) {
            const componentSeCollections = []
            const enpiCollectionComponent = {
              id: componentCollection.value
            }
            componentSeCollections.push(enpiCollectionComponent)
            console.log(componentCollection.value)
            // const collectionEnpiComponents = []
            for (const component in componentSeCollections) {
              console.log(componentSeCollections[component])
              const id = componentSeCollections[component].id
              for (const com in id) {
                const enpiTest = {
                  idComponent: id[com].idShort,
                  idGroup: componentCollection.idShort
                }
                // enpiCollectionComponent.idComponent = id[com].idShort
                // enpiCollectionComponent.idComponent = id[com].idShort
                // console.log(enpiCollectionComponent)
                // collectionEnpiComponents.push(enpiName)
                test.push(enpiTest)
              }
            }
          }
          /*
          const collectionEnpiComponents = []
          for (const component in componentSeCollections) {
            // console.log(componentSeCollections[component])
            const id = componentSeCollections[component].id
            for (const com in id) {
              const enpiName = {
                id: id[com].idShort
              }
              collectionEnpiComponents.push(enpiName)
              componentSeCollections.push(enpiName)
            }
          }
          */
        }
      }
      console.log(test)
      return test
    }
  }
}
</script>

<style scoped>
.col-auto {
    max-width: 20px;
}
</style>
