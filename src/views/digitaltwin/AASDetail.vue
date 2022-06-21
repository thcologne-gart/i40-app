<template>
    <div>
        <div>
            <b-card
            class="shadow p-3 mb-5 bg-white rounded"
            :title= aas.assetAdministrationShells[0].idShort
            :sub-title = aas.assets[0].idShort>
                <hr>
                <h5>Submodels</h5>
                <div v-for="submodel in aasInfo" :key="submodel.submodelName">
                    <b-button v-b-toggle="submodel.submodelName" id = "submodel-button" variant="outline-secondary">{{ submodel.submodelName }}</b-button>
                    <b-collapse v-bind:id="submodel.submodelName">
                      <b-card id="submodel-card" class="shadow p-3 mb-5 bg-white rounded">
                        <div v-for="submodelElement in submodel.submodelElements" :key="submodelElement.idShort">
                            <div v-if="submodelElement.seType === 'Property'">
                                <b-row>
                                    <b-col>
                                        <b-button v-b-modal="submodelElement.idShort + submodel.submodelName" variant="light-white">{{ submodelElement.idShort }}</b-button>
                                            <b-modal v-bind:id="submodelElement.idShort + submodel.submodelName" hide-footer width="350px" persistent title="Semantic Information">
                                                <p class="my-4">Semantic ID: {{ submodelElement.semanticId }}</p>
                                                <div v-if="typeof submodelElement.definition === 'undefined' || submodelElement.definition === '' || !submodelElement.definition.length">
                                                    <p class="my-4">Definition: </p>
                                                </div>
                                                <div v-else>
                                                    <p class="my-4">Definition: {{ submodelElement.definition[0].text }}</p>
                                                </div>
                                                <div v-if="typeof submodelElement.name === 'undefined' || submodelElement.name === '' || !submodelElement.name.length">
                                                    <p class="my-4">Name: </p>
                                                </div>
                                                <div v-else>
                                                    <p class="my-4">Name: {{ submodelElement.name[0].text }}</p>
                                                </div>
                                                <p class="my-4">Datentyp: {{ submodelElement.dataType }}</p>
                                                <hr>
                                            </b-modal>
                                    </b-col>
                                    <b-col>
                                        {{ submodelElement.value }}
                                    </b-col>
                                </b-row>
                                <hr>
                            </div>
                            <div v-else-if="submodelElement.seType === 'SubmodelElementCollection'">
                                <b-button v-b-toggle="submodelElement.submodelElementCollectionInfo[0].seCollectionName" id = "submodel-element-collection-button" variant="outline-secondary" v-b-popover.hover="'Submodel Element Collection'">{{ submodelElement.submodelElementCollectionInfo[0].seCollectionName }}</b-button>
                                <b-collapse v-bind:id="submodelElement.submodelElementCollectionInfo[0].seCollectionName">
                                    <div v-for="element in submodelElement.submodelElementCollectionInfo" :key="element.idShort">
                                        <div v-if="element.seType === 'Property'">
                                            <b-row>
                                                <b-col>
                                                    <b-button v-b-modal="element.idShort + submodel.submodelName" variant="light-white">{{ element.idShort }}</b-button>
                                                        <b-modal v-bind:id="element.idShort + submodel.submodelName" hide-footer width="350px" persistent title="Semantic Information">
                                                            <p class="my-4">SemanticID: {{ element.semanticId }}</p>
                                                            <div v-if="typeof element.definition === 'undefined' || element.definition === '' || !element.definition.length">
                                                                <p class="my-4">Definition: </p>
                                                            </div>
                                                            <div v-else>
                                                                <p class="my-4">Definition: {{ element.definition[0].text }}</p>
                                                            </div>
                                                            <div v-if="element.name === '' || !element.name.length">
                                                                <p class="my-4">Name: </p>
                                                            </div>
                                                            <div v-else>
                                                                <p class="my-4">Name: {{ element.name[0].text }}</p>
                                                            </div>
                                                            <p class="my-4">Datentyp: {{ element.dataType }}</p>
                                                            <hr>
                                                        </b-modal>
                                                </b-col>
                                                <b-col>
                                                    {{ element.value }}
                                                </b-col>
                                            </b-row>
                                            <hr>
                                        </div>
                                        <!--
                                        <div v-else>
                                            <b-button v-b-toggle="element.submodelElementCollectionInfo[0].seCollectionName" id = "submodel-element-collection-button" variant="outline-secondary" v-b-popover.hover="'Submodel Element Collection'">{{ element.submodelElementCollectionInfo[0].seCollectionName }}</b-button>
                                            <b-collapse v-bind:id="element.submodelElementCollectionInfo[0].seCollectionName">
                                                <div v-for="el in element.submodelElementCollectionInfo" :key="el.idShort">
                                                    <b-row>
                                                        <b-col>
                                                            <b-button v-b-modal="el.idShort + submodel.submodelName" variant="light-white">{{ el.idShort }}</b-button>
                                                                <b-modal v-bind:id="el.idShort + submodel.submodelName" hide-footer width="350px" persistent title="Semantic Information">
                                                                    <p class="my-4">SemanticID: {{ el.semanticId }}</p>
                                                                    <div v-if="el.definition === '' || !el.definition.length">
                                                                        <p class="my-4">Definition: </p>
                                                                    </div>
                                                                    <div v-else>
                                                                        <p class="my-4">Definition: {{ el.definition[0].text }}</p>
                                                                    </div>
                                                                    <div v-if="el.name === '' || !el.name.length">
                                                                        <p class="my-4">Name: </p>
                                                                    </div>
                                                                    <div v-else>
                                                                        <p class="my-4">Name: {{ el.name[0].text }}</p>
                                                                    </div>
                                                                    <p class="my-4">Datentyp: {{ el.dataType }}</p>
                                                                    <hr>
                                                                </b-modal>
                                                        </b-col>
                                                        <b-col>
                                                            {{ element.value }}
                                                        </b-col>
                                                    </b-row>
                                                    <hr>
                                                </div>
                                            </b-collapse>
                                        </div>
                                        -->
                                    </div>
                                </b-collapse>
                                <hr>
                            </div>
                        </div>
                      </b-card>
                    </b-collapse>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    aas: Object
  },
  computed: {
    aasInfo () {
      // const aasInfo = this.aas.aas.assetAdministrationShells
      // const assetsInfo = this.aas.aas.assets
      const conceptDescriptions = this.aas.conceptDescriptions
      // console.log(conceptDescriptions)
      const conceptIds = []
      let i
      if (typeof conceptDescriptions !== 'undefined') {
        for (i = 0; i in conceptDescriptions; i++) {
          const conceptId = {
            id: conceptDescriptions[i].identification.id
          }
          conceptIds.push(conceptId)
        }
      }
      console.log(conceptIds)
      const submodels = this.aas.submodels
      const allInfosSubmodels = []
      console.log(submodels)
      for (const item in submodels) {
        // console.log(allInfosSubmodels)
        const submodelElements = []
        // const submodelElements = submodels[item].submodelElements
        for (const element in submodels[item].submodelElements) {
          const seType = submodels[item].submodelElements[element].modelType.name
          console.log(seType)
          if (seType === 'Property') {
            // console.log(submodels[item].submodelElements[element].semanticId.keys.length)
            let semanticId
            console.log(submodels[item].submodelElements[element].semanticId)
            if (typeof submodels[item].submodelElements[element].semanticId === 'undefined' || typeof submodels[item].submodelElements[element].semanticId.keys.length === 'undefined') {
              semanticId = ''
            } else {
              semanticId = submodels[item].submodelElements[element].semanticId.keys[0].value
            }
            const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
            // console.log(typeof rightSemanticId)
            if (typeof rightSemanticId === 'undefined') {
              // console.log('test')
              const submodelElementInfo = {
                value: submodels[item].submodelElements[element].value,
                idShort: submodels[item].submodelElements[element].idShort,
                semanticId: semanticId,
                seType: seType,
                dataType: '',
                unit: '',
                definition: '',
                name: ''
              }
              // console.log(submodelElementInfo)
              submodelElements.push(submodelElementInfo)
              // console.log(submodelElements)
            } else {
              // const dataContentObject = typeof conceptDescriptions[rightSemanticId].embeddedDataSpecifications
              const dataContent = conceptDescriptions[rightSemanticId].embeddedDataSpecifications
              // console.log(dataContentObject)
              // console.log(dataContent.length)
              if (typeof dataContent === 'undefined' || dataContent.length === 0) {
                console.log('test')
                const submodelElementInfo = {
                  value: submodels[item].submodelElements[element].value,
                  idShort: submodels[item].submodelElements[element].idShort,
                  semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
                  seType: seType,
                  dataType: '',
                  unit: '',
                  definition: '',
                  name: ''
                }
                submodelElements.push(submodelElementInfo)
              } else {
                const submodelElementInfo = {
                  value: submodels[item].submodelElements[element].value,
                  idShort: submodels[item].submodelElements[element].idShort,
                  semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
                  seType: seType,
                  dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
                  unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
                  definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
                  name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
                }
                submodelElements.push(submodelElementInfo)
                console.log(submodelElements)
              }
            }
            /*
            const submodelElementInfo = {
              value: submodels[item].submodelElements[element].value,
              idShort: submodels[item].submodelElements[element].idShort,
              semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
              seType: seType,
              dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
              unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
              definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition[0].text,
              name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName[0].text
            }
            submodelElements.push(submodelElementInfo)
            */
          } else if (seType === 'SubmodelElementCollection') {
            const seCollection = submodels[item].submodelElements[element]
            const callSeIter = this.iterateSeCollection(seCollection, conceptIds, conceptDescriptions)
            const submodelElementCollectionInfo = {
              submodelElementCollectionInfo: callSeIter
            }
            submodelElements.push(submodelElementCollectionInfo)
          }
        }
        let semanticId
        console.log(submodels[item].semanticId)
        if (typeof submodels[item].semanticId === 'undefined') {
          semanticId = ''
        } else {
          semanticId = submodels[item].semanticId.keys
        }
        // console.log(submodelElements)
        const submodelInfo = {
          submodelName: submodels[item].idShort,
          // submodelSemanticId: submodels[item].semanticId.keys,
          submodelSemanticId: semanticId,
          submodelElements: submodelElements
        }
        allInfosSubmodels.push(submodelInfo)
      }
      console.log(allInfosSubmodels)
      return allInfosSubmodels
    }
  },
  methods: {
    getSemanticContent (semanticId, conceptIds) {
      // console.log(semanticId)
      // console.log(conceptIds)
      let rightSemanticId
      for (const item in conceptIds) {
        // console.log(conceptIds[item].id)
        if (semanticId === conceptIds[item].id) {
          // console.log(item)
          rightSemanticId = item
          // const thisIsIt = item
          // return item
          // } else {
          // const thisIt = 'undefined'
          // return notFound
          return rightSemanticId
        }
        // return thisIsIt
      }
    },
    iterateSeCollection (seCollection, conceptIds, conceptDescriptions) {
      const seValues = seCollection.value
      // console.log(seCollection)
      const seCollectionInfo = []
      for (const element in seValues) {
        const semanticId = seValues[element].semanticId.keys[0].value
        const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
        // console.log(rightSemanticId)
        if (seValues[element].modelType.name === 'Property') {
          if (typeof rightSemanticId === 'undefined') {
            const submodelElementInfo = {
              value: seValues[element].value,
              idShort: seValues[element].idShort,
              semanticId: seValues[element].semanticId.keys[0].value,
              seType: seValues[element].modelType.name,
              dataType: '',
              unit: '',
              definition: '',
              name: ''
            }
            seCollectionInfo.push(submodelElementInfo)
          } else {
            const submodelElementInfo = {
              seCollectionName: seCollection.idShort,
              value: seValues[element].value,
              idShort: seValues[element].idShort,
              seType: seValues[element].modelType.name,
              semanticId: seValues[element].semanticId.keys[0].value,
              dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
              unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
              definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
              name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
            }
            seCollectionInfo.push(submodelElementInfo)
          }
        } else if (seValues[element].modelType.name === 'SubmodelElementCollection') {
          const nextCollection = seValues[element].value
          // console.log(nextCollection)
          const nestedCollection = []
          for (const item in nextCollection) {
            const semanticId = nextCollection[item].semanticId.keys[0].value
            const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
            if (typeof rightSemanticId === 'undefined') {
              const submodelElementInfo = {
                seCollectionName: seValues[element].idShort,
                value: nextCollection[item].value,
                idShort: nextCollection[item].idShort,
                seType: nextCollection[item].modelType.name,
                semanticId: seValues[element].semanticId.keys[0].value,
                dataType: '',
                unit: '',
                definition: '',
                name: ''
              }
              nestedCollection.push(submodelElementInfo)
            } else {
              const submodelElementInfo = {
                seCollectionName: seValues[element].idShort,
                value: nextCollection[item].value,
                idShort: nextCollection[item].idShort,
                seType: nextCollection[item].modelType.name,
                semanticId: seValues[element].semanticId.keys[0].value,
                dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
                unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
                definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
                name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
              }
              nestedCollection.push(submodelElementInfo)
            }
            seCollectionInfo.push(nestedCollection)
          }
        }
      }
      return seCollectionInfo
    }
  }
}
</script>

<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 30px;
}

#submodel-button {
    width: 200px;
    margin-block: 10px;
}
#submodel-element-collection-button {
    width: 300px;
    margin-block: 10px;
}
#submodel-card {
    margin-inline: 5%;
}
</style>
