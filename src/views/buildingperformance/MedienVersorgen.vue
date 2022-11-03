<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="medienVersorgen" :verteilen="verteilen" :bereitstellen="bereitstellen" :entsorgen="entsorgen" :speichern="speichern" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Medien versorgen'
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
    medienVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const medienVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'MedienVersorgen') {
          medienVersorgen.push({
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
      // console.log(wärmeVersorgen)
      return medienVersorgen
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.medienVersorgen) {
        if (differentGrundfunktionen.includes(this.medienVersorgen[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.medienVersorgen[element].zweiteGrundfunktionLabel)
        }
      }
      return differentGrundfunktionen
    },
    verteilen () {
      const verteilen = []
      // console.log(this.medienVersorgen)
      for (const element in this.medienVersorgen) {
        if (this.medienVersorgen[element].zweiteGrundfunktionLabel === 'Verteilen') {
          verteilen.push({
            data: this.medienVersorgen[element].data,
            key: this.medienVersorgen[element].key,
            name: this.medienVersorgen[element].name,
            description: this.medienVersorgen[element].description,
            grundfunktionLabel: this.medienVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.medienVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.medienVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.medienVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.medienVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.medienVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.medienVersorgen[element].datenpunktLabel,
            datenpunktScore: this.medienVersorgen[element].datenpunktScore
          })
        }
      }
      return verteilen
    },
    bereitstellen () {
      const erzeugen = []
      for (const element in this.medienVersorgen) {
        if (this.medienVersorgen[element].zweiteGrundfunktionLabel === 'Bereitstellen') {
          erzeugen.push({
            data: this.medienVersorgen[element].data,
            key: this.medienVersorgen[element].key,
            name: this.medienVersorgen[element].name,
            description: this.medienVersorgen[element].description,
            grundfunktionLabel: this.medienVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.medienVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.medienVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.medienVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.medienVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.medienVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.medienVersorgen[element].datenpunktLabel,
            datenpunktScore: this.medienVersorgen[element].datenpunktScore
          })
        }
      }
      return erzeugen
    },
    speichern () {
      const speichern = []
      for (const element in this.medienVersorgen) {
        if (this.medienVersorgen[element].zweiteGrundfunktionLabel === 'Speichern') {
          speichern.push({
            data: this.medienVersorgen[element].data,
            key: this.medienVersorgen[element].key,
            name: this.medienVersorgen[element].name,
            description: this.medienVersorgen[element].description,
            grundfunktionLabel: this.medienVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.medienVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.medienVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.medienVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.medienVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.medienVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.medienVersorgen[element].datenpunktLabel,
            datenpunktScore: this.medienVersorgen[element].datenpunktScore
          })
        }
      }
      return speichern
    },
    entsorgen () {
      const entsorgen = []
      for (const element in this.medienVersorgen) {
        if (this.medienVersorgen[element].zweiteGrundfunktionLabel === 'Entsorgen') {
          entsorgen.push({
            data: this.medienVersorgen[element].data,
            key: this.medienVersorgen[element].key,
            name: this.medienVersorgen[element].name,
            description: this.medienVersorgen[element].description,
            grundfunktionLabel: this.medienVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.medienVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.medienVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.medienVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.medienVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.medienVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.medienVersorgen[element].datenpunktLabel,
            datenpunktScore: this.medienVersorgen[element].datenpunktScore
          })
        }
      }
      return entsorgen
    }
  }
}
</script>
