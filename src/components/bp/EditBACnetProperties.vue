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
                                                <v-select v-if="item.grundfunktionLabel == 'MedienVersorgen'" :items="funktionenMedien" v-model="neueFunktion" label= 'Korrektes Label' />
                                                <v-select v-if="item.grundfunktionLabel == 'LuftVersorgen'" :items="funktionenLuft" v-model="neueFunktion" label= 'Korrektes Label' />
                                                <v-select v-if="item.grundfunktionLabel == 'Sichern'" :items="funktionenSichern" v-model="neueFunktion" label= 'Korrektes Label' />
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
    funktionenLuft: ['Bereitstellen', 'Verteilen'],
    funktionenSichern: ['Brandmeldeanlage', 'Brandschutzklappe', 'Rauchmeldeanlage', 'Sichern Allgemein'],
    funktionenMedien: ['Bereitstellen', 'Verteilen', 'Speichern', 'Entsorgen']
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
        const input = loadedBacnetData[data].description + ',' + loadedBacnetData[data].name
        if (loadedBacnetData[data].zweiteGrundfunktionScore < 0.9) {
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
    },
    async editBacnetProperty (item) {
      console.log(item)
      const bacnetArrayDritteEbene = []
      let result
      // const hfOptions = { wait_for_model: true }
      if (item.grundfunktionLabel === 'WaermeVersorgen' && this.neueFunktion === 'Verteilen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeVerteilen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: item.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Verteilen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: result[0][0].label,
          dritteEbeneScore: result[0][0].score,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'WaermeVersorgen' && this.neueFunktion === 'Erzeugen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungWaermeErzeugen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: item.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Erzeugen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: result[0][0].label,
          dritteEbeneScore: result[0][0].score,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'WaermeVersorgen' && this.neueFunktion === 'Beziehen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Beziehen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Fernwärme',
          dritteEbeneScore: 1.0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'WaermeVersorgen' && this.neueFunktion === 'Speichern') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Speichern',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Speicher',
          dritteEbeneScore: 1.0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'LuftVersorgen' && this.neueFunktion === 'Bereitstellen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftBereitstellen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: item.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'LuftBereitstellen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: result[0][0].label,
          dritteEbeneScore: result[0][0].score,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'LuftVersorgen' && this.neueFunktion === 'Verteilen') {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/mboth/klassifizierungLuftVerteilen',
          {
            headers: { Authorization: 'Bearer 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' },
            method: 'POST',
            body: JSON.stringify({ inputs: item.input, options: { wait_for_model: true } })
            // options: { wait_for_model: true }
          }
        )
        result = await response.json()
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'LuftVerteilen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: result[0][0].label,
          dritteEbeneScore: result[0][0].score,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'Sichern' && this.neueFunktion === 'Brandmeldeanlage') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Brandmeldeanlage',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'Sichern' && this.neueFunktion === 'Rauchmeldeanlage') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Rauchmeldeanlage',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'Sichern' && this.neueFunktion === 'Brandschutzklappe') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Brandschutzklappe',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'Sichern' && this.neueFunktion === 'Sichern Allgemein') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'SichernAllgemein',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'MedienVersorgen' && this.neueFunktion === 'Bereitstellen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Bereitstellen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'MedienVersorgen' && this.neueFunktion === 'Verteilen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Verteilen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'MedienVersorgen' && this.neueFunktion === 'Speichern') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Speichern',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'MedienVersorgen' && this.neueFunktion === 'Entsorgen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Entsorgen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'KaelteVersorgen' && this.neueFunktion === 'Verteilen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Verteilen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'KaelteVersorgen' && this.neueFunktion === 'Erzeugen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Erzeugen',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'KaelteVersorgen' && this.neueFunktion === 'Speichern') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Speichern',
          zweiteGrundfunktionScore: 1.0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      } else if (item.grundfunktionLabel === 'Befoerdern' || item.grundfunktionLabel === 'StromVersorgen' || item.grundfunktionLabel === 'AndereAnlagen') {
        bacnetArrayDritteEbene.push({
          name: item.name,
          description: item.description,
          grundfunktionLabel: item.grundfunktionLabel,
          grundfunktionScore: item.grundfunktionScore,
          zweiteGrundfunktionLabel: 'Noch nicht ausgeprägt',
          zweiteGrundfunktionScore: 0,
          dritteEbeneLabel: 'Noch nicht ausgeprägt',
          dritteEbeneScore: 0,
          input: item.input,
          data: item.data,
          key: item.key
        })
      }
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
        console.log(candidateLabels)
        const inputHF = bacnetArrayDritteEbene[element].input
        // console.log(inputHF)
        const hypothese = 'Der Datenpunkt beschreibt: {}.'
        const response = await fetch(
          // Muss angepasst werden wenn der Endpoint neu hochgefahren wird
          // 'https://api-inference.huggingface.co/models/mboth/klassifizierungDatenpunkteNLI',
          'https://nnrpnfrazle3thts.eu-west-1.aws.endpoints.huggingface.cloud',
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
      this.$store.dispatch('editBacnetDatapoint', bacnetArrayDatenpunktEbene)
    }
  }
}
</script>
