<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
        <EnergySourceSheet :energySourceName="energySourceName" />
      </EmsGrid>
    </div>
</template>

<script>
import EmsChapter from '@/components/EmsChapter.vue'
import EmsGrid from '@/components/EmsGrid.vue'
import EnergySourceSheet from '@/components/EnergySourceSheet.vue'

export default {
  components: { EmsGrid, EmsChapter, EnergySourceSheet },
  props: {
    energySource: Object,
    energySourceGroup: Object
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      console.log(numberOfSites)
      return numberOfSites
    }
  },
  created () {
    this.submodelName = 'Energieträger'
    this.submodels = [
      { id: 1, name: 'Energieart', link: '/energetic-evaluation/energy-type' },
      { id: 2, name: 'Energieeinsatz', link: '/energetic-evaluation/energy-source' },
      { id: 3, name: 'Energieverbrauch', link: '/energetic-evaluation/energy-consumption' },
      { id: 4, name: 'SEU', link: '/energetic-evaluation/seu' }
    ]
    this.emsChapter = { name: 'Energetische Bewertung', link: '/energetic-evaluation' }
    this.energySourceName = { id: 1, name: 'Erdwärmepumpe', pic: require('../assets/erdwärmepumpe.jpg') }
  }
}
</script>
