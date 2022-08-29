<template>
    <div>
          <div class="mb-3">
            <v-btn id="button-add-buidling" v-b-toggle.my-collapse variant="outline-secondary">Gebäude hinzufügen</v-btn>
          </div>
          <b-collapse id="my-collapse">
            <v-card id ="cardBuildingForm" class="mx-auto my-12" elevation="4" max-width="75%">
              <v-form @submit="onCreateBuildingAas" @reset="onReset">
                <v-container>
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
                </v-container>
                <v-btn id="buttons-card" type="submit" variant="outline-secondary">Submit</v-btn>
                <v-btn id="buttons-card" type="reset" variant="outline-secondary">Reset</v-btn>
              </v-form>
            </v-card>
          </b-collapse>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        street: '',
        designation: ''
      }
    }
  },
  props: {
    site: Number,
    numberOfBuildings: Array,
    building: Number,
    buildings: Array
  },
  computed: {
    buildingsForButton () {
      // console.log(this.building)
      console.log(this.$store.getters.loadedBuildingInformation)
      return this.$store.getters.loadedBuildingInformation
    }
  },
  // mounted () {
  // this.showForm()
  // },

  methods: {
    /*
    showForm () {
      // console.log(this.site)
      // console.log(this.buildingNumber)
      console.log(this.buildings)
      const card = document.getElementById('cardBuildingForm')
      const item = this.buildingNumber

      if (this.site === this.buildings[item].numberOfSite && this.buildingNumber === this.buildings[item].buildingNumber) {
        console.log('yeeeeah')
        card.classList.add('d-none')
      }
    },
    */
    onCreateBuildingAas (event) {
      event.preventDefault()
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
          value: this.site,
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
          value: this.building,
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

      console.log(newAas)
      this.$emit('new-aas', newAas)
      // this.form.country = null
      this.form.street = ''
      this.form.designation = ''
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values

      // this.form.country = null
      this.form.street = ''
      this.form.designation = ''
    }
  }
}
</script>
<style scoped>
#button-add-buidling {
  margin-top:20px;
}
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
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
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
</style>
