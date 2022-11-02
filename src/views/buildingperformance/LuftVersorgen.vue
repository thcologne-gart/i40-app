<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="luftVersorgen" :verteilen="verteilen" :bereitstellen="bereitstellen" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Luft versorgen'
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
    luftVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const luftVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        if (loadedBacnetData[data][key].grundfunktionLabel === 'LuftVersorgen') {
          luftVersorgen.push({
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
      return luftVersorgen
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.luftVersorgen) {
        if (differentGrundfunktionen.includes(this.luftVersorgen[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.luftVersorgen[element].zweiteGrundfunktionLabel)
        }
      }
      console.log(differentGrundfunktionen)
      return differentGrundfunktionen
    },
    verteilen () {
      const verteilen = []
      for (const element in this.luftVersorgen) {
        if (this.luftVersorgen[element].zweiteGrundfunktionLabel === 'LuftVerteilen') {
          verteilen.push({
            data: this.luftVersorgen[element].data,
            key: this.luftVersorgen[element].key,
            name: this.luftVersorgen[element].name,
            description: this.luftVersorgen[element].description,
            grundfunktionLabel: this.luftVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.luftVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.luftVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.luftVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.luftVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.luftVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.luftVersorgen[element].datenpunktLabel,
            datenpunktScore: this.luftVersorgen[element].datenpunktScore
          })
        }
      }
      console.log(verteilen)
      return verteilen
    },
    bereitstellen () {
      const bereitstellen = []
      for (const element in this.luftVersorgen) {
        if (this.luftVersorgen[element].zweiteGrundfunktionLabel === 'LuftBereitstellen') {
          bereitstellen.push({
            data: this.luftVersorgen[element].data,
            key: this.luftVersorgen[element].key,
            name: this.luftVersorgen[element].name,
            description: this.luftVersorgen[element].description,
            grundfunktionLabel: this.luftVersorgen[element].grundfunktionLabel,
            grundfunktionScore: this.luftVersorgen[element].grundfunktionScore,
            zweiteGrundfunktionLabel: this.luftVersorgen[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: this.luftVersorgen[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: this.luftVersorgen[element].dritteEbeneLabel,
            dritteEbeneScore: this.luftVersorgen[element].dritteEbeneScore,
            datenpunktLabel: this.luftVersorgen[element].datenpunktLabel,
            datenpunktScore: this.luftVersorgen[element].datenpunktScore
          })
        }
      }
      return bereitstellen
    }
  }
}
</script>
