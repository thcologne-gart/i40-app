<template v-slot:site="{ site }" >
  <div>
    <div v-for="site2 in numberofSites" :key="site2">
      <div v-if="site[4].value === site2">
        <v-card>
            <v-card-title>{{ site[1].value }}</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    site: Array
  },
  computed: {
    numberofSites () {
      console.log(this.site)
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
    }
  }
}
</script>
