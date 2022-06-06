<template>
    <div>
      <EnergeticEvaluation>
        <template v-slot:site="{ site }" >
            <div v-for="site2 in numberofSites" :key="site2">
                <div v-if="site === site2">
                    <SubmodelHeader :submodelName="submodelName" />
                    <EnergySourceSheet :energySourceName="energySourceName" />
                </div>
            </div>
        </template>
      </EnergeticEvaluation>
    </div>
</template>

<script>
import EnergeticEvaluation from '@/views/ems/evaluation/EnergeticEvaluation.vue'
import SubmodelHeader from '@/components/ems/SubmodelHeader.vue'
import EnergySourceSheet from '@/components/ems/evaluation/EnergySourceSheet.vue'

export default {
  components: { EnergeticEvaluation, SubmodelHeader, EnergySourceSheet },
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
    this.energySourceName = { id: 1, name: 'Gasbrennwertkessel', pic: require('@/assets/gasbrennwert.jpg') }
  }
}
</script>
