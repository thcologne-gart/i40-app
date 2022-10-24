<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
        <b-button class="my-3" variant="outline-secondary" block @click="query(bacnetData)">Hinzufügen Automationsstation</b-button>
        <div>{{ numberOfGrundfunktionen }}</div>
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
  /*
  data () {
    return {
      grundfunktionen: []
    }
  },
  */
  computed: {
    bacnetData () {
      console.log(this.$store.getters.loadedBACnet)
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const bacnetDataArray = []
      for (const data in loadedBacnetData) {
        // const str = 'Hello' + ' ' + 'World'
        // console.log(Object.keys(loadedBacnetData[data]))
        const keys = [Object.keys(loadedBacnetData[data])]
        // console.log(keys)
        const key = keys[0][0]
        // console.log(key)
        const input = loadedBacnetData[data].text + ',' + loadedBacnetData[data].name
        // console.log(loadedBacnetData[data][key])
        bacnetDataArray.push({
          name: loadedBacnetData[data].name,
          description: loadedBacnetData[data].text,
          input: input,
          grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel
        })
      }
      console.log(bacnetDataArray)
      return bacnetDataArray
    },
    numberOfGrundfunktionen () {
      const grundfunktionen = []
      console.log(this.$store.getters.loadedBACnet)
      const loadedBacnetData = this.$store.getters.loadedBACnet
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        if (grundfunktionen.includes(loadedBacnetData[data][key].grundfunktionLabel) || typeof loadedBacnetData[data][key].grundfunktionLabel === 'undefined') {
          continue
        } else {
          grundfunktionen.push(loadedBacnetData[data][key].grundfunktionLabel)
        }
      }
      return grundfunktionen
    }
  },
  methods: {
    async query (data) {
      const examples = data.slice(0, 6)
      const bacnetDataScore = []
      // console.log(examples)
      // console.log(data[2].input)
      let result
      for (const example in examples) {
        console.log(examples[example].input)
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungGrundfunktionen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify(examples[example].input)
          }
        )
        result = await response.json()
        bacnetDataScore.push({
          name: examples[example].name,
          description: examples[example].description,
          grundfunktionLabel: result[0][0].label,
          grundfunktionScore: result[0][0].score
        })
        console.log(result)
      }
      this.$store.dispatch('addGrundfunktionToBacnet', bacnetDataScore)
      console.log(bacnetDataScore)
      return result
    }
  }
}
</script>
