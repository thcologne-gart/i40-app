<template>
    <div v-if="energySourceComponents.length != 0">
        <hr>
        <div v-for="component in energySourceComponents" :key="component.componentElementCollectionId">
            <v-row>
                <v-col>
                    <h5>{{ component.idShort }}</h5>
                </v-col>
            </v-row>
            <hr>
            <div v-for="property in semanticMatchingInformation" :key="property.semanticId">
              <div v-for="propertyValue in properties" :key="propertyValue.name">
                  <div v-if="propertyValue.name === property.name">
                      <div v-if="property.semantic_id.includes('component/energy-information') === true">
                        <v-row>
                          <v-col>
                            <p id = "property">{{ property.name }}</p>
                          </v-col>
                          <v-col>
                            <v-btn id="edit-button" variant="outline-secondary" size="sm" v-b-modal="component.componenElementCollectionId + property.name">Suche nach Property</v-btn>
                            <b-modal v-bind:id="component.componenElementCollectionId + property.name" hide-footer width="350px" persistent :title="property.name" >
                                <p class="my-4">Möchten Sie nach dem Property {{ property.name }} suchen?</p>
                                <p class="my-4">Definition: {{ property.definition }}</p>
                                <p class="my-4">Unit: {{ property.unit }}</p>
                                <p class="my-4">Data Type: {{ property.datatype }}</p>
                                <p class="my-4">Type: {{ property.submodel_element_sub }}</p>
                                <p class="my-4">Category: {{ property.category }}</p>
                                <hr>
                                <v-btn class="mt-3" variant="outline-secondary" @click="onSearchProperty (property, component)">Suchen</v-btn>
                            </b-modal>
                          </v-col>
                        </v-row>
                      </div>
                  </div>
              </div>
            </div>
            <hr>
            <div v-if="matchedProperty != null">
                <h5>Matched Property</h5>
                <p>Name: {{ matchedProperty[0] }}</p>
                <p>Definition: {{ matchedProperty[1] }}</p>
                <p>Similarity: {{ matchedProperty[2] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      matchedProperty: null,
      properties: '',
      semanticMatchingInformation: ''
    }
  },
  props: {
    energySources: Array,
    energySourceGroup: Object,
    energySourceComponents: Array
  },
  mounted () {
    this.getProperties()
  },
  methods: {
    getProperties () {
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

      axios.post('http://localhost:8080/GetAllSubmodelElementsBySemanticIdAndSemanticInformation', property)
        .then(response => (this.matchedProperty = response.data))
      // res.header('Access-Control-Allow-Origin', 'true')
    }
  }
}
</script>

<style>
#selected-components {
    margin-top: 15px;
}
#property-header {
  font-size: 110%;
  margin-bottom: -5px;
}
#property {
  font-size: 100%;
}

</style>
