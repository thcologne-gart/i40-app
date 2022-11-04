<template>
  <div>
    <ZweiteGrundfunktionGrid :sites="sites" :buildings="buildings" :differentGrundfunktionen="differentGrundfunktionen" :grundfunktion="andereAnlagen" :grundfunktionString="grundfunktionString">
    </ZweiteGrundfunktionGrid>
  </div>
</template>

<script>
import ZweiteGrundfunktionGrid from '@/components/bp/ZweiteGrundfunktionGrid.vue'

export default {
  components: { ZweiteGrundfunktionGrid },
  data () {
    return {
      grundfunktionString: 'Andere Anlagen'
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
    andereAnlagen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const andereAnlagen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'AndereAnlagen') {
          andereAnlagen.push({
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
      return andereAnlagen
    },
    differentGrundfunktionen () {
      const differentGrundfunktionen = []
      for (const element in this.andereAnlagen) {
        if (differentGrundfunktionen.includes(this.andereAnlagen[element].zweiteGrundfunktionLabel)) {
          continue
        } else {
          differentGrundfunktionen.push(this.andereAnlagen[element].zweiteGrundfunktionLabel)
        }
      }
      return differentGrundfunktionen
    }
  }
}
</script>
