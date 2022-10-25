<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
        <hr>
        <b-button class="my-3" variant="outline-secondary" block @click="query(bacnetData)">Hinzufügen Automationsstation</b-button>
          <v-container>
            <v-row>
              <v-col v-for="grundfunktion in numberOfGrundfunktionen" :key="grundfunktion">
                <div v-if="grundfunktion ==='WaermeVersorgen'">
                    <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Wärme versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[0].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='KaelteVersorgen'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Kälte versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[1].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='LuftVersorgen'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Luft versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[2].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='MedienVersorgen'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Medien versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[3].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='Sichern'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Sichern</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[4].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='StromVersorgen'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Strom versorgen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[5].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='Befoerdern'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Befördern</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[6].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
                <div v-if="grundfunktion ==='AndereAnlagen'">
                  <v-card class="mx-auto my-8" elevation="2"
                        max-width="80%">
                    <v-card-subtitle>Andere Anlagen</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                      <v-img class="mx-auto" max-width="60" href="#" contain :src= energyUseGroup[7].pic></v-img>
                      <v-btn
                        color="deep-grey lighten-2"
                        text
                        @click="reserve"
                      >
                        Go to
                      </v-btn>
                    </v-card>
                </div>
              </v-col>
            </v-row>
          </v-container>
    </v-card>
  </div>
</template>

<script>
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
        // console.log(examples[example].input)
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
          grundfunktionScore: result[0][0].score,
          input: examples[example].input
        })
        // console.log(result)
      }
      this.zweiteGrundfunktion(bacnetDataScore)
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetDataScore)
      // console.log(bacnetDataScore)
      return result
    },
    async zweiteGrundfunktion (bacnetDataScore) {
      console.log(bacnetDataScore)
      const bacnetArrayZweiteGrundfunktion = []
      let result
      for (const element in bacnetDataScore) {
        if (bacnetDataScore[element].grundfunktionLabel === 'WaermeVersorgen') {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeVersorgen',
            {
              headers: { Authorization: 'Bearer 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' },
              method: 'POST',
              body: JSON.stringify(bacnetDataScore[element].input)
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
              body: JSON.stringify(bacnetDataScore[element].input)
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
              body: JSON.stringify(bacnetDataScore[element].input)
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
              body: JSON.stringify(bacnetDataScore[element].input)
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
              body: JSON.stringify(bacnetDataScore[element].input)
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
      this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayZweiteGrundfunktion)
      console.log(bacnetArrayZweiteGrundfunktion)
    }
  },
  created () {
    this.energyUseGroup = [
      { name: 'Wärme versorgen', pic: require('@/assets/heizung.svg') },
      { name: 'Kälte versorgen', pic: require('@/assets/kuehlung.svg') },
      { name: 'Luft versorgen', pic: require('@/assets/lueftung.svg') },
      { name: 'Medien versorgen', pic: require('@/assets/medien.svg') },
      { name: 'Sichern', pic: require('@/assets/sichern.svg') },
      { name: 'Strom versorgen', pic: require('@/assets/elektro.svg') },
      { name: 'Befördern', pic: require('@/assets/befördern.svg') },
      { name: 'Andere Anlagen', pic: require('@/assets/andere_anlagen.svg') }
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
