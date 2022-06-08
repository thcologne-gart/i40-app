<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
          <b-tabs content-class="mt-3" id ="nav-tabs">
            <div v-for="site in numberofSites" :key="site">
                <b-tab v-bind:title=sites[site][1].value >
                    <slot name="site" v-bind:site="site">Platzhalter</slot>
                </b-tab>
            </div>
        </b-tabs>
      </EmsGrid>
    </div>
</template>

<script>
import EmsChapter from '@/components/ems/EmsChapter.vue'
import EmsGrid from '@/components/ems/EmsGrid.vue'

export default {
  name: 'EnergetyPerformanceIndicators',
  components: { EmsChapter, EmsGrid },
  data () {
    return {
      submodels: []
    }
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(this.$store.getters.loadedSiteInformation[0][0].value)
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
    },
    sites () {
      console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    }
  },
  created () {
    this.submodels = [
      { id: 1, name: 'EnPis Heizung', link: '/indicators-start/heating' },
      { id: 2, name: 'EnPis Lüftung', link: '/indicators-start/air' },
      { id: 3, name: 'EnPis Strom', link: '/indicators-start/electricity' }
    ]
    this.emsChapter = { name: 'Energieleistungskennzahlen', link: '/indicators-start' }
  }
}
</script>
