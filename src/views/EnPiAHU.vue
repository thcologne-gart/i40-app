<template>
    <div>
      <EnergyPerformanceIndicators>
        <template v-slot:site="{ site }">
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :submodelName="submodelName" />
                    <EnPis :submodelId ="submodelId" />
                </div>
            </div>
        </template>
      </EnergyPerformanceIndicators>
    </div>
</template>

<script>
import EnergyPerformanceIndicators from '@/views/EnergyPerformanceIndicators.vue'
import SubmodelHeader from '@/components/SubmodelHeader.vue'
import EnPis from '@/components/EnPis.vue'

export default {
  components: { EnergyPerformanceIndicators, SubmodelHeader, EnPis },
  data () {
    return {}
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
    this.submodelName = 'Energieleistungskennzahlen Lüftung'
    this.submodelId = 'submodel/enpi-air'
  }
}
</script>
