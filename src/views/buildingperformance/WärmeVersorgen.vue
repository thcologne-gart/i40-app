<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="wärmeVersorgen" :verteilen="verteilen" :erzeugen="erzeugen" :speichern="speichern" :beziehen="beziehen" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Wärme versorgen'
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
          numberOfSite: buildings[item][7].value,
          buildingNumber: buildings[item][8].value,
          submodelId: buildings[item][9].submodelId,
          buildingDesignation: buildings[item][6].value
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
    wärmeVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const wärmeVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'WaermeVersorgen') {
          wärmeVersorgen.push({
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
      return wärmeVersorgen
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.wärmeVersorgen) {
        if (differentGrundfunktionen.includes(this.wärmeVersorgen[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.wärmeVersorgen[element].zweiteGrundfunktionLabel)
        }
      }
      return differentGrundfunktionen
    },
    verteilen () {
      const verteilen = []
      // console.log(this.wärmeVersorgen)
      for (const element in this.wärmeVersorgen) {
        if (this.wärmeVersorgen[element].zweiteGrundfunktionLabel === 'Verteilen') {
          verteilen.push({
            data: this.wärmeVersorgen[element].data,
            key: this.wärmeVersorgen[element].key,
            name: this.wärmeVersorgen[element].name,
            description: this.wärmeVersorgen[element].description,
            grundfunktionLabel: this.wärmeVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.wärmeVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.wärmeVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.wärmeVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.wärmeVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.wärmeVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.wärmeVersorgen[element].datenpunktLabel,
            datenpunktScore: this.wärmeVersorgen[element].datenpunktScore
          })
        }
      }
      return verteilen
    },
    erzeugen () {
      const erzeugen = []
      for (const element in this.wärmeVersorgen) {
        if (this.wärmeVersorgen[element].zweiteGrundfunktionLabel === 'Erzeugen') {
          erzeugen.push({
            data: this.wärmeVersorgen[element].data,
            key: this.wärmeVersorgen[element].key,
            name: this.wärmeVersorgen[element].name,
            description: this.wärmeVersorgen[element].description,
            grundfunktionLabel: this.wärmeVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.wärmeVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.wärmeVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.wärmeVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.wärmeVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.wärmeVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.wärmeVersorgen[element].datenpunktLabel,
            datenpunktScore: this.wärmeVersorgen[element].datenpunktScore
          })
        }
      }
      return erzeugen
    },
    beziehen () {
      const beziehen = []
      for (const element in this.wärmeVersorgen) {
        if (this.wärmeVersorgen[element].zweiteGrundfunktionLabel === 'Beziehen') {
          beziehen.push({
            data: this.wärmeVersorgen[element].data,
            key: this.wärmeVersorgen[element].key,
            name: this.wärmeVersorgen[element].name,
            description: this.wärmeVersorgen[element].description,
            grundfunktionLabel: this.wärmeVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.wärmeVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.wärmeVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.wärmeVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.wärmeVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.wärmeVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.wärmeVersorgen[element].datenpunktLabel,
            datenpunktScore: this.wärmeVersorgen[element].datenpunktScore
          })
        }
      }
      return beziehen
    },
    speichern () {
      const speichern = []
      for (const element in this.wärmeVersorgen) {
        if (this.wärmeVersorgen[element].zweiteGrundfunktionLabel === 'Speichern') {
          speichern.push({
            data: this.wärmeVersorgen[element].data,
            key: this.wärmeVersorgen[element].key,
            name: this.wärmeVersorgen[element].name,
            description: this.wärmeVersorgen[element].description,
            grundfunktionLabel: this.wärmeVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.wärmeVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.wärmeVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.wärmeVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.wärmeVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.wärmeVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.wärmeVersorgen[element].datenpunktLabel,
            datenpunktScore: this.wärmeVersorgen[element].datenpunktScore
          })
        }
      }
      return speichern
    }
  }
}
</script>
