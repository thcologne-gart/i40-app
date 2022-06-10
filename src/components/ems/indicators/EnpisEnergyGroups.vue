<template>
    <div id = "header">
        <div v-if="getSubmodelCollections.length != 0">
            <b-card no-body>
                <b-tabs card pills vertical id="energy-group-enpis">
                    <b-tab v-bind:title="enpi.id" v-for="enpi in getSubmodelCollections" :key="enpi.id">
                        <slot name="enpi" v-bind:enpi="enpi">Platzhalter</slot>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'EnPis',
  props: {
    enpiSubmodel: Array
  },
  computed: {
    getSubmodelCollections () {
      const seCollections = []
      for (const item in this.enpiSubmodel) {
        for (const element in this.enpiSubmodel[item]) {
          // console.log(this.enpiSubmodel[item][element])
          const collection = this.enpiSubmodel[item][element]
          if (typeof collection.idShort !== 'undefined' && collection.idShort.includes('EnPis Energiegruppe')) {
            console.log(this.enpiSubmodel[item][element])
            const enpiCollection = {
              id: collection.idShort
            }
            seCollections.push(enpiCollection)
          }
        }
      }
      // console.log(this.enpiSubmodel)
      return seCollections
    }
  }
}
</script>
