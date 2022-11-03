<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="kälteVersorgen" :verteilen="verteilen" :erzeugen="erzeugen" :speichern="speichern" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Kälte versorgen'
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
    kälteVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const kälteVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'KaelteVersorgen') {
          kälteVersorgen.push({
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
      return kälteVersorgen
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.kälteVersorgen) {
        if (differentGrundfunktionen.includes(this.kälteVersorgen[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.kälteVersorgen[element].zweiteGrundfunktionLabel)
        }
      }
      return differentGrundfunktionen
    },
    verteilen () {
      const verteilen = []
      // console.log(this.kälteVersorgen)
      for (const element in this.kälteVersorgen) {
        if (this.kälteVersorgen[element].zweiteGrundfunktionLabel === 'Verteilen') {
          verteilen.push({
            data: this.kälteVersorgen[element].data,
            key: this.kälteVersorgen[element].key,
            name: this.kälteVersorgen[element].name,
            description: this.kälteVersorgen[element].description,
            grundfunktionLabel: this.kälteVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.kälteVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.kälteVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.kälteVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.kälteVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.kälteVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.kälteVersorgen[element].datenpunktLabel,
            datenpunktScore: this.kälteVersorgen[element].datenpunktScore
          })
        }
      }
      return verteilen
    },
    erzeugen () {
      const erzeugen = []
      for (const element in this.kälteVersorgen) {
        if (this.kälteVersorgen[element].zweiteGrundfunktionLabel === 'Erzeugen') {
          erzeugen.push({
            data: this.kälteVersorgen[element].data,
            key: this.kälteVersorgen[element].key,
            name: this.kälteVersorgen[element].name,
            description: this.kälteVersorgen[element].description,
            grundfunktionLabel: this.kälteVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.kälteVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.kälteVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.kälteVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.kälteVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.kälteVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.kälteVersorgen[element].datenpunktLabel,
            datenpunktScore: this.kälteVersorgen[element].datenpunktScore
          })
        }
      }
      return erzeugen
    },
    speichern () {
      const speichern = []
      for (const element in this.kälteVersorgen) {
        if (this.kälteVersorgen[element].zweiteGrundfunktionLabel === 'Speichern') {
          speichern.push({
            data: this.kälteVersorgen[element].data,
            key: this.kälteVersorgen[element].key,
            name: this.kälteVersorgen[element].name,
            description: this.kälteVersorgen[element].description,
            grundfunktionLabel: this.kälteVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.kälteVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.kälteVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.kälteVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.kälteVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.kälteVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.kälteVersorgen[element].datenpunktLabel,
            datenpunktScore: this.kälteVersorgen[element].datenpunktScore
          })
        }
      }
      return speichern
    }
  }
}
</script>
