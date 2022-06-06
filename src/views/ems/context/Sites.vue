<template>
    <div>
      <OrganizationContext>
          <template v-slot:site="{ site }" >
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeaderFirst :submodelName="submodelName" />
                    <div v-if="sites === null">
                      <AddSiteInformation :site="site"/>
                    </div>
                    <div v-else-if="site2 >= sites.length">
                      <AddSiteInformation :site="site" />
                    </div>
                    <div v-for="site in sites" :key="site[2].value">
                      <div v-if="site[4].value === site2">
                        <SiteInformation :site="site" />
                      </div>
                    </div>
                </div>
            </div>
          </template>
      </OrganizationContext>
    </div>
</template>

<script>
import OrganizationContext from '@/views/ems/context/OrganizationContext.vue'
import SubmodelHeaderFirst from '@/components/ems/SubmodelHeaderFirst.vue'
import SiteInformation from '@/components/ems/context/SiteInformation.vue'
import AddSiteInformation from '@/components/ems/context/AddSiteInformation.vue'

export default {
  components: { OrganizationContext, SubmodelHeaderFirst, SiteInformation, AddSiteInformation },
  data () {
    return {}
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      // console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(numberSites)
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
    this.submodelName = 'Standorte'
  }
}
</script>
