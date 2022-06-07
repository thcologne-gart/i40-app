<template>
    <div>
        <b-card class = "shadow p-3 mb-5 bg-white rounded showBuildingInfo" title="Ausgewählte Energiearten">
            <hr>
            <div id ="displayBuildingInformation">
                <div v-for="item in energyTypes" :key="item[0].key">
                    <div v-if="item[1][0].modelType.name === 'Property'">
                        <div v-if="item[1][0].value === site[4].value && item[2][1].value === building " >
                            <b-row id="ausgewählteEnergieart">
                                <b-col>{{ item[0].submodelName }}</b-col>
                                <b-col>
                                    <b-button id="button-delete" variant = "outline-secondary"><b-icon @click="onDeleteEnergyType(item)" icon="x-circle" scale="1" variant="danger"></b-icon></b-button>
                                </b-col>
                                <b-tooltip target="button-delete" title="Delete"></b-tooltip>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </b-card>
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
    color: #025939;
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
    color: #025939;
    border-bottom-style: solid;
    border-color: #F2F2F2;
    margin-inline: 10%;
    padding-bottom: 20px;
}
.showBuildingInfo {
    margin-top: 20px;
}
</style>
