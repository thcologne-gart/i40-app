<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="sichern" :brandschutzklappe="brandschutzklappe" :brandmeldeanlage="brandmeldeanlage"
    :rauchmeldeanlage="rauchmeldeanlage" :sichernAllgemein="sichernAllgemein" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Sichern'
    }
  },
  computed: {
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
    },
    sichern () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const sichern = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        if (loadedBacnetData[data][key].grundfunktionLabel === 'Sichern') {
          sichern.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      return sichern
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.sichern) {
        if (differentGrundfunktionen.includes(this.sichern[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.sichern[element].zweiteGrundfunktionLabel)
        }
      }
      console.log(differentGrundfunktionen)
      return differentGrundfunktionen
    },
    brandschutzklappe () {
      const bsk = []
      for (const element in this.sichern) {
        if (this.sichern[element].zweiteGrundfunktionLabel === 'Brandschutzklappe') {
          bsk.push({
            data: this.sichern[element].data,
            key: this.sichern[element].key,
            name: this.sichern[element].name,
            description: this.sichern[element].description,
            grundfunktionLabel: this.sichern[element].grundfunktionLabel,
            grundfunktionScore: this.sichern[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.sichern[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.sichern[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.sichern[element].dritteEbeneLabel,
            dritteEbeneScore: this.sichern[element].dritteEbeneScore,
            datenpunktLabel: this.sichern[element].datenpunktLabel,
            datenpunktScore: this.sichern[element].datenpunktScore
          })
        }
      }
      console.log(bsk)
      return bsk
    },
    brandmeldeanlage () {
      const bma = []
      for (const element in this.sichern) {
        if (this.sichern[element].zweiteGrundfunktionLabel === 'Brandmeldeanlage') {
          bma.push({
            data: this.sichern[element].data,
            key: this.sichern[element].key,
            name: this.sichern[element].name,
            description: this.sichern[element].description,
            grundfunktionLabel: this.sichern[element].grundfunktionLabel,
            grundfunktionScore: this.sichern[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.sichern[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.sichern[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.sichern[element].dritteEbeneLabel,
            dritteEbeneScore: this.sichern[element].dritteEbeneScore,
            datenpunktLabel: this.sichern[element].datenpunktLabel,
            datenpunktScore: this.sichern[element].datenpunktScore
          })
        }
      }
      return bma
    },
    rauchmeldeanlage () {
      const rma = []
      for (const element in this.sichern) {
        if (this.sichern[element].zweiteGrundfunktionLabel === 'Rauchmeldeanlage') {
          rma.push({
            data: this.sichern[element].data,
            key: this.sichern[element].key,
            name: this.sichern[element].name,
            description: this.sichern[element].description,
            grundfunktionLabel: this.sichern[element].grundfunktionLabel,
            grundfunktionScore: this.sichern[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.sichern[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.sichern[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.sichern[element].dritteEbeneLabel,
            dritteEbeneScore: this.sichern[element].dritteEbeneScore,
            datenpunktLabel: this.sichern[element].datenpunktLabel,
            datenpunktScore: this.sichern[element].datenpunktScore
          })
        }
      }
      return rma
    },
    sichernAllgemein () {
      const sAllgemein = []
      for (const element in this.sichern) {
        if (this.sichern[element].zweiteGrundfunktionLabel === 'SichernAllgemein') {
          sAllgemein.push({
            data: this.sichern[element].data,
            key: this.sichern[element].key,
            name: this.sichern[element].name,
            description: this.sichern[element].description,
            grundfunktionLabel: this.sichern[element].grundfunktionLabel,
            grundfunktionScore: this.sichern[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.sichern[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.sichern[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.sichern[element].dritteEbeneLabel,
            dritteEbeneScore: this.sichern[element].dritteEbeneScore,
            datenpunktLabel: this.sichern[element].datenpunktLabel,
            datenpunktScore: this.sichern[element].datenpunktScore
          })
        }
      }
      return sAllgemein
    }
  }
}
</script>
