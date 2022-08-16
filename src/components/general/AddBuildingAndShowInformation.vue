<template>
    <div>
        <v-card-actions>
            <v-btn
                color="#5D3FD3"
                text
                @click="show = !show"
            >
                {{ site[1].value }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <InformationFromSites :site="site"/>
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
                            >Gebäude hinzufügen</v-toolbar>
                            <v-container>
                                <v-form>
                                    <v-text-field
                                    id="designation"
                                    v-model="form.designation"
                                    label="Bezeichnung des Gebäudes"
                                    required
                                    ></v-text-field>
                                    <v-text-field
                                    id="street"
                                    v-model="form.street"
                                    label="Straße und Hausnummer"
                                    required
                                    ></v-text-field>
                                </v-form>
                            </v-container>
                            <v-card-actions class="justify-end">
                            <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; onCreateBuildingAas()">Submit</v-btn>
                            <v-btn id="buttons-card" variant="outline-secondary" @click="dialog.value = false; onReset()">Reset</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
import InformationFromSites from '@/components/general/InformationFromSites.vue'

export default {
  data: () => ({
    show: false,
    form: {
      street: '',
      designation: ''
    }
  }),
  props: {
    site: Array
  },
  components: {
    InformationFromSites
  },
  methods: {
    onCreateBuildingAas (event) {
      // event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.form.designation}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/building-information/${this.form.designation}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `building-aas/${this.form.designation}`
      }
      newAas.idShort = `BuildingAas/${this.form.designation}`
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'ems/building/information-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: `submodels/building-information/${this.form.designation}`
      }
      newSubmodel.idShort = 'Building Information'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.form.street,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/street',
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
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.form.designation,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/designation',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Designation',
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
          value: this.site[4].value,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/numberSite',
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
        },
        {
          value: this.site[3].value + 1,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/buildingNumber',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'BuildingNumber',
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

      console.log(newAas)
      console.log(newSubmodel)

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)

      this.$store.dispatch('updateNumberOfBuildingsInSite', {
        id: this.site[5].key,
        numberOfBuildings: this.site[3].value + 1
      })

      console.log(newAas)
      this.$emit('new-aas', newAas)
      // this.form.country = null
      this.form.street = ''
      this.form.designation = ''
    },
    onReset (event) {
      // event.preventDefault()
      // Reset our form values
      console.log(this.site)
      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    }
  }
}
</script>
