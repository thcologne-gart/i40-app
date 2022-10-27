<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
        <hr>
        <v-btn class="my-3" variant="outline-secondary" :loading="loading" @click="query(bacnetData)">Hinzufügen Automationsstation</v-btn>
          <v-container>
            <v-row dense>
                <v-col v-for="grundfunktion in numberOfGrundfunktionen" :key="grundfunktion" cols = '6'>
                    <v-card max-width="70%" v-if="grundfunktion ==='WaermeVersorgen'" class="mx-auto my-8" elevation="2">
                    <v-card-subtitle>Wärme versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[0].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Wärme versorgen', params: { building: building, grundfunktion: wärmeVersorgen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                    <v-card v-if="grundfunktion ==='KaelteVersorgen'" class="mx-auto my-8" elevation="2" max-width="70%">
                    <v-card-subtitle>Kälte versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[1].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to="{ name: 'Kälte versorgen', params: { building: building, grundfunktion: kälteVersorgen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='LuftVersorgen'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Luft versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[2].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Luft versorgen', params: { building: building, grundfunktion: luftVersorgen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='MedienVersorgen'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Medien versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[3].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Medien versorgen', params: { building: building, grundfunktion: medienVersorgen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='Sichern'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Sichern</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[4].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Sichern', params: { building: building, grundfunktion: sichern } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='StromVersorgen'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Strom versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[5].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Strom versorgen', params: { building: building, grundfunktion: stromVersorgen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='Befoerdern'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Befördern</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[6].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Befördern', params: { building: building, grundfunktion: befördern } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  <v-card v-if="grundfunktion ==='AndereAnlagen'" class="mx-auto my-8" elevation="2"
                        max-width="70%">
                    <v-card-subtitle>Andere Anlagen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[7].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="() => {}" :to= "{ name: 'Andere Anlagen', params: { building: building, grundfunktion: andereAnlagen } }"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                  </v-col>
              </v-row>
          </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    building: Object
  },
  computed: {
    wärmeVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const wärmeVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'WaermeVersorgen') {
          wärmeVersorgen.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(wärmeVersorgen)
      return wärmeVersorgen
    },
    kälteVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const kälteVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'KaelteVersorgen') {
          kälteVersorgen.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(kälteVersorgen)
      return kälteVersorgen
    },
    luftVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'LuftVersorgen') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
    medienVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'MedienVersorgen') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
    sichern () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'Sichern') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
    befördern () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'Befoerdern') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
    stromVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'StromVersorgen') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
    andereAnlagen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'AndereAnlagen') {
          funktion.push({
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel
          })
        }
      }
      console.log(funktion)
      return funktion
    },
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
      this.loading = true
      const examples = data.slice(0, 20)
      const bacnetDataScore = []
      console.log(examples)
      // console.log(data[2].input)
      let result
      // Huggingface Inferrence Endpoints
      /*
      for (const example in examples) {
        // console.log(examples[example].input)
        const response = await fetch(
          'https://nuewytpayodx0hlp.eu-west-1.aws.endpoints.huggingface.cloud',
          {
            headers: { Authorization: 'Bearer SxMgRdoPkIocLyTWtBuJHBqtPqNhlpjMBuMuEVtnRggnzRDCsIFMWpOXMAJnnqUyyAbQfpkLpqnsyXVWYRNgzMRFSApCRjSKdQaFBUFwboHrHvTfVKkWYWUTWhimpqdo', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ inputs: examples[example].input })
          }
        )
        result = await response.json()
        console.log(result)
        bacnetDataScore.push({
          name: examples[example].name,
          description: examples[example].description,
          grundfunktionLabel: result[0].label,
          grundfunktionScore: result[0].score,
          input: examples[example].input
        })
        // console.log(result)
        console.log(bacnetDataScore)
      }
      */
      // Huggingface Normale Inference
      for (const example in examples) {
        // console.log(examples[example].input)
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungGrundfunktionen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: examples[example].input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        console.log(result)
        bacnetDataScore.push({
          name: examples[example].name,
          description: examples[example].description,
          grundfunktionLabel: result[0][0].label,
          grundfunktionScore: result[0][0].score,
          input: examples[example].input
        })
        // console.log(result)
        console.log(bacnetDataScore)
      }
      this.zweiteGrundfunktion(bacnetDataScore)
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetDataScore)
      // console.log(bacnetDataScore)
      // this.loading = false
      return result
    },
    async zweiteGrundfunktion (bacnetDataScore) {
      console.log(bacnetDataScore)
      const bacnetArrayZweiteGrundfunktion = []
      let result
      // const hfOptions = { wait_for_model: true }
      for (const element in bacnetDataScore) {
        if (bacnetDataScore[element].grundfunktionLabel === 'WaermeVersorgen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeVersorgen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetDataScore[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: result[0][0].label,
            zweiteGrundfunktionScore: result[0][0].score,
            input: bacnetDataScore[element].input
          })
        } else if (bacnetDataScore[element].grundfunktionLabel === 'LuftVersorgen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftVersorgen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetDataScore[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: result[0][0].label,
            zweiteGrundfunktionScore: result[0][0].score,
            input: bacnetDataScore[element].input
          })
        } else if (bacnetDataScore[element].grundfunktionLabel === 'MedienVersorgen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungMedienVersorgen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetDataScore[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: result[0][0].label,
            zweiteGrundfunktionScore: result[0][0].score,
            input: bacnetDataScore[element].input
          })
        } else if (bacnetDataScore[element].grundfunktionLabel === 'KaelteVersorgen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungKaelteVersorgen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetDataScore[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: result[0][0].label,
            zweiteGrundfunktionScore: result[0][0].score,
            input: bacnetDataScore[element].input
          })
        } else if (bacnetDataScore[element].grundfunktionLabel === 'Sichern') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungSichern',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetDataScore[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: result[0][0].label,
            zweiteGrundfunktionScore: result[0][0].score,
            input: bacnetDataScore[element].input
          })
        } else if (bacnetDataScore[element].grundfunktionLabel === 'Befoerdern' || bacnetDataScore[element].grundfunktionLabel === 'StromVersorgen' || bacnetDataScore[element].grundfunktionLabel === 'AndereAnlagen') {
          bacnetArrayZweiteGrundfunktion.push({
            name: bacnetDataScore[element].name,
            description: bacnetDataScore[element].description,
            grundfunktionLabel: bacnetDataScore[element].grundfunktionLabel,
            grundfunktionScore: bacnetDataScore[element].grundfunktionScore,
            zweiteGrundfunktionLabel: 'Noch nicht ausgeprägt',
            zweiteGrundfunktionScore: 0,
            input: bacnetDataScore[element].input
          })
        }
      }
      this.klassifiziereDritteEbene(bacnetArrayZweiteGrundfunktion)
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayZweiteGrundfunktion)
      console.log(bacnetArrayZweiteGrundfunktion)
      // this.loading = false
      return bacnetArrayZweiteGrundfunktion
    },
    async klassifiziereDritteEbene (bacnetArrayZweiteGrundfunktion) {
      const bacnetArrayDritteEbene = []
      let result
      // const hfOptions = { wait_for_model: true }
      for (const element in bacnetArrayZweiteGrundfunktion) {
        if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'WaermeVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'Verteilen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeVerteilen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetArrayZweiteGrundfunktion[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: result[0][0].label,
            dritteEbeneScore: result[0][0].score,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'WaermeVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'Erzeugen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeErzeugen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetArrayZweiteGrundfunktion[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: result[0][0].label,
            dritteEbeneScore: result[0][0].score,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'LuftVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'LuftBereitstellen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftBereitstellen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetArrayZweiteGrundfunktion[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: result[0][0].label,
            dritteEbeneScore: result[0][0].score,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'LuftVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'LuftVerteilen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftVerteilen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify({ inputs: bacnetArrayZweiteGrundfunktion[element].input, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: result[0][0].label,
            dritteEbeneScore: result[0][0].score,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'WaermeVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'Beziehen') {
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: 'Fernwärme',
            dritteEbeneScore: 1.0,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'WaermeVersorgen' && bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel === 'Speichern') {
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: 'Speicher',
            dritteEbeneScore: 1.0,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'Sichern' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'KaelteVersorgen' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'Befoerdern' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'StromVersorgen' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'AndereAnlagen') {
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: 'Noch nicht ausgeprägt',
            dritteEbeneScore: 0,
            input: bacnetArrayZweiteGrundfunktion.input
          })
        }
      }
      this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayDritteEbene)
      console.log(bacnetArrayDritteEbene)
      this.loading = false
      return bacnetArrayDritteEbene
    }
  },
  created () {
    this.energyUseGroup = [
      { name: 'Wärme versorgen', pic: require('@/assets/heizung.svg'), link: '/wärmeversorgen' },
      { name: 'Kälte versorgen', pic: require('@/assets/kuehlung.svg'), link: '/kälteversorgen' },
      { name: 'Luft versorgen', pic: require('@/assets/lueftung.svg'), link: 'luftversorgen' },
      { name: 'Medien versorgen', pic: require('@/assets/medien.svg'), link: 'medienversorgen' },
      { name: 'Sichern', pic: require('@/assets/sichern.svg'), link: 'sichern' },
      { name: 'Strom versorgen', pic: require('@/assets/elektro.svg'), link: 'stromversorgen' },
      { name: 'Befördern', pic: require('@/assets/befördern.svg'), link: 'befördern' },
      { name: 'Andere Anlagen', pic: require('@/assets/andere_anlagen.svg'), link: 'andereanlagen' }
    ]
    this.energySourceGroups = [
      { id: 1, groupName: 'Energie Gruppe Heizung', pic: require('@/assets/heating-system.jpeg'), name: 'Energy Source Group' },
      { id: 2, groupName: 'Energie Gruppe Kühlung', pic: require('@/assets/cooling-system.jpeg'), name: 'Energy Source Group' },
      { id: 3, groupName: 'Energie Gruppe Lüftung', pic: require('@/assets/air-system.jpeg'), name: 'Energy Source Group' }
    ]
    this.energySources = [
      { id: 1, groupType: 'Heizung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundwaterHeatPump', idShortEnpi: 'EnPis Grundwasserwärmepumpe', idShortCDEnpi: 'EnpiGroundwaterHeatpump' },
      { id: 2, groupType: 'Heizung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump', idShortEnpi: 'EnPis Luftwärmepumpe', idShortCDEnpi: 'EnpiAirHeatpump' },
      { id: 3, groupType: 'Heizung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump', idShortEnpi: 'EnPis Erdwärmepumpe', idShortCDEnpi: 'EnpiGroundSourceHeatpump' },
      { id: 4, groupType: 'Kühlung', sourceName: 'Grundwasserwärmepumpe', pic: require('@/assets/grundwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundWaterHeatPump', idShortEnpi: 'EnPis Grundwasserwärmepumpe', idShortCDEnpi: 'EnpiGroundwaterHeatpump' },
      { id: 5, groupType: 'Kühlung', sourceName: 'Luftwärmepumpe', pic: require('@/assets/luftwärmepumpe.svg'), name: 'Component', idShortCD: 'AirHeatPump', idShortEnpi: 'EnPis Luftwärmepumpe', idShortCDEnpi: 'EnpiAirHeatpump' },
      { id: 6, groupType: 'Kühlung', sourceName: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.svg'), name: 'Component', idShortCD: 'GroundSourceHeatPump', idShortEnpi: 'EnPis Erdwärmepumpe', idShortCDEnpi: 'EnpiGroundSourceHeatpump' },
      { id: 7, groupType: 'Kühlung', sourceName: 'Kaltwassersatz', pic: require('@/assets/kaltwasser.svg'), name: 'Component', idShortCD: 'ColdWaterSet', idShortEnpi: 'EnPis Kalwassersatz', idShortCDEnpi: 'EnpiColdWaterSet' },
      { id: 8, groupType: 'Kühlung', sourceName: 'Splitgerät', pic: require('@/assets/split.svg'), name: 'Component', idShortCD: 'SplitDevice', idShortEnpi: 'EnPis Splitgerät', idShortCDEnpi: 'EnpiSplitDevice' },
      { id: 9, groupType: 'Lüftung', sourceName: 'Klimaanlage', pic: require('@/assets/klimaanlage.svg'), name: 'Component', idShortCD: 'AirConditioningSystem', idShortEnpi: 'EnPis Klimaanlage', idShortCDEnpi: 'EnpiAirConditioningSystem' },
      // { id: 10, groupType: 'Lüftung', sourceName: 'Teilklimaanlage', pic: require('../assets/teilklimaanlage.svg'), name: 'Component' },
      { id: 11, groupType: 'Lüftung', sourceName: 'Lüftungsanlage', pic: require('@/assets/lüftungsanlage.svg'), name: 'Component', idShortCD: 'VentilationSystem', idShortEnpi: 'EnPis Lüftungsanlagae', idShortCDEnpi: 'EnpiVentilationSystem' }
    ]
    this.heatingComponents = [
      { id: 1, groupType: 'Pumpe', sourceName: 'Kreiselpumpe', pic: require('@/assets/kreiselpumpe.svg'), name: 'Component', idShortCD: 'CentrifugalPump', idShortEnpi: 'EnPis Kreiselpumpe', idShortCDEnpi: 'EnpiCentrifugalPump' },
      { id: 2, groupType: 'Pumpe', sourceName: 'Verdrängerpumpe', pic: require('@/assets/verdrängerpumpe.svg'), name: 'Component', idShortCD: 'DisplacementPump', idShortEnpi: 'EnPis Verdrängerpumpe', idShortCDEnpi: 'EnpiDisplacementPump' },
      { id: 3, groupType: 'Pumpe', sourceName: 'Strahlpumpe', pic: require('@/assets/strahlpumpe.svg'), name: 'Component', idShortCD: 'JetPump', idShortEnpi: 'EnPis Strahlpumpe', idShortCDEnpi: 'EnpiJetPump' }
    ]
    this.airComponents = [
      { id: 1, groupType: 'Lüftung', sourceName: 'Ventilator', pic: require('@/assets/ventilator.svg'), name: 'Component', idShortCD: 'Fan', idShortEnpi: 'EnPis Ventilator', idShortCDEnpi: 'EnpiFan' },
      { id: 2, groupType: 'Klimaanlage', sourceName: 'Erhitzer', pic: require('@/assets/erhitzer.svg'), name: 'Component', idShortCD: 'Heater', idShortEnpi: 'EnPis Erhitzer', idShortCDEnpi: 'EnpiHeater' },
      { id: 3, groupType: 'Klimaanlage', sourceName: 'Kühler', pic: require('@/assets/kühler.svg'), name: 'Component', idShortCD: 'Cooler', idShortEnpi: 'EnPis Kühler' },
      { id: 4, groupType: 'Klimaanlage', sourceName: 'Wärmerückgewinnung', pic: require('@/assets/wrg.svg'), name: 'Component', idShortCD: 'HeatRecovery', idShortEnpi: 'EnPis Wärmerückgewinnung', idShortCDEnpi: 'EnpiHeatRecovery' }
    ]
  }
}
</script>
