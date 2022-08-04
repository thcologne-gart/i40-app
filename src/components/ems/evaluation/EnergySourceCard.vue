<template>
    <div>
        <a href="#">
            <v-card
                class ="mx-auto my-4" max-width="90%" elevation="2"
                id="card-source"
            >
            <v-card-title class="justify-center">{{ energySource.sourceName }}</v-card-title>
            <!--
            <router-link  :to = "{ name: energySource.name, params: { energySource: energySource, energySourceGroup: energySourceGroup }}">
                <b-card-img @click="addComponentEnergySource([energySource, energySourceGroup])" style="max-width: 70px;" top fluid :src= energySource.pic></b-card-img>
            </router-link>
            -->
            <!--
                <b-button v-b-toggle="energySource.sourceName" variant="light" size="lg">
                    <b-card-img @click="addComponentEnergySource([energySource, energySourceGroup])" height="80px" top fluid :src= energySource.pic></b-card-img>
                </b-button>
                <b-collapse v-bind:id="energySource.sourceName">
                    <EnergySourceSheet :energySource="energySource" :energySourceGroup="energySourceGroup" />
                </b-collapse>
            -->
                    <v-img v-b-modal="energySourceGroup.elementCollectionId + energySource.sourceName" max-height="80" contain top fluid :src= energySource.pic></v-img>
                    <b-modal v-bind:id="energySourceGroup.elementCollectionId + energySource.sourceName" hide-footer width="350px" persistent :title="energySource.sourceName">
                        <p>Möchten Sie eine {{ energySource.sourceName }} zu der Energieeinsatz Gruppe {{ energySourceGroup.elementCollection }} hinzufügen?</p>
                        <hr>
                        <v-btn class="mt-3" variant="outline-secondary" size="sm" @click="addComponentEnergySource([energySource, energySourceGroup])">Ja</v-btn>
                    </b-modal>
            </v-card>
        </a>
    </div>
</template>

<script>
// import EnergySourceSheet from '@/components/EnergySourceSheet.vue'

export default {
  name: 'EnergySourceCard',
  // components: { EnergySourceSheet },
  props: {
    building: Number,
    site: Number,
    energySourceGroup: Object,
    energySource: Object,
    enpiSubmodels: Array
  },
  data () {
    return {
      numberSystems: null
    }
  },
  computed: {
    aas () {
      console.log(this.enpiSubmodels)
      const aas = this.$store.getters.loadedAas
      return aas
    }
  },
  methods: {
    addComponentEnergySource ([energySource, energySourceGroup]) {
      this.$bvModal.hide(energySourceGroup.elementCollectionId + energySource.sourceName)
      console.log(this.energySourceGroup)
      console.log(this.energySource)
      const newSecComponent = [
        {
          ordered: false,
          allowDuplicates: false,
          value: [],
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/' + energySource.idShortCD,
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          hasDataSpecification: [],
          idShort: energySource.sourceName,
          category: 'CONSTANT',
          modelType: {
            name: 'SubmodelElementCollection'
          }
        }
      ]

      // if (energySource.sourceName === 'Grundwasserwärmepumpe' || energySource.sourceName === 'Luftwärmepumpe' || energySource.sourceName === 'Erdwärmepumpe') {
      newSecComponent[0].value = [
        {
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/energy-information/energy-consumption',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'EnergyConsumption',
          category: 'VARIABLE',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: '0173-1#02-AAO677#002',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Manufacturer name',
          category: 'PARAMETER',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/device-information/serial-number',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'SerialNumber',
          category: 'PARAMETER',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/device-information/maufacture-date',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'ManufactureDate',
          category: 'PARAMETER',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        }
      ]

      console.log(newSecComponent)

      const submodelKey = energySourceGroup.submodelKey
      const elementCollectionKey = energySourceGroup.elementCollectionId
      this.$store.dispatch('addComponentEnergySource', [newSecComponent, submodelKey, elementCollectionKey])

      const conceptDescriptions = this.$store.getters.loadedConceptDescriptions
      const idShorts = []
      console.log(idShorts)
      for (const element in conceptDescriptions) {
        idShorts.push(conceptDescriptions[element].payload.idShort)
      }
      const grundwasserwp = idShorts.includes('GroundwaterHeatPump')
      if (grundwasserwp !== true && energySource.idShortCD === 'GroundwaterHeatPump') {
        this.newConceptDescription(energySource)
      }
      const luftwp = idShorts.includes('AirHeatPump')
      if (luftwp !== true && energySource.idShortCD === 'AirHeatPump') {
        this.newConceptDescription(energySource)
      }
      const erdwp = idShorts.includes('GroundSourceHeatPump')
      if (erdwp !== true && energySource.idShortCD === 'GroundSourceHeatPump') {
        this.newConceptDescription(energySource)
      }
      const kaltwasser = idShorts.includes('ColdWaterSet')
      if (kaltwasser !== true && energySource.idShortCD === 'ColdWaterSet') {
        this.newConceptDescription(energySource)
      }
      const split = idShorts.includes('SplitDevice')
      if (split !== true && energySource.idShortCD === 'SplitDevice') {
        this.newConceptDescription(energySource)
      }
      const klima = idShorts.includes('AirConditioningSystem')
      if (klima !== true && energySource.idShortCD === 'AirConditioningSystem') {
        this.newConceptDescription(energySource)
      }
      const lüftung = idShorts.includes('Ventilationsystem')
      if (lüftung !== true && energySource.idShortCD === 'VentilationSystem') {
        this.newConceptDescription(energySource)
      }
      const kreiselp = idShorts.includes('CentrifugalPump')
      if (kreiselp !== true && energySource.idShortCD === 'CentrifugalPump') {
        this.newConceptDescription(energySource)
      }
      const verdrängerp = idShorts.includes('DisplacementPump')
      if (verdrängerp !== true && energySource.idShortCD === 'DisplacementPump') {
        this.newConceptDescription(energySource)
      }
      const strahlp = idShorts.includes('JetPump')
      if (strahlp !== true && energySource.idShortCD === 'JetPump') {
        this.newConceptDescription(energySource)
      }
      const ventilator = idShorts.includes('Fan')
      if (ventilator !== true && energySource.idShortCD === 'Fan') {
        this.newConceptDescription(energySource)
      }
      const erhitzer = idShorts.includes('Heater')
      if (erhitzer !== true && energySource.idShortCD === 'Heater') {
        this.newConceptDescription(energySource)
      }
      const kühler = idShorts.includes('Cooler')
      if (kühler !== true && energySource.idShortCD === 'Cooler') {
        this.newConceptDescription(energySource)
      }
      const wrg = idShorts.includes('HeatRecovery')
      if (wrg !== true && energySource.idShortCD === 'HeatRecovery') {
        this.newConceptDescription(energySource)
      }

      const energyConsumption = idShorts.includes('EnergyConsumption')
      if (energyConsumption !== true) {
        const newConceptDescriptionEnergyConsumption = {}
        newConceptDescriptionEnergyConsumption.identification = {
          idType: 'IRI',
          id: 'component/energy-related/energy-consumption'
        }
        newConceptDescriptionEnergyConsumption.idShort = 'EnergyConsumption'
        newConceptDescriptionEnergyConsumption.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyConsumption.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: 'Stromverbrauch'
                },
                {
                  language: 'EN',
                  text: 'EnergyConsumption'
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: 'Stromverbrauch'
                },
                {
                  language: 'EN',
                  text: 'EnergyConsumption'
                }
              ],
              unit: 'Watt',
              dataType: 'REAL',
              definition: [
                {
                  language: 'DE',
                  text: 'Aktueller Stromverbrauch der Komponente'
                },
                {
                  language: 'EN',
                  text: 'Actual Energy Consumption of the component'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyConsumption.isCaseOf = []
        newConceptDescriptionEnergyConsumption.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyConsumption)
      }

      const manufacturerName = idShorts.includes('Manufacturer name')
      if (manufacturerName !== true) {
        const newConceptDescriptionManufacturerName = {}
        newConceptDescriptionManufacturerName.identification = {
          idType: 'IRI',
          id: '0173-1#02-AAO677#002'
        }
        newConceptDescriptionManufacturerName.idShort = 'Manufacturer name'
        newConceptDescriptionManufacturerName.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionManufacturerName.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: 'Herstellername'
                },
                {
                  language: 'EN',
                  text: 'ManufacturerName'
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: 'Herstellername'
                },
                {
                  language: 'EN',
                  text: 'Manufacturer name'
                }
              ],
              unit: 'NaN',
              dataType: 'STRING',
              definition: [
                {
                  language: 'DE',
                  text: 'Name des Herstellers einer Komponente'
                },
                {
                  language: 'EN',
                  text: 'legally valid designation of the natural or judicial person which is directly responsible for the design, production, packaging and labeling of a product in respect to its being brought into circulation'
                }
              ]
            }
          }
        ]
        newConceptDescriptionManufacturerName.isCaseOf = []
        newConceptDescriptionManufacturerName.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionManufacturerName)
      }
      const serialNumber = idShorts.includes('SerialNumber')
      if (serialNumber !== true) {
        const newConceptDescriptionSerialNumber = {}
        newConceptDescriptionSerialNumber.identification = {
          idType: 'IRI',
          id: 'component/device-information/serial-number'
        }
        newConceptDescriptionSerialNumber.idShort = 'SerialNumber'
        newConceptDescriptionSerialNumber.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionSerialNumber.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: 'Seriennummer'
                },
                {
                  language: 'EN',
                  text: 'SerialNumber'
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: 'Seriennummer'
                },
                {
                  language: 'EN',
                  text: 'SerialNumber'
                }
              ],
              unit: 'NaN',
              dataType: 'STRING',
              definition: [
                {
                  language: 'DE',
                  text: 'Seriennummer der Komponente'
                },
                {
                  language: 'EN',
                  text: 'Serial number of the component'
                }
              ]
            }
          }
        ]
        newConceptDescriptionSerialNumber.isCaseOf = []
        newConceptDescriptionSerialNumber.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionSerialNumber)
      }
      const dateManufacture = idShorts.includes('ManufactureDate')
      if (dateManufacture !== true) {
        const newConceptDescriptionDateManufacture = {}
        newConceptDescriptionDateManufacture.identification = {
          idType: 'IRI',
          id: 'component/device-information/manufacture-date'
        }
        newConceptDescriptionDateManufacture.idShort = 'ManufactureDate'
        newConceptDescriptionDateManufacture.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionDateManufacture.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: 'HerstellungsDatum'
                },
                {
                  language: 'EN',
                  text: 'ManufactureDate'
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: 'Herstellungsdatum'
                },
                {
                  language: 'EN',
                  text: 'ManufactureDate'
                }
              ],
              unit: 'NaN',
              dataType: 'STRING',
              definition: [
                {
                  language: 'DE',
                  text: 'Herstellungsdatum der Komponente'
                },
                {
                  language: 'EN',
                  text: 'Date of manufacture of the component'
                }
              ]
            }
          }
        ]
        newConceptDescriptionDateManufacture.isCaseOf = []
        newConceptDescriptionDateManufacture.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionDateManufacture)
      }
      // Add Enpi for Component
      const energySourceGroupName = this.energySourceGroup.elementCollection
      // console.log(energySourceGroupName)
      // console.log(this.enpiSubmodels)
      for (const item in this.enpiSubmodels) {
        const actualSite = this.enpiSubmodels[item].site
        const actualBuilding = this.enpiSubmodels[item].building
        if (this.enpiSubmodels[item].elementCollection.includes(energySourceGroupName) && actualSite === this.site && actualBuilding === this.building) {
          console.log(this.enpiSubmodels[item])
          const newSecComponent = [
            {
              ordered: false,
              allowDuplicates: false,
              value: [],
              semanticId: {
                keys: [{
                  type: 'GlobalReference',
                  local: true,
                  value: 'component/' + energySource.idShortCDEnpi,
                  index: 0,
                  idType: 'IRI'
                }]
              },
              constraints: [],
              hasDataSpecification: [],
              idShort: energySource.idShortEnpi,
              category: 'CONSTANT',
              modelType: {
                name: 'SubmodelElementCollection'
              }
            }
          ]
          const submodelKey = this.enpiSubmodels[item].submodelKey
          const elementCollectionKey = this.enpiSubmodels[item].elementCollectionId
          this.$store.dispatch('addComponentEnergySource', [newSecComponent, submodelKey, elementCollectionKey])
        }
      }
      /*
      const newSecComponent = [
        {
          ordered: false,
          allowDuplicates: false,
          value: [],
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/' + energySource.idShortCD,
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          hasDataSpecification: [],
          idShort: energySource.sourceName,
          category: 'CONSTANT',
          modelType: {
            name: 'SubmodelElementCollection'
          }
        }
      ]

      // if (energySource.sourceName === 'Grundwasserwärmepumpe' || energySource.sourceName === 'Luftwärmepumpe' || energySource.sourceName === 'Erdwärmepumpe') {
      newSecComponent[0].value = [
        {
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/energy-information/energy-consumption',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'EnergyConsumption',
          category: 'VARIABLE',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: '0173-1#02-AAO677#002',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Manufacturer name',
          category: 'PARAMETER',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/device-information/serial-number',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'SerialNumber',
          category: 'PARAMETER',
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
          value: '',
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'component/device-information/maufacture-date',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'ManufactureDate',
          category: 'PARAMETER',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        }
      ]

      console.log(newSecComponent)

      const submodelKey = energySourceGroup.submodelKey
      const elementCollectionKey = energySourceGroup.elementCollectionId
      this.$store.dispatch('addComponentEnergySource', [newSecComponent, submodelKey, elementCollectionKey])
      */
    },

    newConceptDescription (energySource) {
      const newConceptDescriptionComponent = {}
      newConceptDescriptionComponent.identification = {
        idType: 'IRI',
        id: 'component/' + energySource.idShortCD
      }
      newConceptDescriptionComponent.idShort = energySource.idShortCD
      newConceptDescriptionComponent.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionComponent.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: energySource.sourceName
              },
              {
                language: 'EN',
                text: energySource.idShortCD
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: energySource.sourceName
              },
              {
                language: 'EN',
                text: energySource.idShortCD
              }
            ],
            unit: '',
            dataType: '',
            definition: [
              {
                language: 'DE',
                text: 'Sammlung der Informationen der Komponente' + energySource.sourceName
              },
              {
                language: 'EN',
                text: 'Collection of the information of the component' + energySource.idShortCD
              }
            ]
          }
        }
      ]
      newConceptDescriptionComponent.isCaseOf = []
      newConceptDescriptionComponent.descriptions = []

      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionComponent)
    }
  }
}
</script>

<style scoped>
#card-source:hover {
  background-color: #0a322b !important;
  color: #F2F2F2;
  transition: all 0.5s ease;
}
#card-source:hover img{
   -webkit-filter: invert(1);
   filter: invert(1);
}
.card-title {
    font-size: large;
}
#card-source {
    width: 40%;
    align-content: center !important;
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
.card-image {
    width: 40%;
}
#button-yes {
    margin-right: 40px;
}
a {
  color: #0a322b;
  text-decoration: none;
}
</style>
