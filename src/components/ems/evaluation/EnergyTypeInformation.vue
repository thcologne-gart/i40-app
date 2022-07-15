<template>
    <div>
      <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">Ausgewählte Energiearten</v-card-title>
          <hr>
          <div id ="displayBuildingInformation">
              <div v-for="item in energyTypes" :key="item[0].key">
                  <div v-if="item[1][0].modelType.name === 'Property'">
                      <div v-if="item[1][0].value === site[4].value && item[2][1].value === building " >
                          <v-row id="ausgewählteEnergieart">
                              <v-col>{{ item[0].submodelName }}</v-col>
                              <v-col>
                                <v-btn id="button-delete" variant = "outline-secondary"><b-icon @click="onDeleteEnergyType(item)" icon="x-circle" scale="1" variant="danger"></b-icon></v-btn>
                              </v-col>
                              <b-tooltip target="button-delete" title="Delete"></b-tooltip>
                          </v-row>
                      </div>
                  </div>
              </div>
          </div>
      </v-card>
    </div>
</template>

<script>
export default {
  props: {
    site: Array,
    building: Number,
    buildings: Array
  },
  computed: {
    energyTypes () {
      console.log(this.$store.getters.loadedEnergyTypeInformation)
      return this.$store.getters.loadedEnergyTypeInformation
    },
    aas () {
      const aas = this.$store.getters.loadedAas
      return aas
    }
  },

  methods: {
    onDeleteEnergyType (item) {
      const submodelId = item[0].submodelId
      const submodelToDelete = []
      const allAas = this.$store.getters.loadedAasDeletionEnergyTypes
      for (const item in allAas) {
        // console.log(allAas[item])
        for (const submodel in allAas[item].submodels) {
          if (allAas[item].submodels[submodel].value === submodelId) {
            // console.log(allAas[item].submodels[submodel])
            submodelToDelete.push({
              submodelId: allAas[item].submodels[submodel].value,
              aasKey: allAas[item].aasKey,
              submodelKey: submodel
            })
          }
        }
      }
      // console.log(submodelToDelete)

      this.$store.dispatch('deleteEnergyType', {
        id: item[0].key
      })
      this.$store.dispatch('deleteSubmodelFromAas', submodelToDelete)
    }
  }
}
</script>
<style scoped>
#ausgewählteEnergieart {
    margin-top: 5px;
}
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
}
.card-title {
    margin-top: -10px;
    font-size: 20px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#displayBuildingInformation {
    margin-inline: 10%;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
#selected {
    color: #0a322b;
    border-bottom-style: solid;
    border-color: #F2F2F2;
    margin-inline: 10%;
    padding-bottom: 20px;
}
.showBuildingInfo {
    margin-top: 20px;
}
</style>
