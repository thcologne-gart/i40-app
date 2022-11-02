<template>
    <v-card class="mx-auto my-8" elevation="2" max-width="80%">
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
                                <td class="text-left">{{ item.zweiteGrundfunktionLabel }}</td>
                                <td class="text-left">{{ item.zweiteGrundfunktionScore }}</td>
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
                                        <v-btn class="mx-auto my-6" v-bind="attrs" v-on="on" color="outline-secondary" id= "buttons-card">
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
                                            >Edit Klassifizierung zweite Grundfunktion</v-toolbar>
                                            <v-container>
                                                <v-card-text>
                                                <v-row>
                                                    <p class="text-left black--text">{{ item.name }}</p>
                                                </v-row>
                                                <v-row>
                                                    <p class="text-left black--text">{{ item.description }}</p>
                                                </v-row>
                                                <v-row>
                                                    <p class="text-left black--text">Label: {{ item.zweiteGrundfunktionLabel }}</p>
                                                </v-row>
                                                <v-row>
                                                    <p class="text-left black--text">Score: {{ item.zweiteGrundfunktionScore }}</p>
                                                </v-row>
                                                <v-select v-if="item.grundfunktionLabel == 'WaermeVersorgen'" :items="funktionenWärme" v-model="neueFunktion" label= 'Korrektes Label' />
                                                <v-select v-if="item.grundfunktionLabel == 'KaelteVersorgen'" :items="funktionenKälte" v-model="neueFunktion" label= 'Korrektes Label' />
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
</template>

<script>
export default {
  data: () => ({
    show: false,
    neueFunktion: '',
    funktionenWärme: ['Verteilen', 'Erzeugen', 'Beziehen', 'Speichern'],
    funktionenKälte: ['Verteilen', 'Erzeugen', 'Speichern'],
    funktionenLuft: ['Verteilen', 'Erzeugen', 'Beziehen', 'Speichern']
  }),
  props: {
    grundfunktion: Array
  },
  computed: {
    bacnetDataUnsure () {
      console.log(this.grundfunktion)
      const loadedBacnetData = this.grundfunktion
      const bacnetDataArrayUnsure = []
      for (const data in loadedBacnetData) {
        const input = loadedBacnetData[data].text + ',' + loadedBacnetData[data].name
        if (loadedBacnetData[data].zweiteGrundfunktionScore < 1.0) {
          bacnetDataArrayUnsure.push({
            data: loadedBacnetData[data].data,
            key: loadedBacnetData[data].key,
            name: loadedBacnetData[data].name,
            description: loadedBacnetData[data].description,
            grundfunktionLabel: loadedBacnetData[data].grundfunktionLabel,
            grundfunktionScore: loadedBacnetData[data].grundfunktionScore,
            zweiteGrundfunktionLabel: loadedBacnetData[data].zweiteGrundfunktionLabel,
            zweiteGrundfunktionScore: loadedBacnetData[data].zweiteGrundfunktionScore,
            dritteEbeneLabel: loadedBacnetData[data].dritteEbeneLabel,
            dritteEbeneScore: loadedBacnetData[data].dritteEbeneScore,
            datenpunktLabel: loadedBacnetData[data].datenpunktLabel,
            datenpunktScore: loadedBacnetData[data].datenpunktScore,
            input: input
          })
        }
      }
      console.log(bacnetDataArrayUnsure)
      return bacnetDataArrayUnsure
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      // Reset our form values

      // this.form.country = null
      this.neueFunktion = ''
    },
    labelCorrect (item) {
      console.log(item)
      this.$store.dispatch('labelCorrectZweiteGrundfunktion', item)
    }
  }
}
</script>
