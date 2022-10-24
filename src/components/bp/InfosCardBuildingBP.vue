<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
        <b-button class="mt-3" variant="outline-secondary" block @click="query(bacnetData[114])">Save</b-button>
    </v-card>
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

query({ inputs: this.bacnetData[0] }).then((response) => {
// query({ inputs: 'Heizkreis vorlauftemperatur' }).then((response) => {
  console.log(JSON.stringify(response))
  console.log(this.bacnetData[0])
})
*/
export default {
  props: {
    building: Object
  },
  computed: {
    bacnetData () {
      console.log(this.$store.getters.loadedBACnet)
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const bacnetDataArray = []
      for (const data in loadedBacnetData) {
        // const str = 'Hello' + ' ' + 'World'
        const input = loadedBacnetData[data].text + ',' + loadedBacnetData[data].name
        // console.log(input)
        bacnetDataArray.push({
          name: loadedBacnetData[data].name,
          description: loadedBacnetData[data].text,
          input: input
        })
      }
      console.log(bacnetDataArray)
      return bacnetDataArray
    }
  },
  methods: {
    async query (data) {
      console.log(data.input)
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mboth/klassifizierungGrundfunktionen',
        {
          headers: { Authorization: 'Bearer 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' },
          method: 'POST',
          body: JSON.stringify(data.input)
        }
      )
      const result = await response.json()
      console.log(result)
      return result
    }
  }
}
</script>
