<template>
    <div>
      <EnergeticEvaluation>
        <template v-slot:site="{ site }" >
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :site ="site2" :submodelName="submodelName" :numberOfBuildings="numberOfBuildings">
                        <template v-slot:building="{ building }">
                            <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
                            <v-card-title id="card-title">Energiearten</v-card-title>
                            <hr>
                              <v-container>
                                <v-row>
                                    <v-col :key="energyType.id" v-for="energyType in energyTypes">
                                        <!--<EnergyTypeCard :energyType="energyType" @add-new-energy-type=addEnergyType @add-submodel-ref-aas=addAasRef />//-->
                                        <EnergyTypeCard :energyType="energyType" :site ="site" :numberOfBuildings="numberOfBuildings" :buildingNumber="building" :buildings="buildings" />
                                    </v-col>
                                </v-row>
                              </v-container>
                            </v-card>
                            <div v-for="site in sites" :key="site.value">
                            <!--<div v-for="site in sites" :key="site[2].value">-->
                                <div v-if="site[4].value === site2">
                                    <EnergyTypeInformation :site="site" :building="building" :buildings="buildings" />
                                </div>
                            </div>
                        </template>
                    </SubmodelHeader>
                </div>
            </div>
        </template>
      </EnergeticEvaluation>
    </div>
</template>

<script>
import EnergeticEvaluation from '@/views/ems/evaluation/EnergeticEvaluation.vue'
import EnergyTypeCard from '@/components/ems/evaluation/EnergyTypeCard.vue'
import SubmodelHeader from '@/components/ems/SubmodelHeader.vue'
import EnergyTypeInformation from '@/components/ems/evaluation/EnergyTypeInformation.vue'
// import GetSubmodel from '@/components/GetSubmodel.vue'

export default {
  // components: { EnergeticEvaluation, EnergyTypeCard, SubmodelHeader, GetSubmodel },
  components: { EnergeticEvaluation, EnergyTypeCard, SubmodelHeader, EnergyTypeInformation },
  data () {
    return {
      // selectedEnergyTypes: [],
      submodelsJson: [],
      aasRefs: [],
      aasJson: [],
      submodelsInAas: []
    }
  },
  computed: {
    /*
    energyTypess () {
      // console.log(this.$store.getters.loadedEnergyTypes)
      return this.$store.getters.loadedEnergyTypes
    },
    */
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      // console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      // console.log(numberOfSites)
      return numberOfSites
    },

    numberOfBuildings () {
      const loadSiteInfos = this.$store.getters.loadedSiteInformation
      // console.log(typeof loadSiteInfos)
      // console.log(loadSiteInfos)
      // console.log(this.site)
      const numberBuildings = []
      for (const item in loadSiteInfos) {
        // console.log(loadSiteInfos[item])
        // console.log(item)
        numberBuildings.push({
          key: loadSiteInfos[item][5].key,
          numberOfSite: loadSiteInfos[item][4].value,
          numberOfBuildings: loadSiteInfos[item][3].value
        })
      }
      // console.log(numberBuildings)
      return numberBuildings
    },

    sites () {
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    },
    buildings () {
      // console.log(this.sites)
      // console.log(this.$store.getters.loadedBuildingInformation)
      const buildings = this.$store.getters.loadedBuildingInformation
      // console.log(buildings)
      const buildingsArray = []
      for (const item in buildings) {
        buildingsArray.push({
          numberOfSite: buildings[item][2].value,
          buildingNumber: buildings[item][3].value,
          submodelId: buildings[item][4].submodelId
        })
      }
      // console.log(buildingsArray)
      return buildingsArray
    },
    selectSubmodels: function () {
      for (const i of this.submodels) {
        console.log(i)
      }
      return this.submodels
    }
  },
  methods: {
    onDeleteEnergyType (id) {
      console.log(id)
      this.$store.dispatch('deleteEnergyType', {
        id: id
      })
    }
    /*
    async deleteEnergyType (id) {
      // console.log(id)
      // const tests = this.aasJson[0].submodels
      // console.log(`http://localhost:5000/submodels/${tests}`)
      if (confirm('Sind Sie sicher, dass sie die Energieart löschen möchten?')) {
        const res = await fetch(`http://localhost:5000/submodels/${id}`, {
          method: 'DELETE'
        })

        res.status === 200 ? (this.submodelsJson = this.submodelsJson.filter((submodelJson) => submodelJson.id !== id)) : alert('Fehler beim löschen des Energietypen')
      }
    },
    async fetchTasks () {
      const responseJson = await fetch('http://localhost:5000/submodels')

      const loadedSubmodels = await responseJson.json()
      // console.log(loadedSubmodels)
      return loadedSubmodels
    },
    async addEnergyType (newEnergy) {
      console.log(newEnergy)

      const res = await fetch('http://localhost:5000/submodels', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify((newEnergy))
      })

      const data = await res.json()

      // this.selectedEnergyTypes = [...this.selectedEnergyTypes, data]
      this.submodelsJson = [...this.submodelsJson, data]

      // console.log(this.selectedEnergyTypes)
    },
    async fetchAas () {
      const responseJson = await fetch('http://localhost:5000/assetAdministrationShells')

      const loadedAas = await responseJson.json()
      console.log(loadedAas)
      const registeredSubmodels = loadedAas[0].submodels
      // console.log(registeredSubmodels)
      return [registeredSubmodels, loadedAas]
    },
    async addAasRef (aasRef) {
      // this.submodelsInAas = [...this.submodelsInAas, aasRef]
      // this.aasJson[0].submodels = this.submodelsInAas
      // const uploadedSubmodels = this.aasJson[0].submodels
      // const updateJson = this.aasJson
      // console.log(updateJson)
      const res = await fetch('http://localhost:5000/assetAdministrationShells', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify((aasRef))
      })

      const data = await res.json()

      // this.selectedEnergyTypes = [...this.selectedEnergyTypes, data]
      this.aasRefs = [...this.aasRefs, data]
    }
    // mit der 20000 wird der alte id eintrag (hard reinegschrieben) überschreiben und mit dem Inhalt aus uploadedSubmodels ersetzt. wie kann ich das für den ganzen teil submodels machen?
    // const res = await fetch(`http://localhost:5000/assetAdministrationShells/${20000}`, {
    // method: 'PUT',
    // headers: {
    // 'Content-type': 'application/json'
    // },
    // body: JSON.stringify((uploadedSubmodels))
    // })
    // const data = await res.json()
    // this.aasRefs = [...this.aasRefs, data]
    */
  },
  async created () {
    this.energyTypes = [
      { id: 'submodel/energyTypeElectricity', name: 'Strom', pic: require('@/assets/electricity.svg'), nameForSubmodel: 'Energieart Strom', idShortCD: 'SubmodelEnergyTypeElectricity', idEnpi: 'submodel/enpiElectricity', nameEnpi: 'Strom', nameForSubmodelEnpi: 'EnPis Strom', idShortCDEnpi: 'SubmodelEnpiElectricity' },
      { id: 'submodel/energyTypeHeat', name: 'Wärme', pic: require('@/assets/heat.svg'), nameForSubmodel: 'Energieart Wärme', idShortCD: 'SubmodelEnergyTypeHeat', idEnpi: 'submodel/enpiHeat', nameEnpi: 'Wärme', nameForSubmodelEnpi: 'EnPis Wärme', idShortCDEnpi: 'SubmodelEnpiHeat' },
      { id: 'submodel/energyTypeGas', name: 'Gas', pic: require('@/assets/gas.svg'), nameForSubmodel: 'Energieart Gas', idShortCD: 'SubmodelEnergyTypeGas', idEnpi: 'submodel/enpiGas', nameEnpi: 'Gas', nameForSubmodelEnpi: 'EnPis Gas', idShortCDEnpi: 'SubmodelEnpiGas' },
      { id: 'submodel/energyTypeOil', name: 'Öl', pic: require('@/assets/oil.svg'), nameForSubmodel: 'Energieart Öl', idShortCD: 'SubmodelEnergyTypeOil', idEnpi: 'submodel/enpiOil', nameEnpi: 'Öl', nameForSubmodelEnpi: 'EnPis Öl', idShortCDEnpi: 'SubmodelEnpiOil' },
      { id: 'submodel/energyTypeBiomass', name: 'Biomasse', pic: require('@/assets/biomass.svg'), nameForSubmodel: 'Energieart Biomasse', idShortCD: 'SubmodelEnergyTypeBiomass', idEnpi: 'submodel/enpiBiomass', nameEnpi: 'Biomasse', nameForSubmodelEnpi: 'EnPi Biomasse', idShortCDEnpi: 'SubmodelEnpiBiomass' },
      { id: 'submodel/energyTypePellets', name: 'Holzpellets', pic: require('@/assets/pellets.svg'), nameForSubmodel: 'Energieart Holzpellets', idShortCD: 'SubmodelEnergyTypePellets', idEnpi: 'submodel/enpiPellets', nameEnpi: 'Holzpellets', nameForSubmodelEnpi: 'EnPis Holzpellets', idShortCDEnpi: 'SubmodelEnpiPellets' },
      { id: 'submodel/energyTypeSteam', name: 'Dampf', pic: require('@/assets/steam.svg'), nameForSubmodel: 'Energieart Danpf', idShortCD: 'SubmodelEnergyTypeSteam', idEnpi: 'submodel/enpiSteam', nameEnpi: 'Dampf', nameForSubmodelEnpi: 'EnPis Dampf', idShortCDEnpi: 'SubmodelEnpiSteam' }
    ]
    this.submodelName = 'Energieart'
    // this.submodelsJson = await this.fetchTasks()
    // const test = await this.fetchAas()
    // this.submodelsInAas = test[0]
    // this.aasJson = test[1]
  }
}
</script>

<style scoped>
.card-title {
    margin-top: -10px;
    font-size: 20px;
}
#selected {
    margin-top: 20px;
    color: #0a322b;
    border-bottom-style: solid;
    border-color: #F2F2F2;
    margin-inline: 10%;
}
#ausgewählteEnergieart {
    border-bottom-style: solid;
    border-color: #F2F2F2;
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-inline: 10%;
}
</style>
