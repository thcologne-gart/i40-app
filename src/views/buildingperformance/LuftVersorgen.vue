<template>
<div>
    <v-card class="mx-auto my-8" elevation="2" max-width="60%">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
        <v-card-subtitle class="mt-3">Luft versorgen</v-card-subtitle>
        <hr>
        <div v-for="funktion in differentGrundfunktionen" :key="funktion">
            <div v-if="funktion === 'LuftBereitstellen'">
                <ShowBACnetProperties :zweiteGrundfunktion="verteilen" funktion="Luft bereitstellen"/>
            </div>
            <div v-if="funktion === 'LuftVerteilen'">
                <ShowBACnetProperties :zweiteGrundfunktion="bereitstellen" funktion="Luft verteilen"/>
            </div>
        </div>
    </v-card>
</div>
</template>

<script>
import ShowBACnetProperties from '@/components/bp/ShowBACnetProperties.vue'

export default {
  components: {
    ShowBACnetProperties
  },
  props: {
    building: Object,
    grundfunktion: Array
  },
  data () {
    return {
      linkToInfos: '/buildingperformance',
      tab: null,
      submodels: []
    }
  },
  computed: {
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.grundfunktion) {
        if (differentGrundfunktionen.includes(this.grundfunktion[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.grundfunktion[element].zweiteGrundfunktionLabel)
        }
      }
      return differentGrundfunktionen
    },
    verteilen () {
      const verteilen = []
      for (const element in this.grundfunktion) {
        if (this.grundfunktion[element].zweiteGrundfunktionLabel === 'LuftVerteilen') {
          verteilen.push({
            name: this.grundfunktion[element].name,
            description: this.grundfunktion[element].description,
            grundfunktionLabel: this.grundfunktion[element].grundfunktionLabel,
            zweiteGrundfunktionLabel: this.grundfunktion[element].zweiteGrundfunktionLabel
          })
        }
      }
      return verteilen
    },
    bereitstellen () {
      const bereitstellen = []
      for (const element in this.grundfunktion) {
        if (this.grundfunktion[element].zweiteGrundfunktionLabel === 'LuftBereitstellen') {
          bereitstellen.push({
            name: this.grundfunktion[element].name,
            description: this.grundfunktion[element].description,
            grundfunktionLabel: this.grundfunktion[element].grundfunktionLabel,
            zweiteGrundfunktionLabel: this.grundfunktion[element].zweiteGrundfunktionLabel
          })
        }
      }
      return bereitstellen
    },
    buildings () {
    // console.log(this.sites)
    // console.log(this.$store.getters.loadedBuildingInformation)
      const buildings = this.$store.getters.loadedBuildingInformation
      console.log(buildings)
      const buildingsArray = []
      for (const item in buildings) {
        buildingsArray.push({
          numberOfSite: buildings[item][2].value,
          buildingNumber: buildings[item][3].value,
          submodelId: buildings[item][4].submodelId,
          buildingDesignation: buildings[item][1].value
        })
      }
      console.log(buildingsArray)
      return buildingsArray
    },

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
    sites () {
      console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    }
  }
}
</script>
