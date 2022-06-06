<template>
    <div>
      <div class="mb-3">
        <b-button v-b-toggle.my-collapse variant="outline-secondary">Gebäude hinzufügen</b-button>
      </div>
      <b-collapse id="my-collapse">
        <b-card id ="cardBuildingForm" class="shadow p-3 mb-5 bg-white rounded">
                <b-form @submit="onCreateBuildingAas" @reset="onReset">

                <b-form-group
                    id="designation"
                    label="Bezeichnung:"
                    label-for="designation"
                >
                    <b-form-input
                    id="designation"
                    v-model.number="form.designation"
                    placeholder="Bezeichnung des Gebäudes"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="street"
                    label="Straße und Hausnummer:"
                    label-for="street"
                >
                    <b-form-input
                    id="street"
                    v-model.number="form.street"
                    placeholder="Straße und Hausnummer"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="outline-secondary">Submit</b-button>
                <b-button type="reset" variant="outline-secondary">Reset</b-button>
                </b-form>
            </b-card>
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
    buildingNumber: Number,
    buildings: Array
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
        id: `site-aas/${this.form.designation}`
      }
      newAas.idShort = `SiteAas/${this.form.designation}`
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
          value: this.buildingNumber,
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
    color: #025939;
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
