<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
        <h4 id = "component-title">{{ component.idShort }}</h4>
        <hr>
        <v-card
                class ="mx-auto my-4" max-width="70%" elevation="2"
                id="component-info"
            >
            <v-card-title class="justify-center">Properties</v-card-title>
            <hr>
            <v-row id ="property" v-for="property in semanticMatchingInformation" :key="property.semanticId">
                <v-col>
                    <div v-for="propertyValue in properties" :key="propertyValue.name">
                        <div v-if="propertyValue.name === property.name">
                            <div v-if="property.semantic_id.includes('component/device-information' ) === true || property.semantic_id.includes('0173-1#02-AAO677#002' ) === true">
                                <p id = "property">{{ property.name }}: {{ propertyValue.value }}</p>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col>
                    <div v-for="propertyValue in properties" :key="propertyValue.name">
                        <div v-if="propertyValue.name === property.name">
                            <div v-if="property.semantic_id.includes('component/device-information' ) === true || property.semantic_id.includes('0173-1#02-AAO677#002') === true">
                                <v-btn class="mr-3" variant="outline-secondary"  v-b-modal="component.componenElementCollectionId + property.name">Suche nach Property</v-btn>
                                <b-modal v-bind:id="component.componenElementCollectionId + property.name" hide-footer width="350px" persistent :title="property.name" >
                                    <p class="my-4">Would you like to search for the property {{ property.name }}?</p>
                                    <!--<p class="my-4">Möchten Sie nach dem Property {{ property.name }} suchen?</p>-->
                                    <p class="my-4">Definition: {{ property.definition }}</p>
                                    <p class="my-4">Semantic ID: {{ property.semantic_id }}</p>
                                    <p class="my-4">Unit: {{ property.unit }}</p>
                                    <p class="my-4">Data Type: {{ property.datatype }}</p>
                                    <p class="my-4">Type: {{ property.submodel_element_sub }}</p>
                                    <p class="my-4">Category: {{ property.category }}</p>
                                    <hr>
                                    <v-btn class="mt-3" v-b-modal="property.name" variant="outline-secondary" @click="onSearchProperty (property, component)">Search</v-btn>
                                </b-modal>

                                <b-modal v-bind:id="property.name" hide-footer width="350px" persistent title="Matching Ergebnis" >
                                    <div v-if="matchedProperty != null">
                                        <p>Name: {{ matchedProperty[0] }}</p>
                                        <p>Definition: {{ matchedProperty[1] }}</p>
                                        <p>Value: {{ matchedProperty[2] }}</p>
                                        <p>Similarity: {{ matchedProperty[3] }}</p>
                                        <hr>
                                        <v-btn id = "abo-button" class="mt-3" variant="outline-secondary" @click="yesAbo (property, component, matchedProperty)">Hinzufügen</v-btn>
                                        <v-btn class="mt-3" variant="outline-danger" block @click="noAbo (property)">Nicht hinzufügen</v-btn>
                                    </div>
                                </b-modal>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <div v-for="pdf in energySourceComponentsDataSheets" :key="pdf.pdfUrl">
              <div v-if="pdf.componentName === component.idShort">
                  <v-row id ="loaded-pdf">
                      <v-col><b-link v-bind:href = pdf.pdfUrl target="_blank">{{ pdf.pdfContent[0].idShort }}</b-link></v-col>
                      <v-col>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on ="on" id="button-delete" variant = "outline-secondary"><v-icon @click="onDeletePdf([pdf.pdfId, pdf.componentId, pdf.sourceGroupId, pdf.submodelId])" scale="1" variant="danger">mdi-close-circle-outline</v-icon></v-btn>
                          </template>
                          <span>Delete</span>
                        </v-tooltip>
                      </v-col>
                  </v-row>
              </div>
            </div>
        </v-card>
      </EmsGrid>
    </div>
</template>

<script>
import axios from 'axios'
import EmsChapter from '@/components/ems/EmsChapter.vue'
import EmsGrid from '@/components/ems/EmsGrid.vue'

export default {
  data () {
    return {
      matchedProperty: null,
      semanticMatchingInformation: '',
      properties: null
    }
  },
  components: { EmsGrid, EmsChapter },
  props: {
    energySource: Object,
    energySourceGroup: Object,
    component: Object,
    energySourceComponentsDataSheets: Object
  },
  mounted () {
    this.getProperties()
  },
  methods: {
    yesAbo (property, component, matchedProperty) {
      this.$bvModal.hide(property.name)
      const informationForUpdate = []
      informationForUpdate.push({
        submodelKey: this.energySourceGroup.submodelKey,
        groupCollectionKey: this.energySourceGroup.elementCollectionId,
        componentKey: component.componenElementCollectionId,
        submodelElementIdShort: property.name,
        submodelElementId: property.propertyId,
        value: matchedProperty[2]
      })

      this.$store.dispatch('updateComponentInformation', informationForUpdate)
      this.getProperties()
    },
    noAbo (property) {
      this.$bvModal.hide(property.name)
    },
    getProperties () {
      console.log(this.energySourceComponents)
      const conceptDescriptions = this.$store.getters.loadedConceptDescriptions
      let allProperties
      const propertyArray = []
      const semanticMatching = []
      if (this.energySourceComponents.length !== 0) {
        allProperties = this.energySourceComponents[0].property
        // console.log(allProperties)
      }
      for (const property in allProperties) {
        if ('modelType' in allProperties[property] && allProperties[property].modelType.name === 'Property') {
          for (const cd in conceptDescriptions) {
            if (conceptDescriptions[cd].payload.idShort === allProperties[property].idShort) {
              semanticMatching.push({
                propertyId: property,
                name: allProperties[property].idShort,
                category: allProperties[property].category,
                semantic_id: allProperties[property].semanticId.keys[0].value,
                submodel_element_sub: allProperties[property].modelType.name,
                datatype: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.dataType,
                definition: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.definition[1].text,
                qualifier: 'NaN',
                unit: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.unit
              })

              propertyArray.push({
                value: allProperties[property].value,
                propertyId: property,
                name: allProperties[property].idShort,
                category: allProperties[property].category,
                semantic_id: allProperties[property].semanticId.keys[0].value,
                submodel_element_sub: allProperties[property].modelType.name,
                datatype: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.dataType,
                definition: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.definition[1].text,
                qualifier: 'NaN',
                unit: conceptDescriptions[cd].payload.embeddedDataSpecification[0].dataSpecificationContent.unit
              })
            }
          }
        }
      }
      console.log(propertyArray)
      this.semanticMatchingInformation = semanticMatching
      this.properties = propertyArray
      console.log(semanticMatching)
      // console.log(this.semanticMatchingInformation)
    },
    onSearchProperty (property, component) {
      this.$bvModal.hide(component.componenElementCollectionId + property.name)
      console.log(property)
      // Siehe für auflösen der CURS Fehler in vue.config.js nach
      axios.post('http://localhost:8080/GetAllSubmodelElementsBySemanticIdAndSemanticInformation', property)
        .then(response => (this.matchedProperty = response.data))
      // res.header('Access-Control-Allow-Origin', 'true')
    }
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      console.log(numberOfSites)
      return numberOfSites
    },
    energySourceComponents () {
      const energyTypeSubmodels = this.$store.getters.loadedEnergyTypeInformation
      let energySourceComponents
      for (const item in energyTypeSubmodels) {
        // console.log(energyTypeSubmodels[item])
        if (energyTypeSubmodels[item][0].submodelId === this.energySourceGroup.submodelId) {
          // console.log(energyTypeSubmodels[item])
          for (const elementCollection in energyTypeSubmodels[item]) {
            const test = energyTypeSubmodels[item][elementCollection]
            // console.log(test.idShort)
            for (const wow in test) {
              if (test[wow].idShort === this.energySourceGroup.elementCollection) {
                energySourceComponents = test
              }
            }
          }
        }
      }
      const componentInfo = []
      for (const element in energySourceComponents) {
        const allComponentsOfCollection = energySourceComponents[element].value
        for (const components in allComponentsOfCollection) {
          componentInfo.push({
            componenElementCollectionId: components,
            idShort: allComponentsOfCollection[components].idShort,
            property: allComponentsOfCollection[components].value
          })
        }
      }
      return componentInfo
    }
  },
  created () {
    this.submodelName = 'Energieträger'
    this.submodels = [
      { id: 1, name: 'Energieart', link: '/evaluation-start/energy-type' },
      { id: 2, name: 'Energieeinsatz', link: '/evaluation-start/energy-source' },
      { id: 3, name: 'Energieverbrauch', link: '/evaluation-start/energy-consumption' },
      { id: 4, name: 'SEU', link: '/evaluation-start/seu' }
    ]
    this.emsChapter = { name: 'Energetische Bewertung', link: '/energetic-evaluation' }
    this.energySourceName = { id: 1, name: 'Erdwärmepumpe', pic: require('@/assets/erdwärmepumpe.jpg') }
  }
}
</script>

<style scoped>
#component-title {
    color: #0a322b;
    margin-top: 15px;
}
#component-info {
    margin-inline: 10%;
}
#property-header {
  font-size: 120%;
}
#abo-button {
    margin-right: 30px;
}
#property {
    margin-bottom: 10px;
}

a {
    color: #2c3e50;
    font-size: 16px;
    text-decoration: none;
}
a:hover {
  color: green;
}

</style>
