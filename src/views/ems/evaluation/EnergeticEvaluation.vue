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
  name: 'EnergeticEvaluation',
  components: { EmsChapter, EmsGrid },
  data () {
    return {
      submodels: []
    }
  },
  computed: {
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
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    }
  },
  created () {
    this.submodels = [
      { id: 1, name: 'Energieart', link: '/evaluation-start/energy-type' },
      { id: 2, name: 'Energieeinsatz', link: '/evaluation-start/energy-source' },
      { id: 3, name: 'Energieverbrauch', link: '/evaluation-start/energy-consumption' },
      { id: 4, name: 'SEU', link: '/evaluation-start/seu' }
    ]

    /*
    this.submodels = [
      { id: 1, name: 'Energy use and consumption', link: '/energetic-evaluation/energy-type' },
      { id: 2, name: 'Significant energy uses', link: '/energetic-evaluation/energy-source' },
      { id: 3, name: 'Energy savings opportunities', link: '/energetic-evaluation/energy-consumption' },
      { id: 4, name: 'Energy data collection', link: '/energetic-evaluation/seu' },
      { id: 4, name: 'Documented information', link: '/energetic-evaluation/seu' }
    ]
    */
    this.emsChapter = { name: 'Energetische Bewertung', link: '/evaluation-start' }
  }
}
</script>
