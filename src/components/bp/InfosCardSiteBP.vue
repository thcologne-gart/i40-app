<template v-slot:site="{ site }" >
  <div>
    <div v-for="site2 in numberofSites" :key="site2">
      <div v-if="site[4].value === site2">
        <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
            <v-card-title id="card-title">{{ site[1].value }}</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
/*
async function query (data) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/mboth/klassifizierungGrundfunktionen',
    {
      headers: { Authorization: 'Bearer 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' },
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
  const result = await response.json()
  return result
}

// query({ 'inputs': 'I like you. I love you' }).then((response) => {
query({ inputs: 'Heizkreis vorlauftemperatur' }).then((response) => {
  console.log(JSON.stringify(response))
})
*/
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
      const numberOfSites = [1]
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(typeof numberSites)
        }
        // console.log(numberSites)
        let i
        for (i = 1; i < numberSites; i++) {
          numberOfSites.push(i + 1)
        }
        // console.log(numberOfSites)
      }
      return numberOfSites
    }
  }
}
</script>
