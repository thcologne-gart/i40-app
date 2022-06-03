<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
        <b-tabs content-class="mt-3" id ="nav-tabs">
            <div v-if="sites === null">
                <b-tab title= "Standort" v-for="site in numberofSites" :key="site">
                    <slot name="site" v-bind:site="site">Platzhalter</slot>
                </b-tab>
            </div>
            <div v-else-if="sites.length != numberofSites.length">
                <b-tab title= "Standort" v-for="site in numberofSites" :key="site">
                    <slot name="site" v-bind:site="site">Platzhalter</slot>
                </b-tab>
            </div>
            <div v-else>
                <div v-for="site in numberofSites" :key="site">
                    <b-tab v-bind:title=sites[site][1].value >
                        <slot name="site" v-bind:site="site">Platzhalter</slot>
                    </b-tab>
                </div>
            </div>
        </b-tabs>
      </EmsGrid>
    </div>
</template>

<script>
import EmsChapter from '@/components/EmsChapter.vue'
import EmsGrid from '@/components/EmsGrid.vue'

export default {
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
      { id: 1, name: 'Unternehmen', link: '/context/organization' },
      { id: 2, name: 'Standorte', link: '/context/sites' },
      { id: 3, name: 'Gebäude', link: '/context/buildings' }
    ]
    this.emsChapter = { name: 'Kontext', link: '/context' }
  }
}
</script>
