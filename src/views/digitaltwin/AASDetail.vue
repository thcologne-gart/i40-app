<template>
    <div>
        <div>
            <b-card
            class="shadow p-3 mb-5 bg-white rounded">
                <b-link id="repo-link" :href="aas.submodels[0].submodelElements[0].value" target="_blank">{{ aas.assetAdministrationShells[0].idShort }}</b-link>
                <h6>{{ aas.assets[0].idShort }}</h6>
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
                                    <b-col v-if ="submodel.submodelName === 'Measurements'">
                                        <b-button v-b-modal="submodelElement.idShort + submodel.submodelName + submodelElement.value" variant="light-white">{{ submodelElement.value }}</b-button>
                                            <b-modal v-bind:id="submodelElement.idShort + submodel.submodelName + submodelElement.value" hide-footer size="xl" persistent title="Energiemonitoring">
                                                <LineChart :allValues="submodelElement.allValues" :title="submodelElement.idShort" :xAchisCharts="xAxisCharts"/>
                                            </b-modal>
                                    </b-col>
                                    <b-col v-else-if="submodel.submodelName === 'Control' && submodelElement.idShort === 'Visualisation'">
                                        <b-link id="visualisation-link" :href="submodelElement.value" target="_blank">{{ submodelElement.value }}</b-link>
                                    </b-col>
                                    <b-col v-else>
                                        {{ submodelElement.value }}
                                    </b-col>
                                </b-row>
                                <hr>
                            </div>
                            <div v-else-if="submodelElement.seType === 'File'">
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
                                <div v-if="submodelElement.submodelElementCollectionInfo.length !== 0">
                                    <b-button v-b-toggle="submodelElement.submodelElementCollectionInfo[0].seCollectionName" id = "submodel-element-collection-button" variant="outline-dark" v-b-popover.hover="'Submodel Element Collection'">{{ submodelElement.submodelElementCollectionInfo[0].seCollectionName }}</b-button>
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
                                            <div v-else-if="element.seType === 'File'">
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
                                  </div>
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
import LineChart from '@/components/general/LineChart.vue'

export default {
  components: { LineChart },
  props: {
    aas: Object,
    aasId: String
  },
  computed: {
    xAxisCharts () {
      const xAxis = []
      const timesteps = 30000
      for (var i = 0; i <= 60; i++) {
        let date = new Date()
        date = new Date(date.getTime() + 1000 * 60 * 60 * 2)
        date = new Date(date.getTime() - timesteps * i)
        const aaaa = date.getUTCFullYear()
        let gg = date.getUTCDate()
        let mm = (date.getUTCMonth() + 1)
        if (gg < 10) {
          gg = '0' + gg
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        const curday = aaaa + '-' + mm + '-' + gg
        let hours = date.getUTCHours()
        let minutes = date.getUTCMinutes()
        let seconds = date.getUTCSeconds()
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        const now = curday + ' ' + hours + ':' + minutes + ':' + seconds
        xAxis.push(now)
      }
      const xAxisReverse = xAxis.reverse()
      return xAxisReverse
    },
    aasInfo () {
      // const aasInfo = this.aas.aas.assetAdministrationShells
      // const assetsInfo = this.aas.aas.assets
      // console.log(this.aas)
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
      // console.log(conceptIds)
      const submodels = this.aas.submodels
      const allInfosSubmodels = []
      // console.log(submodels)
      for (const item in submodels) {
        const submodelElements = []
        if (submodels[item].idShort === 'Measurements') {
          // console.log(submodels[item].idShort)
          for (const element in submodels[item].submodelElements) {
            const seType = submodels[item].submodelElements[element].modelType.name
            if (seType === 'Property') {
              let semanticId
              if (typeof submodels[item].submodelElements[element].semanticId === 'undefined' || typeof submodels[item].submodelElements[element].semanticId.keys.length === 'undefined') {
                semanticId = ''
              } else {
                semanticId = submodels[item].submodelElements[element].semanticId.keys[0].value
              }
              const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
              // console.log(typeof submodels[item].submodelElements[element].value)
              const lastObject = submodels[item].submodelElements[element].value
              let lastValue
              let reallyLastValue
              const allValuesArray = []
              if (typeof lastObject === 'object') {
                lastValue = lastObject[Object.keys(lastObject)[Object.keys(lastObject).length - 1]]
                reallyLastValue = lastValue[Object.keys(lastValue)]
                for (const item in lastObject) {
                  allValuesArray.push(lastObject[item].updateObj)
                }
              } else {
                reallyLastValue = lastObject
              }
              if (typeof rightSemanticId === 'undefined') {
                const submodelElementInfo = {
                  aasId: this.aasId,
                  submodelId: item,
                  submodelElementId: element,
                  allValues: allValuesArray,
                  value: reallyLastValue,
                  idShort: submodels[item].submodelElements[element].idShort,
                  semanticId: semanticId,
                  seType: seType,
                  dataType: '',
                  unit: '',
                  definition: '',
                  name: ''
                }
                submodelElements.push(submodelElementInfo)
              } else {
                const dataContent = conceptDescriptions[rightSemanticId].embeddedDataSpecifications
                if (typeof dataContent === 'undefined' || dataContent.length === 0) {
                  const submodelElementInfo = {
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
                    allValues: submodels[item].submodelElements[element].value,
                    value: reallyLastValue,
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
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
                    allValues: submodels[item].submodelElements[element].value,
                    value: reallyLastValue,
                    idShort: submodels[item].submodelElements[element].idShort,
                    semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
                    seType: seType,
                    dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
                    unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
                    definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
                    name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
                  }
                  submodelElements.push(submodelElementInfo)
                }
              }
            }
          }
        } else {
          // console.log(submodels[item])
          // console.log(item)
          // const submodelElements = submodels[item].submodelElements
          for (const element in submodels[item].submodelElements) {
            const seType = submodels[item].submodelElements[element].modelType.name
            // console.log(seType)
            if (seType === 'Property') {
              // console.log(submodels[item].submodelElements[element].semanticId.keys.length)
              let semanticId
              // console.log(submodels[item].submodelElements[element].semanticId)
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
                  aasId: this.aasId,
                  submodelId: item,
                  submodelElementId: element,
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
                  // console.log('test')
                  const submodelElementInfo = {
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
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
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
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
                  // console.log(submodelElements)
                }
              }
            } else if (seType === 'SubmodelElementCollection') {
              const seCollection = submodels[item].submodelElements[element]
              const callSeIter = this.iterateSeCollection(seCollection, conceptIds, conceptDescriptions, item, element)
              const submodelElementCollectionInfo = {
                seType: seType,
                submodelElementCollectionInfo: callSeIter
              }
              submodelElements.push(submodelElementCollectionInfo)
            } else if (seType === 'File') {
              // console.log(submodels[item].submodelElements[element])
              let semanticId
              // console.log(submodels[item].submodelElements[element].semanticId)
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
                  aasId: this.aasId,
                  submodelId: item,
                  submodelElementId: element,
                  mimeType: submodels[item].submodelElements[element].mimeType,
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
                  // console.log('test')
                  const submodelElementInfo = {
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
                    mimeType: submodels[item].submodelElements[element].mimeType,
                    value: submodels[item].submodelElements[element].value,
                    idShort: submodels[item].submodelElements[element].idShort,
                    semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
                    seType: seType,
                    dataType: '',
                    unit: '',
                    definition: '',
                    name: ''
                  }
                  // console.log(submodelElementInfo)
                  submodelElements.push(submodelElementInfo)
                } else {
                  const submodelElementInfo = {
                    aasId: this.aasId,
                    submodelId: item,
                    submodelElementId: element,
                    mimeType: submodels[item].submodelElements[element].mimeType,
                    value: submodels[item].submodelElements[element].value,
                    idShort: submodels[item].submodelElements[element].idShort,
                    semanticId: submodels[item].submodelElements[element].semanticId.keys[0].value,
                    seType: seType,
                    dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
                    unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
                    definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
                    name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
                  }
                  // console.log(submodelElementInfo)
                  submodelElements.push(submodelElementInfo)
                  // console.log(submodelElements)
                }
              }
            }
          }
        }
        let semanticId
        // console.log(submodels[item].semanticId)
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
  created () {
    setInterval(this.calculateValue, 25000)
  },
  methods: {
    calculateValue () {
      for (const submodels in this.aasInfo) {
        // console.log(this.aasInfo[submodels].submodelName)
        if (this.aasInfo[submodels].submodelName === 'Measurements') {
          const submodelElements = this.aasInfo[submodels].submodelElements
          for (const element in submodelElements) {
            // console.log(submodelElements[element])
            if (submodelElements[element].idShort === 'SpeedSupplyAirFan' || submodelElements[element].idShort === 'IndoorAirTemperature' ||
            submodelElements[element].idShort === 'MeasuredVolumetricAirFlow' || submodelElements[element].idShort === 'ExtractAirHumidtiy' ||
            submodelElements[element].idShort === 'ExtractAirTemperature' || submodelElements[element].idShort === 'OutdoorAirHumidity' ||
            submodelElements[element].idShort === 'OutdoorAirTemperature' || submodelElements[element].idShort === 'MixedAirHumidity' ||
            submodelElements[element].idShort === 'SupplyAirHumidtiy' || submodelElements[element].idShort === 'SupplyAirTemperature' ||
            submodelElements[element].idShort === 'RelativeIndoorAirHumidtiy' || submodelElements[element].idShort === 'SpeedExtractAirFan' ||
            submodelElements[element].idShort === 'DifferentialPressure' || submodelElements[element].idShort === 'AmbientTemperature' ||
            submodelElements[element].idShort === 'MeasuredVolumetricAirFlow' || submodelElements[element].idShort === 'MixedAirTemperature') {
              // console.log(submodelElements[element])
              const submodelElement = submodelElements[element]
              let value = (Math.random() * (20 - 10) + 5)
              value = Math.round(value * 100) / 100
              console.log(value)
              this.$store.dispatch('updateSubmodelElementValue', [submodelElement, value])
            }
          }
        }
      }
      // console.log(this.aasInfo)
      // const value = (Math.random() * (20 - 10) + 10)
      // console.log(value)
    },
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
    iterateSeCollection (seCollection, conceptIds, conceptDescriptions, submodelId, collectionId) {
      const seValues = seCollection.value
      // console.log(seCollection.value)
      const seCollectionInfo = []
      for (const element in seValues) {
        let semanticId
        // console.log(seValues[element].semanticId)
        if (typeof seValues[element].semanticId === 'undefined' || typeof seValues[element].semanticId.keys.length === 'undefined') {
          semanticId = ''
        } else {
          semanticId = seValues[element].semanticId.keys[0].value
        }
        // const semanticId = seValues[element].semanticId.keys[0].value
        const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
        // console.log(seValues[element].modelType.name)
        console.log(seCollection.idShort)
        if (seValues[element].modelType.name === 'Property') {
          if (typeof rightSemanticId === 'undefined') {
            const submodelElementInfo = {
              aasId: this.aasId,
              submodelId: submodelId,
              submodelElementCollectionId: collectionId,
              submodelElementId: element,
              seCollectionName: seCollection.idShort,
              value: seValues[element].value,
              idShort: seValues[element].idShort,
              semanticId: semanticId,
              seType: seValues[element].modelType.name,
              dataType: '',
              unit: '',
              definition: '',
              name: ''
            }
            seCollectionInfo.push(submodelElementInfo)
          } else {
            const submodelElementInfo = {
              aasId: this.aasId,
              submodelId: submodelId,
              submodelElementCollectionId: collectionId,
              submodelElementId: element,
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
            let semanticId
            // console.log(seValues[element].semanticId)
            if (typeof nextCollection[item].semanticId === 'undefined' || typeof nextCollection[item].semanticId.keys.length === 'undefined') {
              semanticId = ''
            } else {
              semanticId = nextCollection[item].semanticId.keys[0].value
            }
            // const semanticId = nextCollection[item].semanticId.keys[0].value
            const rightSemanticId = this.getSemanticContent(semanticId, conceptIds)
            if (typeof rightSemanticId === 'undefined') {
              const submodelElementInfo = {
                seCollectionName: seValues[element].idShort,
                value: nextCollection[item].value,
                idShort: nextCollection[item].idShort,
                seType: nextCollection[item].modelType.name,
                semanticId: semanticId,
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
                semanticId: semanticId,
                dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
                unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
                definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
                name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
              }
              nestedCollection.push(submodelElementInfo)
            }
            seCollectionInfo.push(nestedCollection)
          }
        } else if (seValues[element].modelType.name === 'File') {
          // console.log(typeof rightSemanticId)
          if (typeof rightSemanticId === 'undefined') {
            const submodelElementInfo = {
              aasId: this.aasId,
              submodelId: submodelId,
              submodelElementCollectionId: collectionId,
              submodelElementId: element,
              seCollectionName: seCollection.idShort,
              mimeType: seValues[element].mimeType,
              value: seValues[element].value,
              idShort: seValues[element].idShort,
              semanticId: semanticId,
              seType: seValues[element].modelType.name,
              dataType: '',
              unit: '',
              definition: '',
              name: ''
            }
            seCollectionInfo.push(submodelElementInfo)
          } else {
            const submodelElementInfo = {
              aasId: this.aasId,
              submodelId: submodelId,
              submodelElementCollectionId: collectionId,
              submodelElementId: element,
              seCollectionName: seCollection.idShort,
              mimeType: seValues[element].mimeType,
              value: seValues[element].value,
              idShort: seValues[element].idShort,
              seType: seValues[element].modelType.name,
              semanticId: semanticId,
              dataType: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.dataType,
              unit: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.unit,
              definition: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.definition,
              name: conceptDescriptions[rightSemanticId].embeddedDataSpecifications[0].dataSpecificationContent.preferredName
            }
            // console.log(submodelElementInfo)
            seCollectionInfo.push(submodelElementInfo)
          }
        }
      }
      // console.log(seCollectionInfo)
      return seCollectionInfo
    }
  }
}
/*
function calculateValue () {
  const value = Math.floor(Math.random() * 10000)
  console.log(value)
}
*/
</script>

<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 30px;
}

#submodel-button {
    width: 24rem;
    margin-block: 10px;
}
#submodel-element-collection-button {
    width: 300px;
    margin-block: 10px;
}
#submodel-card {
    margin-inline: 5%;
}
#repo-link {
    text-decoration: none;
    color: #0a322b;
    font-size: 22px;
}
#visualisation-link {
    text-decoration: none;
    color: #0a322b;
    font-size: 16px;
}
</style>
