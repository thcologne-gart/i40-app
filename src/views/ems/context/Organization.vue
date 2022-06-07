<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
            <OrganizationInformation />
      </EmsGrid>
    </div>
</template>

<script>
import OrganizationInformation from '@/components/ems/context/OrganizationInformation.vue'
import EmsChapter from '@/components/ems/EmsChapter.vue'
import EmsGrid from '@/components/ems/EmsGrid.vue'

export default {
  name: 'Organization',
  data () {
    return {
      submodels: []
    }
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
  components: { OrganizationInformation, EmsChapter, EmsGrid },
  created () {
    this.submodelName = 'Unternehmen'
    this.submodels = [
      { id: 1, name: 'Unternehmen', link: '/context/organization' },
      { id: 2, name: 'Standorte', link: '/context/sites' },
      { id: 3, name: 'Gebäude', link: '/context/buildings' }
    ]
    this.emsChapter = { name: 'Kontext', link: '/contextstart' }
  }
}
</script>
