<template>
    <div>
        <v-row>
            <v-col cols="6">
                <router-link :to = "{ name: 'Component', params: { energySource: energySource, energySourceGroup: energySourceGroup, component: component, energySourceComponents: energySourceComponents, energySourceComponentsDataSheets: energySourceComponentsDataSheets }}">
                    <h6>{{ component.idShort }}</h6>
                </router-link>
            </v-col>
            <v-col cols="6">
                <v-file-input v-model="file" dense accept=".pdf" @change="onFileSelected"></v-file-input>
            </v-col>
                <div id="pdf" v-if="filename !== ''">
                    <div>
                        <v-btn id="upload-button" @click="onUploadPdf([component, energySourceGroup])" v-on:click="isHidden = true" variant="outline-warning">Upload PDF</v-btn>
                    </div>
                        <iframe
                            :src= 'filename'
                            width="85%"
                            height="770"
                            v-if="!isHidden"
                        >
                        </iframe>
                </div>
        </v-row>
        <hr>
    </div>
</template>

<script>
// import PdfViewer from '@/components/PdfViewer.vue'

export default {
  name: 'EnergySourceSheet',
  // components: { PdfViewer },
  props: {
    energySource: Object,
    energySourceGroup: Object,
    component: Object,
    energySourceComponents: Array
  },
  data () {
    return {
      file: null,
      filename: '',
      isHidden: false
    }
  },
  computed: {
    energySourceComponentsDataSheets () {
      const energyTypeSubmodels = this.$store.getters.loadedEnergyTypeInformation
      // console.log(energyTypeSubmodels)
      // console.log(this.energySourceGroup)
      let energySourceComponents
      let submodelId
      for (const item in energyTypeSubmodels) {
        // console.log(item)
        // console.log(energyTypeSubmodels[item])
        if (energyTypeSubmodels[item][0].submodelId === this.energySourceGroup.submodelId) {
          // console.log(energyTypeSubmodels[item][0].key)
          submodelId = energyTypeSubmodels[item][0].key
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
      let component
      const pdfsInformation = []
      // console.log(energySourceComponents)
      for (const element in energySourceComponents) {
        const allComponentsOfCollection = energySourceComponents[element].value
        // console.log(allComponentsOfCollection)
        // console.log(element)
        for (const components in allComponentsOfCollection) {
          component = allComponentsOfCollection[components]
          // component = allComponentsOfCollection[components].idShort
          // console.log(components)
          for (const pdfData in component) {
            // console.log(pdfData)
            const pdfCollection = component[pdfData]
            // console.log(pdfCollection)
            if (typeof pdfCollection === 'object') {
              for (const pdf in pdfCollection) {
                if (pdfCollection[pdf].pdfUrl) {
                  // console.log(pdfCollection[pdf].submodelElement)
                  pdfsInformation.push({
                    pdfUrl: pdfCollection[pdf].pdfUrl,
                    pdfContent: pdfCollection[pdf].submodelElement,
                    pdfId: pdf,
                    componentId: components,
                    sourceGroupId: element,
                    submodelId: submodelId,
                    componentName: allComponentsOfCollection[components].idShort
                  })
                }
              }
            }
          }
        }
      }
      // console.log(pdfsInformation)
      return pdfsInformation
    }
  },

  methods: {
    onFileSelected (e) {
      // e.preventDefault()
      console.log(e)
      // const files = e.target.files
      this.file = e
      // let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.filename = fileReader.result
        // console.log(this.filename)
      })
      fileReader.readAsDataURL(e)
      this.file = e
      // console.log(this.file)
    },
    onUploadPdf ([component, energySourceGroup]) {
      // e.preventDefault()
      console.log(component)
      const pdfData = {
        pdfContent: this.filename,
        name: this.file.name,
        type: this.file.type,
        lastModifiedDate: this.file.lastModifiedDate
      }
      // console.log(pdfData)
      const idInformation = {
        submodelId: energySourceGroup.submodelKey,
        energySourceCollectionId: energySourceGroup.elementCollectionId,
        componentCollectionId: component.componenElementCollectionId
      }
      // console.log(this.energySourceComponents)
      // console.log(idInformation)

      const submodelElementFile = [
        {
          value: this.filename,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/data-sheet',
              index: 0,
              idType: 'IRI'
            }]
          },
          mimeType: this.file.type,
          constraints: [],
          idShort: this.file.name,
          category: 'CONSTANT',
          modelType: {
            name: 'FILE'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        }
      ]

      this.$store.dispatch('uploadPdf', [pdfData, submodelElementFile, idInformation])

      const conceptDescriptions = this.$store.getters.loadedConceptDescriptions
      const idShorts = []
      console.log(idShorts)
      for (const element in conceptDescriptions) {
        idShorts.push(conceptDescriptions[element].payload.idShort)
      }
      const dataSheet = idShorts.includes('DataSheet')
      if (dataSheet !== true) {
        this.newConceptDescription()
      }
    },

    onDeletePdf ([pdfId, componentId, sourceGroupId, submodelId]) {
      // console.log(id)
      this.$store.dispatch('deletePdf', {
        pdfId: pdfId,
        componentId: componentId,
        sourceGroupId: sourceGroupId,
        submodelId: submodelId
      })
    },

    newConceptDescription () {
      const newConceptDescriptionComponentSheet = {}
      newConceptDescriptionComponentSheet.identification = {
        idType: 'IRI',
        id: 'component/data-sheet'
      }
      newConceptDescriptionComponentSheet.idShort = 'DataSheet'
      newConceptDescriptionComponentSheet.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionComponentSheet.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Datenblatt'
              },
              {
                language: 'EN',
                text: 'DataSheet'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Datenblatt'
              },
              {
                language: 'EN',
                text: 'DataSheet'
              }
            ],
            unit: '',
            dataType: '',
            definition: [
              {
                language: 'DE',
                text: 'Das Datenblatt einer technischen Komponente'
              },
              {
                language: 'EN',
                text: 'Datasheet of a technical component'
              }
            ]
          }
        }
      ]
      newConceptDescriptionComponentSheet.isCaseOf = []
      newConceptDescriptionComponentSheet.descriptions = []

      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionComponentSheet)
    }
  }
}
</script>

<style scoped>
a {
    color: #2c3e50;
    font-size: 16px;
    text-decoration: none;
}
a:hover {
  color: green;
}
#pdf {
    margin-top: 15px;
}
#upload-button {
    margin-bottom: 15px;
}
.card {
    margin-inline: 30%;
}
.card-title {
    font-size: large;
}
#loaded-pdfs {
    margin-top: 15px;
    margin-bottom: 15px;
}

#pdfs-title {
    border-bottom-style: solid;
    border-color: #F2F2F2;
    font-size: 18px;
    color: #0a322b;
    padding-bottom: 5px;
}
#test {
    color: green;
    font-size: 16px;
}

</style>
