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
                        @click="() => {}" :to= "{ name: 'Wärme versorgen' }"
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
          <div v-if="bacnetDataUnsure.length !== 0">
            <v-card-actions>
              <v-row>
                <v-col>
              <v-btn
                  text
                  @click="show = !show"
              >Edit Datenpunkte</v-btn>
            </v-col>
              <v-col>
              <v-btn
                  icon
                  @click="show = !show"
              >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-col>
            </v-row>
          </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-simple-table class="grey lighten-5" width="100px">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Label
                        </th>
                        <th class="text-left">
                            Score
                        </th>
                        <th class="text-left">
                            Accept
                        </th>
                        <th class="text-left">
                            Edit
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in bacnetDataUnsure"
                        :key="item.name"
                        >
                        <td class="text-left">{{ item.name }}</td>
                        <td class="text-left">{{ item.description }}</td>
                        <td v-if="item.grundfunktionLabel === 'WaermeVersorgen' " class="text-left">Wärme versorgen</td>
                        <td v-if="item.grundfunktionLabel === 'LuftVersorgen' " class="text-left">Luft versorgen</td>
                        <td v-if="item.grundfunktionLabel === 'KaelteVersorgen' " class="text-left">Kälte versorgen</td>
                        <td v-if="item.grundfunktionLabel === 'MedienVersorgen' " class="text-left">Medien versorgen</td>
                        <td v-if="item.grundfunktionLabel === 'StromVersorgen' " class="text-left">Strom versorgen</td>
                        <td v-if="item.grundfunktionLabel === 'Sichern' " class="text-left">Sichern</td>
                        <td v-if="item.grundfunktionLabel === 'Befoerdern' " class="text-left">Befördern</td>
                        <td class="text-left">{{ item.grundfunktionScore }}</td>
                        <td>
                          <v-btn class="mx-auto my-6" @click="labelCorrect(item)" color="outline-secondary" id= "buttons-card">
                            <v-icon>
                                mdi-check
                            </v-icon>
                          </v-btn>
                        </td>
                        <td>
                        <v-dialog transition="dialog-bottom-transition" max-width="600">
                              <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="mx-auto my-6" v-bind="attrs" v-on="on" color="outline-secondary" id= "buttons-card" :loading="loading1">
                                      <v-icon>
                                          mdi-plus
                                      </v-icon>
                                  </v-btn>
                              </template>
                              <template v-slot:default="dialog">
                                  <v-card >
                                      <v-toolbar
                                      color="#5D3FD3"
                                      dark
                                      >Edit Klassifizierung Grundfunktionen</v-toolbar>
                                      <v-container>
                                        <v-card-text>
                                          <v-row>
                                            <p class="text-left black--text">{{ item.name }}</p>
                                          </v-row>
                                          <v-row>
                                            <p class="text-left black--text">{{ item.description }}</p>
                                          </v-row>
                                          <v-row>
                                            <p class="text-left black--text">Label: {{ item.grundfunktionLabel }}</p>
                                          </v-row>
                                          <v-row>
                                            <p class="text-left black--text">Score: {{ item.grundfunktionScore }}</p>
                                          </v-row>
                                          <v-select :items="grundfunktionen" v-model="neueGrundfunktion" label= 'Korrektes Label' />
                                        </v-card-text>
                                      </v-container>
                                      <v-card-actions class="justify-end">
                                      <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; editBacnetProperty(item)">Submit</v-btn>
                                      <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; onReset()">Reset</v-btn>
                                      </v-card-actions>
                                  </v-card>
                              </template>
                          </v-dialog>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </v-expand-transition>
        </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      loading: false,
      loading1: false,
      neueGrundfunktion: '',
      grundfunktionen: ['Wärme versorgen', 'Luft versorgen', 'Kälte versorgen', 'Medien versorgen', 'Strom versorgen', 'Sichern', 'Befördern', 'Andere Anlagen']
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
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'WaermeVersorgen') {
          wärmeVersorgen.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(wärmeVersorgen)
      return wärmeVersorgen
    },
    kälteVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const kälteVersorgen = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'KaelteVersorgen') {
          kälteVersorgen.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(kälteVersorgen)
      return kälteVersorgen
    },
    luftVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'LuftVersorgen') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    medienVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'MedienVersorgen') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    sichern () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'Sichern') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    befördern () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'Befoerdern') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    stromVersorgen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'StromVersorgen') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    andereAnlagen () {
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const funktion = []
      for (const data in loadedBacnetData) {
        const keys = [Object.keys(loadedBacnetData[data])]
        const key = keys[0][0]
        // console.log(loadedBacnetData[data][key].grundfunktionLabel)
        if (loadedBacnetData[data][key].grundfunktionLabel === 'AndereAnlagen') {
          funktion.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore
          })
        }
      }
      // console.log(funktion)
      return funktion
    },
    bacnetData () {
      // console.log(this.$store.getters.loadedBACnet)
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
      // console.log(bacnetDataArray)
      return bacnetDataArray
    },
    bacnetDataUnsure () {
      // console.log(this.$store.getters.loadedBACnet)
      const loadedBacnetData = this.$store.getters.loadedBACnet
      const bacnetDataArrayUnsure = []
      for (const data in loadedBacnetData) {
        // const str = 'Hello' + ' ' + 'World'
        // console.log(Object.keys(loadedBacnetData[data]))
        const keys = [Object.keys(loadedBacnetData[data])]
        // console.log(keys)
        const key = keys[0][0]
        // console.log(key)
        const input = loadedBacnetData[data].text + ',' + loadedBacnetData[data].name
        if (loadedBacnetData[data][key].grundfunktionScore < 0.85) {
          bacnetDataArrayUnsure.push({
            data: data,
            key: key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].text,
            grundfunktionLabel: loadedBacnetData[data][key].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data][key].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data][key].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data][key].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data][key].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data][key].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data][key].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data][key].datenpunktScore,
            input: input
          })
        }
      }
      console.log(bacnetDataArrayUnsure)
      return bacnetDataArrayUnsure
    },
    numberOfGrundfunktionen () {
      const grundfunktionen = []
      // console.log(this.$store.getters.loadedBACnet)
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
    onReset (event) {
      event.preventDefault()
      // Reset our form values

      // this.form.country = null
      this.neueGrundfunktion = ''
    },
    labelCorrect (item) {
      console.log(item)
      this.$store.dispatch('labelCorrect', item)
    },
    async editBacnetProperty (bacnetDataScore) {
      this.loading1 = true
      console.log(bacnetDataScore)
      const bacnetArrayZweiteGrundfunktion = []
      let result
      // const hfOptions = { wait_for_model: true }
      if (this.neueGrundfunktion === 'Wärme versorgen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeVersorgen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: bacnetDataScore.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'WaermeVersorgen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: result[0][0].label,
          zweiteGrundfunktionScore: result[0][0].score,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
        // console.log('zweite Ebene')
      } else if (this.neueGrundfunktion === 'Luft versorgen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftVersorgen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: bacnetDataScore.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'LuftVersorgen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: result[0][0].label,
          zweiteGrundfunktionScore: result[0][0].score,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
        // console.log('zweite Ebene')
      } else if (this.neueGrundfunktion === 'Medien versorgen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungMedienVersorgen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: bacnetDataScore.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'MedienVersorgen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: result[0][0].label,
          zweiteGrundfunktionScore: result[0][0].score,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
        // console.log('zweite Ebene')
      } else if (this.neueGrundfunktion === 'Kälte versorgen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungKaelteVersorgen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: bacnetDataScore.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'KaelteVersorgen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: result[0][0].label,
          zweiteGrundfunktionScore: result[0][0].score,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
      } else if (this.neueGrundfunktion === 'Sichern') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungSichern',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: bacnetDataScore.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'Sichern',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: result[0][0].label,
          zweiteGrundfunktionScore: result[0][0].score,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
      } else if (this.neueGrundfunktion === 'Befördern') {
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'Befoerdern',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: 'Noch nicht ausgeprägt',
          zweiteGrundfunktionScore: 0,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
      } else if (this.neueGrundfunktion === 'Strom versorgen') {
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'StromVersorgen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: 'Noch nicht ausgeprägt',
          zweiteGrundfunktionScore: 0,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
      } else if (this.neueGrundfunktion === 'Andere Anlagen') {
        bacnetArrayZweiteGrundfunktion.push({
          name: bacnetDataScore.name,
          description: bacnetDataScore.description,
          grundfunktionLabel: 'AndereAnlagen',
          grundfunktionScore: 1.0,
          zweiteGrundfunktionLabel: 'Noch nicht ausgeprägt',
          zweiteGrundfunktionScore: 0,
          input: bacnetDataScore.input,
          data: bacnetDataScore.data,
          key: bacnetDataScore.key
        })
      }
      this.neueGrundfunktion = ''
      console.log(bacnetArrayZweiteGrundfunktion)
      this.klassifiziereDritteEbene(bacnetArrayZweiteGrundfunktion)
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayZweiteGrundfunktion)
      console.log(bacnetArrayZweiteGrundfunktion)
      // this.loading = false
      return bacnetArrayZweiteGrundfunktion
    },
    async query (data) {
      this.loading = true
      const examples = data.slice(0, 100)
      const bacnetDataScore = []
      // console.log(examples)
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
        // console.log(result)
        bacnetDataScore.push({
          name: examples[example].name,
          description: examples[example].description,
          grundfunktionLabel: result[0][0].label,
          grundfunktionScore: result[0][0].score,
          input: examples[example].input
        })
        // console.log(result)
        // console.log(bacnetDataScore)
      }
      this.zweiteGrundfunktion(bacnetDataScore)
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetDataScore)
      console.log(bacnetDataScore)
      // this.loading = false
      return result
    },
    async zweiteGrundfunktion (bacnetDataScore) {
      // console.log(bacnetDataScore)
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
          // console.log('zweite Ebene')
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
          // console.log('zweite Ebene')
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
          // console.log('zweite Ebene')
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
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
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
          })
        } else if (bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'MedienVersorgen' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'Sichern' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'KaelteVersorgen' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'Befoerdern' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'StromVersorgen' || bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel === 'AndereAnlagen') {
          bacnetArrayDritteEbene.push({
            name: bacnetArrayZweiteGrundfunktion[element].name,
            description: bacnetArrayZweiteGrundfunktion[element].description,
            grundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayZweiteGrundfunktion[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayZweiteGrundfunktion[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: 'Noch nicht ausgeprägt',
            dritteEbeneScore: 0,
            input: bacnetArrayZweiteGrundfunktion[element].input,
            data: bacnetArrayZweiteGrundfunktion[element].data,
            key: bacnetArrayZweiteGrundfunktion[element].key
          })
        }
      }
      // this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayDritteEbene)
      // this.loading = false
      this.klassifiziereDatenpunkt(bacnetArrayDritteEbene)
      console.log(bacnetArrayDritteEbene)
      return bacnetArrayDritteEbene
    },
    async klassifiziereDatenpunkt (bacnetArrayDritteEbene) {
      const labelBeziehen = ['Alarmmeldung', 'Anforderung', 'Messwert Außentemperatur', 'Betriebsstunden Pumpe', 'Grenzwert Vorlauftemperatur Sekundär', 'Sollwert Maximale Vorlauftemperatur', 'Sollwert Minimale Vorlauftemperatur', 'Offset Vorlauftemperatur',
        'Regler', 'Messwert Rücklauftemperatur Primär', 'Messwert Rücklauftemperatur Sekundär', 'Rückmeldung Handschaltung Ventil', 'Rückmeldung Handschaltung Klappe', 'Rückmeldung Betriebsart', 'Rückmeldung Ventil Rücklauf',
        'Sollwert Außentemperatur Maximal Tag', 'Sollwert Nachlaufzeit Pumpe', 'Schaltbefehl Anlage', 'Schaltbefehl Pumpe', 'Sollwert Vorlauftemperatur', 'Stellbefehl Ventil', 'Störmeldung', 'Messwert Vorlauftemperatur Sekundär',
        'Zähler', 'Messwert Vorlauftemperatur Primär', 'Grenzwert Rücklauftemperatur Sekundär', 'Rückmeldung Handschaltung Fernwärme', 'Rückmeldung Stellsignal']
      const labelSpeichern = ['Externe Vorrangschaltung Aktiv', 'Rückmeldung Zeitplan', 'Sollwert Maximale Hysterese Speichertemperatur', 'Sollwert Speichertemperatur', 'Sollwert Speichertemperatur Unten', 'Messwert Speichertemperatur', 'Messwert Speichertemperatur Mitte',
        'Messwert Speichertemperatur Oben', 'Messwert Speichertemperatur Unten', 'Störmeldung', 'Rückmeldung Zeitplan']
      const labelKessel = ['Anforderung', 'Anzahl Schaltungen', 'Betriebsstunden', 'Messwert Druck', 'Freigabe', 'Messwert Temperatur', 'Regler', 'Reset Betriebsstunden', 'Rückmeldung Betrieb', 'Rückmeldung Klappe', 'Rückmeldung Stellsignal',
        'Rückmeldung Handschaltung', 'Rückmeldung Leistung', 'Rückmeldung Not Aus', 'Schaltbefehl Not Aus', 'Sollwert Temperatur', 'Sollwert Wartezeit', 'Sollwert Leistung', 'Schaltbefehl Anlage', 'Stellbefehl Anlage', 'Störmeldung', 'Überhöhung Kesselanlage',
        'Wartungsmeldung', 'Sollwert Einschaltverzögerung', 'Sollwert Abschaltung', 'Schaltbefehl Klappe']
      const labelBhkw = ['Betriebsstunden', 'Laufzeit Nächste Wartung', 'Messwert Abgastemperatur', 'Messwert Gasverbrauch', 'Messwert Spannung', 'Messwert Strom', 'Messwert Temperatur Generator', 'Rückmeldung Ölnachspeisung Aktiv',
        'Rückmeldung Start', 'Rückmeldung Handschaltung', 'Rückmeldung Batterie', 'Schaltbefehl Anlage', 'Störmeldung', 'Warnmeldung', 'Wartungsmeldung', 'Rückmeldung Betrieb']
      const labelWärmepumpe = ['Rückmeldung Handschaltung Brunnenpumpe', 'Rückmeldung Betriebsbereit', 'Rückmeldung Betriebsbereit', 'Rückmeldung Blockierschutz Umwälzpumpe', 'Rückmeldung Blockierschutz Brunnenpumpe', 'Rückmeldung Umschaltventil Zu',
        'Störmeldung', 'Zähler-Volumenstrom-Förderbrunnen']
      const labelPelletkessel = ['Rückmeldung Schnecke Leer', 'Rückmeldung Betrieb', 'Messwert Außentemperatur', 'Messwert Primärluft', 'Restsauerstoff', 'Messwert Temperatur Einschubrohr']
      const labelPumpe = ['Anzahl-Schaltungen', 'Betriebsstunden', 'Messwert Durchfluss', 'Messwert Energieverbrauch', 'Messwert Leistungsaufnahme', 'Messwert Stromaufnahme', 'Messwert Drehzahl', 'Reset Betriebsstunden', 'Rückmeldung Handschaltung Pumpe',
        'Rückmeldung Betrieb', 'Schaltbefehl', 'Schaltbefehl Blockierschutz', 'Sollwert Frostschutz', 'Sollwert Laufzeit Blockierschutz', 'Sollwert Nacht', 'Sollwert Nachlaufzeit', 'Sollwert Tag', 'Status Übersteuern Ein', 'Störmeldung', 'Wartungsintervall']
      const labelVentil = ['Handschaltung', 'Laufzeit 3 Punkt Antrieb', 'Rückmeldung Handschaltung', 'Rückmeldung Stellsignal', 'Sollwert Stellsignal Min', 'Sollwert Stellsignal Max', 'Stellbefehl', 'Störmeldung', 'Stellbefehl Max', 'Stellbefehl Min',
        'Sollwert Mischventil', 'Laufzeit Ventil']
      const labelRaum = ['Freigabe Heizung', 'Freigabe Raumkorrektur', 'Freigabe Stützbetrieb Nacht Ventil', 'Freigabe Stützbetrieb', 'Freigabe Stützbetrieb Tag Ventil', 'Freigabe Stellantrieb', 'Freigabe Zeitprogramm', 'Messwert Raumtemperatur',
        'Rückmeldung Normalbetrieb', 'Rückmeldung Ventil Handschaltung', 'Schaltbefehl Raumkorrektur', 'Sollwert Raumkorrektur', 'Sollwert Raumtemperatur Tag', 'Sollwert Raumtemperatur Nacht', 'Sollwert minimale Raumtemperatur',
        'Sollwertverschiebung', 'Sollwert Stützbetrieb Tag', 'Sollwert Stützbetrieb Nacht', 'Sollwert Aufheizbetrieb', 'Stellbefehl', 'Aktivierung Raumoptimierung', 'Rückmeldung Aufheizbetrieb', 'Rückmeldung Absenkbetrieb']
      const labelVorlauf = ['Anhebung Vorlauftemperatur', 'Messwert Vorlauftemperatur', 'Sollwert Vorlauftemperatur', 'Sollwert Maximale Vorlauftemperatur', 'Sollwert Minimale Vorlauftemperatur', 'Sollwert Nachtabsenkung Vorlauftemperatur',
        'Störmeldung', 'Rückmeldung Sollwertabweichung Vorlauftemperatur', 'Sollwertkorrektur Vorlauftemperatur']
      const labelRücklauf = ['Messwert Rücklauftemperatur', 'Sollwert Maximale Rücklauftemperatur', 'Sollwert Minimale Rücklauftemperatur', 'Sollwert Rücklauftemperatur', 'Rohrheizung']
      const labelHeizkreisAllgemein = ['Alarmmeldung', 'Aktuelle Leistung', 'Grenzwert Frost', 'Heizkurve', 'Messwert Außentemperatur', 'Regler', 'Rückmeldung Nutzzeitverlängerung', 'Schaltbefehl Anlage', 'Schaltbefehl Nutzzeitverlängerung',
        'Schaltbefehl Nachtabsenkung', 'Sollwert Maximale Aufheizzeit', 'Sollwert Aufheizzeit', 'Sollwert Nachtabsenkung', 'Sollwert Nutzzeitverlängerung', 'Sollwert Speicherfähigkeit', 'Sollwert Stützbetrieb Tag', 'Sollwert Überhöhung Hydraulische Weiche',
        'Stützbetrieb Nacht Erreicht', 'Warmwasserbereitung', 'Parallelverschiebung', 'Rückmeldung Tagbetrieb', 'Störmeldung', 'Wärmemengenzähler', 'Sollwert Minimale Außentemperatur', 'Sollwert Außentemperatur', 'Rückmeldung Betriebsart',
        'Rückmeldung Zeitplan', 'Rückmeldung Regelabweichung', 'Sollwert Abschalten Stützbetrieb', 'Schaltbefehl Start Stop Optimierung', 'Schaltbefehl Gleitendes Schalten', 'Schaltbefehl Zeitprogramm']
      const labelAbluftAllgemein = ['Alarmmeldung', 'Befehlsausführkontrolle', 'Messwert Druck', 'Messwert Feuchte', 'Messwert Temperatur', 'Messwert Luftqualität', 'Messwert Volumenstrom', 'Rückmeldung Handschaltung', 'Rückmeldung Nutzzeitverlängerung',
        'Rückmeldung Ventil', 'Rückmeldung Zeitplan', 'Schaltbefehl Anlage', 'Sollwert Druck', 'Sollwert Feuchte', 'Sollwert Temperatur', 'Sollwert CO2 Konzentration', 'Sollwert Volumenstrom', 'Störmeldung',
        'Warnmeldung CO2 Hoch', 'Warnmeldung Feuchte', 'Warnmeldung Temperatur Hoch', 'Warnmeldung Temperatur Niedrig', 'Wartungsmeldung']
      const labelAbluftventilator = ['Alarmmeldung', 'Anzahl Schaltungen', 'Befehlausführungskontrolle', 'Betriebsstunden', 'Messwert Differenzdruck', 'Messwert Volumenstrom', 'Reset Betriebsstunden', 'Rückmeldung Nutzzeitverlängerung',
        'Rückmeldung Handschaltung', 'Rückmeldung Reperaturschalter', 'Rückmeldung Betrieb', 'Rückmeldung Zeitplan', 'Schaltbefehl', 'Sollwert Laufzeit', 'Sollwert FU', 'Stellbefehl', 'Störmeldung']
      const labelZuluftventilator = ['Alarmmeldung', 'Anzahl Schaltungen', 'Befehlausführungskontrolle', 'Betriebsstunden', 'Messwert Differenzdruck', 'Messwert Volumenstrom', 'Reset Betriebsstunden', 'Rückmeldung Drehzahl',
        'Rückmeldung Nutzzeitverlängerung', 'Rückmeldung Handschaltung', 'Rückmeldung Reperaturschalter', 'Rückmeldung Stellsignal', 'Rückmeldung Betrieb', 'Rückmeldung Zeitplan', 'Rückmeldung Laufüberwachung',
        'Schaltbefehl', 'Sollwert Laufzeit', 'Sollwert Stellsignal', 'Stellbefehl', 'Störmeldung', 'Wartungsmeldung']
      const labelZuluftAllgemein = ['Alarmmeldung Frostschutz', 'Alarmmeldung', 'Befehlsausführkontrolle', 'Messwert Druck', 'Messwert Feuchte', 'Messwert Temperatur', 'Messwert Luftqualität', 'Messwert Volumenstrom', 'Rückmeldung Handschaltung',
        'Rückmeldung Nutzzeitverlängerung', 'Rückmeldung Ventil', 'Rückmeldung Zeitplan', 'Rückmeldung Grenzwert Soll Ist Abweichung Temperatur', 'Sollwert Grenzwert Soll Ist Abweichung Temperatur', 'Schaltbefehl Anlage',
        'Sollwert Druck', 'Sollwert Feuchte', 'Sollwert Feuchte Max', 'Sollwert Feuchte Min', 'Sollwert Frostschutz', 'Sollwert Temperatur', 'Sollwert Temperatur Min', 'Sollwert Temperatur Max', 'Sollwert CO2-Konzentration',
        'Sollwert CO2-Konzentration Max', 'Sollwert Volumenstrom', 'Sollwert Volumenstrom Max', 'Sollwert Volumenstrom Min', 'Störmeldung', 'Warnmeldung CO2 Hoch', 'Warnmeldung Feuchte', 'Warnmeldung Temperatur Hoch',
        'Warnmeldung Temperatur Niedrig', 'Wartungsmeldung']
      const labelKlappe = ['Alarmmeldung', 'Befehlsausführkontrolle', 'Rückmeldung Betrieb', 'Rückmeldung Klappe Auf', 'Rückmeldung Klappe Zu', 'Rückmeldung Handschaltung', 'Rückmeldung Stellsignal', 'Schaltbefehl', 'Störmeldung', 'Stellbefehl', 'Sollwert Stellsignal']
      const labelBefeuchter = ['Rückmeldung Betrieb', 'Betriebsstunden', 'Sollwert Befeuchten', 'Stellbefehl', 'Störmeldung', 'Schaltbefehl']
      const labelEntrauchung = ['Rückmeldung Betrieb', 'Wartungsmeldung', 'Störmeldung', 'Schaltbefehl']
      const labelErhitzer = ['Alarmmeldung', 'Anzahl Schaltungen', 'Betriebsstunden', 'Messwert Durchfluss', 'Messwert Energieverbrauch', 'Messwert Leistungsaufnahme', 'Messwert Rücklauftemperatur', 'Messwert Stromaufnahme', 'Messwert Vorlauftemperatur', 'Messwert Drehzahl', 'Reset Betriebsstunden', 'Rückmeldung Handschaltung Pumpe', 'Rückmeldung Handschaltung Ventil', 'Rückmeldung Betrieb', 'Rückmeldung Stellsignal', 'Schaltbefehl', 'Schaltbefehl Blockierschutz', 'Schaltbefehl Frostschutz', 'Sollwert Frostschutz', 'Sollwert Laufzeit Blockierschutz', 'Sollwert Nacht', 'Sollwert Nachlaufzeit', 'Sollwert Dauerfreigabe', 'Sollwert Tag', 'Status Übersteuern-Ein', 'Stellbefehl Ventil', 'Störmeldung', 'Wartungsintervall', 'Wartungsmeldung', 'Grenzwert Rücklauftemperatur']
      const labelFilter = ['Messwert Druck', 'Wartungsmeldun -Abluft', 'Wartungsmeldung Zuluft', 'Wartungsmeldung Fortluft', 'Wartungsmeldung Außenluft', 'Wartungsmeldung Filter', 'Störmeldung']
      const labelGerätAllgemein = ['Alarmmeldung', 'Anforderung Tableau', 'Messwert Außentemperatur', 'Sollwert Kühlbedarf', 'Schaltbefehl Anlage', 'Übersteuert', 'Rückmeldung Anfahrbetrieb', 'Rückmeldung Batterie', 'Rückmeldung Betrieb', 'Rückmeldung Handschaltung', 'Rückmeldung Quittierung', 'Rückmeldung Freie Nachtkühlung', 'Rückmeldung Ferienprogramm', 'Rückmeldung Nutzzeitverlängerung', 'Rückmeldung Restlaufzeit Nutzzeitverlängerung', 'Rückmeldung Spülen', 'Schaltbefehl Nachtkühlung', 'Schaltbefehl Optimierte Luftqualität', 'Schaltbefehl Tagesprogramm', 'Schaltbefehl Nutzzeitverlängerung', 'Sollwert Feuchte', 'Sollwert Spülzeit', 'Sollwert Freie-Nachtkühlung', 'Sollwert Nutzzeitverlängerung', 'Sollwert Wärmebedarf', 'Sollwert Maximale Einschaltverzögerung', 'Störmeldung', 'Rückmeldung Anlage Fern', 'Schaltbefehl Anlage Fern']
      const labelKühler = ['Alarm Frostschutz', 'Anzahl Schaltungen', 'Betriebsstunden', 'Messwert Rücklauftemperatur', 'Messwert Vorlauftemperatur', 'Rückmeldung Klappe Auf', 'Rückmeldung Betrieb', 'Rückmeldung Stellsignal', 'Sollwert Kühlbedarf', 'Stellbefehl Ventil', 'Zählwert Kühlwasser', 'Zählwert Kältemenge']
      const labelRaumRlt = ['Alarmmeldung', 'Alarme Zurück Gestellt', 'Betriebsmeldung Präsenzmelder', 'Messwert Feuchte', 'Messwert CO2', 'Messwert Raumtemperatur', 'Rückmeldung Betrieb', 'Rückmeldung Ventil', 'Rückmeldung Klappe Auf', 'Rückmeldung Kommunikation', 'Sollwert Ausschaltverzögerung', 'Sollwert Einschaltverzögerung', 'Sollwert CO2', 'Sollwert CO2 Max', 'Sollwert Feuchte', 'Sollwert Raumtemperatur', 'Störmeldung', 'Warnmeldung CO2 Hoch', 'Warnmeldung Feuchte', 'Warnmeldung Temperatur Hoch', 'Warnmeldung Temperatur Niedrig']
      const labelUmluft = ['Rückmeldung Klappe Auf', 'Rückmeldung Klappe Zu', 'Schaltbefehl', 'Stellbefehl', 'Rückmeldung Betrieb', 'Rückmeldung Handschaltung']
      const labelVsr = ['Schaltbefehl', 'Rückmeldung Stellsignal', 'Stellbefehl', 'Rückmeldung Handschaltung']
      const labelWrg = ['Alarmmeldung', 'Messwert Temperatur Austritt Zuluft', 'Messwert Temperatur Eintritt Zuluft', 'Messwert Temperatur Eintritt Abluft', 'Messwert Temperatur Austritt Abluft', 'Messwert Vorlauftemperatur', 'Pumpe', 'Rückmeldung Betrieb', 'Rückmeldung Handschaltung', 'Rückmeldung Stellsignal', 'Schaltbefehl', 'Sollwert Frostschutz', 'Sollwert Stellsignal', 'Sollwert Stellsignal Min', 'Sollwert Stellsignal Max', 'Stellbefehl', 'Stellbefehl WRG Bypass', 'Störmeldung']
      const bacnetArrayDatenpunktEbene = []
      let result
      console.log(bacnetArrayDritteEbene)
      for (const element in bacnetArrayDritteEbene) {
        const grundfunktion = bacnetArrayDritteEbene[element].grundfunktionLabel
        const zweiteFunktion = bacnetArrayDritteEbene[element].zweiteGrundfunktionLabel
        const komponente = bacnetArrayDritteEbene[element].dritteEbeneLabel
        let candidateLabels
        if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'Pumpe') {
          candidateLabels = labelPumpe
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'HeizkreisAllgemein') {
          candidateLabels = labelHeizkreisAllgemein
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'Raum') {
          candidateLabels = labelRaum
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'Ruecklauf') {
          candidateLabels = labelRücklauf
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'Ventil') {
          candidateLabels = labelVentil
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Verteilen' && komponente === 'Vorlauf') {
          candidateLabels = labelVorlauf
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Erzeugen' && komponente === 'BHKW') {
          candidateLabels = labelBhkw
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Erzeugen' && komponente === 'Kessel') {
          candidateLabels = labelKessel
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Erzeugen' && komponente === 'Pelletkessel') {
          candidateLabels = labelPelletkessel
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Erzeugen' && komponente === 'Waermepumpe') {
          candidateLabels = labelWärmepumpe
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Beziehen') {
          candidateLabels = labelBeziehen
        } else if (grundfunktion === 'WaermeVersorgen' && zweiteFunktion === 'Speichern') {
          candidateLabels = labelSpeichern
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'AbluftAllgemein') {
          candidateLabels = labelAbluftAllgemein
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Abluftklappe') {
          candidateLabels = labelKlappe
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'KlappenAllgemein') {
          candidateLabels = labelKlappe
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Kühler') {
          candidateLabels = labelKühler
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Umluft') {
          candidateLabels = labelUmluft
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Ventilator') {
          candidateLabels = labelZuluftventilator
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Wärmerückgewinnung') {
          candidateLabels = labelWrg
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'ZuluftAllgemein') {
          candidateLabels = labelZuluftAllgemein
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Zuluftklappe') {
          candidateLabels = labelKlappe
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Zuluftventilator') {
          candidateLabels = labelZuluftventilator
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Abluftventilator') {
          candidateLabels = labelAbluftventilator
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Außenluftklappe') {
          candidateLabels = labelKlappe
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Befeuchter') {
          candidateLabels = labelBefeuchter
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Entrauchung') {
          candidateLabels = labelEntrauchung
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Erhitzer') {
          candidateLabels = labelErhitzer
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Filter') {
          candidateLabels = labelFilter
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'Fortluftklappe') {
          candidateLabels = labelKlappe
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftBereitstellen' && komponente === 'GerätAllgemein') {
          candidateLabels = labelGerätAllgemein
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftVerteilen' && komponente === 'Raum') {
          candidateLabels = labelRaumRlt
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftVerteilen' && komponente === 'VolumenstromreglerAbluft') {
          candidateLabels = labelVsr
        } else if (grundfunktion === 'LuftVersorgen' && zweiteFunktion === 'LuftVerteilen' && komponente === 'VolumenstromreglerZuluft') {
          candidateLabels = labelVsr
        } else {
          bacnetArrayDatenpunktEbene.push({
            name: bacnetArrayDritteEbene[element].name,
            description: bacnetArrayDritteEbene[element].description,
            grundfunktionLabel: bacnetArrayDritteEbene[element].grundfunktionLabel,
            grundfunktionScore: bacnetArrayDritteEbene[element].grundfunktionScore,
            zweiteGrundfunktionLabel: bacnetArrayDritteEbene[element].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: bacnetArrayDritteEbene[element].zweiteGrundfunktionScore,
            dritteEbeneLabel: bacnetArrayDritteEbene[element].dritteEbeneLabel,
            dritteEbeneScore: bacnetArrayDritteEbene[element].dritteEbeneScore,
            datenpunktLabel: 'Noch nicht ausgeprägt',
            datenpunktScore: 0,
            input: bacnetArrayDritteEbene[element].input,
            data: bacnetArrayDritteEbene[element].data,
            key: bacnetArrayDritteEbene[element].key
          })
          continue
        }
        // console.log(candidateLabels)
        const inputHF = bacnetArrayDritteEbene[element].input
        // console.log(inputHF)
        const hypothese = 'Der Datenpunkt beschreibt: {}.'
        /*
        const labelsLength = candidateLabels.length
        // let numberOfChunks = 0
        const chuncksArray = []
        const chunkSize = 10
        if (labelsLength > 10) {
          for (let i = 0; i < candidateLabels.length; i += chunkSize) {
            const chunk = candidateLabels.slice(i, i + chunkSize)
            chuncksArray.push({
              chunck: chunk
            })
          }
        }
        console.log(chuncksArray)
        if (chuncksArray.length === 0) {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/mboth/klassifizierungDatenpunkteNLI',
            // 'https://wud35qw7z2z6jh5f.eu-west-1.aws.endpoints.huggingface.cloud',
            {
              headers: { Authorization: 'Bearer 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' },
              // headers: { Authorization: 'Bearer SxMgRdoPkIocLyTWtBuJHBqtPqNhlpjMBuMuEVtnRggnzRDCsIFMWpOXMAJnnqUyyAbQfpkLpqnsyXVWYRNgzMRFSApCRjSKdQaFBUFwboHrHvTfVKkWYWUTWhimpqdo', 'Content-Type': 'application/json' },
              method: 'POST',
              // body: JSON.stringify({ inputs: bacnetArrayDritteEbene[element].input, parameters: { candidate_labels: candidateLabels } })
              body: JSON.stringify({ inputs: inputHF, parameters: { candidate_labels: candidateLabels, hypothesis_template: hypothese }, options: { wait_for_model: true } })
              // options: { wait_for_model: true }
            }
          )
          result = await response.json()
          console.log(result)
        } else {
          const chunckLabels = []
          for (const element in chuncksArray) {
            const candidateLabels = chuncksArray[element].chunck
            console.log(candidateLabels)
            const response = await fetch(
              'https://api-inference.huggingface.co/models/mboth/klassifizierungDatenpunkteNLI',
              // 'https://wud35qw7z2z6jh5f.eu-west-1.aws.endpoints.huggingface.cloud',
              {
                headers: { Authorization: 'Bearer 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' },
                // headers: { Authorization: 'Bearer SxMgRdoPkIocLyTWtBuJHBqtPqNhlpjMBuMuEVtnRggnzRDCsIFMWpOXMAJnnqUyyAbQfpkLpqnsyXVWYRNgzMRFSApCRjSKdQaFBUFwboHrHvTfVKkWYWUTWhimpqdo', 'Content-Type': 'application/json' },
                method: 'POST',
                // body: JSON.stringify({ inputs: bacnetArrayDritteEbene[element].input, parameters: { candidate_labels: candidateLabels } })
                body: JSON.stringify({ inputs: inputHF, parameters: { candidate_labels: candidateLabels, hypothesis_template: hypothese }, options: { wait_for_model: true } })
                // options: { wait_for_model: true }
              }
            )
            result = await response.json()
            console.log(result)
            chunckLabels.push({
              scores: result
            })
          }
          console.log(chunckLabels)
        }
        */
        const response = await fetch(
          // Muss angepasst werden wenn der Endpoint neu hochgefahren wird
          // 'https://api-inference.huggingface.co/models/mboth/klassifizierungDatenpunkteNLI',
          'https://gl95ydojcmmebc96.eu-west-1.aws.endpoints.huggingface.cloud',
          {
            // headers: { Authorization: 'Bearer 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' },
            headers: { Authorization: 'Bearer SxMgRdoPkIocLyTWtBuJHBqtPqNhlpjMBuMuEVtnRggnzRDCsIFMWpOXMAJnnqUyyAbQfpkLpqnsyXVWYRNgzMRFSApCRjSKdQaFBUFwboHrHvTfVKkWYWUTWhimpqdo', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ inputs: inputHF, parameters: { candidate_labels: candidateLabels, hypothesis_template: hypothese } })
            // body: JSON.stringify({ inputs: inputHF, parameters: { candidate_labels: candidateLabels, hypothesis_template: hypothese }, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        // console.log(result)
        bacnetArrayDatenpunktEbene.push({
          name: bacnetArrayDritteEbene[element].name,
          description: bacnetArrayDritteEbene[element].description,
          grundfunktionLabel: bacnetArrayDritteEbene[element].grundfunktionLabel,
          grundfunktionScore: bacnetArrayDritteEbene[element].grundfunktionScore,
          zweiteGrundfunktionLabel: bacnetArrayDritteEbene[element].zweiteGrundfunktionLabel,
          zweiteGrundfunktionScore: bacnetArrayDritteEbene[element].zweiteGrundfunktionScore,
          dritteEbeneLabel: bacnetArrayDritteEbene[element].dritteEbeneLabel,
          dritteEbeneScore: bacnetArrayDritteEbene[element].dritteEbeneScore,
          datenpunktLabel: result.labels[0],
          datenpunktScore: result.scores[0],
          input: bacnetArrayDritteEbene[element].input,
          data: bacnetArrayDritteEbene[element].data,
          key: bacnetArrayDritteEbene[element].key
        })
        // console.log(bacnetArrayDatenpunktEbene)
      }
      console.log(bacnetArrayDatenpunktEbene)
      if (typeof bacnetArrayDatenpunktEbene[0].key !== 'undefined') {
        this.$store.dispatch('editBacnetDatapoint', bacnetArrayDatenpunktEbene)
      } else {
        this.$store.dispatch('addGrundfunktionToBacnet', bacnetArrayDatenpunktEbene)
      }
      this.loading = false
      this.loading1 = false
    }
  },
  created () {
    this.energyUseGroup = [
      { name: 'Wärme versorgen', pic: require('@/assets/heizung.svg'), link: '/waermeversorgen' },
      { name: 'Kälte versorgen', pic: require('@/assets/kuehlung.svg'), link: '/kaelteversorgen' },
      { name: 'Luft versorgen', pic: require('@/assets/lueftung.svg'), link: 'luftversorgen' },
      { name: 'Medien versorgen', pic: require('@/assets/medien.svg'), link: 'medienversorgen' },
      { name: 'Sichern', pic: require('@/assets/sichern.svg'), link: 'sichern' },
      { name: 'Strom versorgen', pic: require('@/assets/elektro.svg'), link: 'stromversorgen' },
      { name: 'Befördern', pic: require('@/assets/befördern.svg'), link: 'befoerdern' },
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
