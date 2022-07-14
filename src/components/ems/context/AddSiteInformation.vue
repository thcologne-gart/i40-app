<template>
    <div>
      <v-card id ="cardSiteForm" class="mx-auto my-12" elevation="4" max-width="60%">
        <v-card-title id="card-title">Standortinformationen</v-card-title>
        <v-container>
          <v-form @submit="onCreateSiteAas" @reset="onReset">

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
            <v-text-field
            id="number-buildings"
            v-model.number="form.numberBuildings"
            label="Standort (Anzahl der Gebäude)"
            required
            ></v-text-field>

          <v-btn id="buttons-card" type="submit" variant="outline-secondary">Submit</v-btn>
          <v-btn id="buttons-card" type="reset" variant="outline-secondary">Reset</v-btn>
          </v-form>
        </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        country: '',
        numberSite: '',
        city: '',
        zipcode: null,
        numberBuildings: null
      },
      countries: ['Deutschland', 'Österreich', 'Schweiz', 'Frankreich', 'Italien', 'England']
    }
  },
  props: {
    site: Number
  },
  // mounted () {
  // this.showForm()
  // },
  methods: {
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
      console.log(this.site)
      // const card = document.getElementById('cardOrganizationForm')
      // card.classList.add('d-none')
      // console.log(typeof this.form.numberOfSites)
      event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.form.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/site-information/${this.form.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `site-aas/${this.form.city}`
      }
      newAas.idShort = `SiteAas/${this.form.city}`
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
        id: `submodels/site-information/${this.form.city}`
      }
      newSubmodel.idShort = 'Site Information'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.form.country,
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
          value: this.form.city,
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
          value: this.form.zipcode,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/zipcode',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'ZipCode',
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
          value: this.form.numberBuildings,
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
          value: this.site,
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

      console.log(newAas)
      this.$emit('new-aas', newAas)
      // this.form.country = null
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values

      // this.form.country = null
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
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
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
</style>
