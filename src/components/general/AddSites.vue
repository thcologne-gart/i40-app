<template>
  <v-row>
    <v-col md = "4">
        <v-card color="grey lighten-3" class="mx-auto my-6" max-width="90%" min-height="200px">
        </v-card>
    </v-col>
    <v-col md = "8">
        <v-card id ="cardSiteForm" color="grey lighten-3" max-width="90%" class="mx-auto my-6" min-height="200px">
            <div v-if="numberOfSites >= 1">
                <div v-for="site in sites" :key="site[2].value">
                    <ShowSiteInformation :site="site" />
                </div>
            </div>
            <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mx-auto my-6" v-bind="attrs" v-on="on" color="outline-secondary" id= "buttons-card">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar
                        color="#5D3FD3"
                        dark
                        >Standort hinzufügen</v-toolbar>
                        <v-container>
                            <v-form>
                              <!--
                                <v-select :items="countries" v-model="form.country" label= 'Standort(Land)' />
                                <v-text-field
                                id="city"
                                v-model="form.city"
                                label="Standort (Stadt)"
                                required
                                ></v-text-field>

                                <v-text-field
                                id="zipcode"
                                v-model.number="form.zipcode"
                                label="Standort (Postleitzahl)"
                                required
                                ></v-text-field>
                              -->
                                <GmapAutocomplete class="introInput" @place_changed='setPlace'>
                                  <template v-slot:default="slotProps">
                                    <v-text-field label="Standort der Liegenschaft"
                                    placeholder = ''
                                                  ref="input"
                                                  v-on:listeners="slotProps.listeners"
                                                  v-on:attrs="slotProps.attrs">
                                    </v-text-field>
                                  </template>
                                </GmapAutocomplete>
                                <!-- <v-text-field
                                id="number-buildings"
                                v-model.number="form.numberBuildings"
                                label="Standort (Anzahl der Gebäude)"
                                required
                                ></v-text-field> -->
                            </v-form>
                        </v-container>
                        <v-card-actions class="justify-end">
                        <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; onCreateSiteAas()">Submit</v-btn>
                        <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; onReset()">Reset</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ShowSiteInformation from '@/components/general/ShowSiteInformation.vue'

export default {
  data () {
    return {
      /*
      form: {
        country: '',
        numberSite: '',
        city: '',
        zipcode: null,
        numberBuildings: null
      },
      */
      currentPlace: null,
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      lat: '',
      lng: '',
      countries: ['Deutschland', 'Österreich', 'Schweiz', 'Frankreich', 'Italien', 'England']
    }
  },
  components: { ShowSiteInformation },
  // props: {
  // site: Number
  // },
  // mounted () {
  // this.showForm()
  // },
  computed: {
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformation)
      return this.$store.getters.loadedOrganizationInformation
    },
    sites () {
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    },
    numberOfSites () {
      // let loadInfos = 0
      const loadInfos = this.$store.getters.loadedSiteInformation
      let numberS
      if (loadInfos === null) {
        numberS = 1
      } else {
        numberS = loadInfos.length + 1
      }
      console.log(numberS)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      // console.log(numberOfSites)
      return numberS
    }
  },
  methods: {
    setPlace (place) {
      console.log(place.address_components)
      this.currentPlace = place
      const location = place.address_components
      for (const element in location) {
        if (location[element].types[0] === 'country') {
          this.country = location[element].long_name
        } else if (location[element].types[0] === 'locality') {
          this.city = location[element].long_name
        } else if (location[element].types[0] === 'street_number') {
          this.streetNumber = location[element].long_name
        } else if (location[element].types[0] === 'route') {
          this.street = location[element].long_name
        }
      }
      this.lat = this.currentPlace.geometry.location.lat()
      this.lng = this.currentPlace.geometry.location.lng()
      console.log(this.country, this.city, this.street, this.streetNumber)
    },
    /*
    addMarker () {
      if (this.currentPlace) {
        console.log(this.currentPlace.geometry.location.lat())
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        console.log(marker)
        console.log(this.markers[0])
      }
    },
    */
    /*
    showForm () {
      console.log(this.site)
      console.log(this.siteAlreadyFilled.length)
      const card = document.getElementById('cardSiteForm')
      // const alreadyFilled = this.siteAlreadyFilled[0].value
      console.log('jiiii')
      if (this.site <= this.siteAlreadyFilled.length) {
        console.log('nicht null')
        card.classList.add('d-none')
      } else {
        console.log('hääääää')
        // card.classList.add('d-none')
      }
    },
    */
    onCreateSiteAas (event) {
      // console.log(this.site)
      // const card = document.getElementById('cardOrganizationForm')
      // card.classList.add('d-none')
      console.log(this.numberOfSites)
      const thisSiteNumber = this.numberOfSites
      // event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/site-information/${this.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `site-aas/${this.city}`
      }
      newAas.idShort = `SiteAas/${this.city}`
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'site/information-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: `submodels/site-information/${this.city}`
      }
      newSubmodel.idShort = 'Site Information'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.country,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/country',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Country',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.city,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/city',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'City',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.street,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/street',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Street',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.streetNumber,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/streetNumber',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'StreetNumber',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.lat,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/lattitude',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Lattitude',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'REAL'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.lng,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/longitude',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Longitude',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'REAL'
            }
          },
          kind: 'Instance'
        },
        {
          value: 0,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/numberBuildings',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfBuildings',
          category: 'PARAMETER',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        {
          value: thisSiteNumber,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/numberSite',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfSite',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        }
      ]

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)

      const numberOfSitesForOrgaSubmodel = {
        value: thisSiteNumber,
        semanticId: {
          keys: [{
            type: 'GlobalReference',
            local: true,
            value: 'ems/context-semantics/numberOfSites',
            index: 0,
            idType: 'IRI'
          }]
        },
        constraints: [],
        idShort: 'NumberOfSites',
        category: 'PARAMETER',
        modelType: {
          name: 'Property'
        },
        valuetype: {
          dataObjectType: {
            name: 'INTEGER'
          }
        },
        kind: 'Instance'
      }

      console.log(numberOfSitesForOrgaSubmodel)

      this.$store.dispatch('updateNumberOfSites', {
        id: this.organization[0].key,
        numberOfSites: thisSiteNumber
      })

      this.$emit('new-aas', newAas)
      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    },
    onReset (event) {
      // event.preventDefault()
      // Reset our form values

      this.country = ''
      this.city = ''
      this.zipcode = ''
      this.numberBuildings = ''
    }
  }
}
</script>
<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 40px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
</style>
