<template>
    <div>
        <a href="#">
            <b-card
                v-bind:title = energyType.name
                style="max-width: 20rem;"
                class="mx-auto"
                id="energy-types"
            >
                <b-card-img @click="onSubmitEnergyType" href="#" style="max-width: 40%;" top fluid :src= energyType.pic></b-card-img>
            </b-card>
        </a>
    </div>
</template>

<script>

export default {
  name: 'EnergyTypeCard',
  props: {
    energyType: Object,
    site: Number,
    numberOfBuildings: Array,
    buildingNumber: Number,
    buildings: Array
  },
  data () {
    return {}
  },
  computed: {
    aas () {
      const aas = this.$store.getters.loadedAas
      return aas
    }
  },
  methods: {
    onSubmitEnergyType (event) {
      event.preventDefault()
      console.log(this.energyType)
      const newEnergyType = {}
      const submodelIdentification = Math.floor(Math.random() * 100000)
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        // value: 'building/energy-type',
        value: this.energyType.id,
        index: 0,
        idType: 'IRDI'
      }
      newEnergyType.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newEnergyType.qualifiers = []
      newEnergyType.identification = {
        idType: 'IRI',
        id: `submodels/energy-type/${submodelIdentification}`
      }
      newEnergyType.idShort = this.energyType.nameForSubmodel
      newEnergyType.category = 'CONSTANT'
      newEnergyType.modelType = {
        name: 'Submodel'
      }
      newEnergyType.kind = 'Instance'

      newEnergyType.submodelElements = [
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
      this.$store.dispatch('createSubmodelContext', newEnergyType)
      let submodelId
      for (const building in this.buildings) {
        if (this.buildingNumber === this.buildings[building].buildingNumber && this.site === this.buildings[building].numberOfSite) {
          submodelId = this.buildings[building].submodelId
          console.log(this.buildings[building].buildingNumber)
        }
      }
      for (const item in this.aas) {
        // console.log(this.aas)
        if (submodelId === this.aas[item].submodelId) {
          const key = this.aas[item].key
          const submodelKeys = {
            type: 'Submodel',
            local: true,
            value: `submodels/energy-type/${submodelIdentification}`,
            index: 0,
            idType: 'IRI'
          }
          this.$store.dispatch('addSubmodelToAas', [submodelKeys, key])
        }
      }
      const conceptDescriptions = this.$store.getters.loadedConceptDescriptions
      const idShorts = []
      for (const element in conceptDescriptions) {
        idShorts.push(conceptDescriptions[element].payload.idShort)
      }
      // console.log(idShorts)
      const electricity = idShorts.includes('SubmodelEnergyTypeElectricity')
      if (electricity !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeElectricity') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const heat = idShorts.includes('SubmodelEnergyTypeHeat')
      if (heat !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeHeat') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const gas = idShorts.includes('SubmodelEnergyTypeGas')
      if (gas !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeGas') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const oil = idShorts.includes('SubmodelEnergyTypeOil')
      if (oil !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeOil') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const biomass = idShorts.includes('SubmodelEnergyTypeBiomass')
      if (biomass !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeBiomass') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const pellets = idShorts.includes('SubmodelEnergyTypePellets')
      if (pellets !== true && this.energyType.idShortCD === 'SubmodelEnergyTypePellets') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const steam = idShorts.includes('SubmodelEnergyTypeSteam')
      if (steam !== true && this.energyType.idShortCD === 'SubmodelEnergyTypeSteam') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.id
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCD
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodel
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCD
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }
      // Add EnPi Submodels
      const newEnPi = {}
      const submodelIdentificationEnPi = Math.floor(Math.random() * 100000)
      const submodelKeySemanticIdEnPi = {
        type: 'GlobalReference',
        local: true,
        // value: 'building/energy-type',
        value: this.energyType.idEnpi,
        index: 0,
        idType: 'IRDI'
      }
      newEnPi.semanticId = {
        keys: [submodelKeySemanticIdEnPi]
      }
      newEnPi.qualifiers = []
      newEnPi.identification = {
        idType: 'IRI',
        id: `submodels/enpi/${submodelIdentificationEnPi}`
      }
      newEnPi.idShort = this.energyType.nameForSubmodelEnpi
      newEnPi.category = 'CONSTANT'
      newEnPi.modelType = {
        name: 'Submodel'
      }
      newEnPi.kind = 'Instance'

      newEnPi.submodelElements = [
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
      this.$store.dispatch('createSubmodelContext', newEnPi)
      let submodelIdEnPi
      for (const building in this.buildings) {
        if (this.buildingNumber === this.buildings[building].buildingNumber && this.site === this.buildings[building].numberOfSite) {
          submodelIdEnPi = this.buildings[building].submodelIdEnPi
          // console.log(this.buildings[building].buildingNumber)
        }
      }
      for (const item in this.aas) {
        // console.log(this.aas)
        if (submodelIdEnPi === this.aas[item].submodelId) {
          const key = this.aas[item].key
          const submodelKeys = {
            type: 'Submodel',
            local: true,
            value: `submodels/energy-type/${submodelIdentificationEnPi}`,
            index: 0,
            idType: 'IRI'
          }
          this.$store.dispatch('addSubmodelToAas', [submodelKeys, key])
        }
      }
      // Add Concept Description EnPis
      const electricityEnpi = idShorts.includes('SubmodelEnPiElectricity')
      if (electricityEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiElectricity') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const heatEnpi = idShorts.includes('SubmodelEnpieHeat')
      if (heatEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiHeat') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const gasEnpi = idShorts.includes('SubmodelEnpiGas')
      if (gasEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiGas') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const oilEnpi = idShorts.includes('SubmodelEnpiOil')
      if (oilEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiOil') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const biomassEnpi = idShorts.includes('SubmodelEnpiBiomass')
      if (biomassEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiBiomass') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const pelletsEnpi = idShorts.includes('SubmodelEnpiPellets')
      if (pelletsEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiPellets') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }

      const steamEnpi = idShorts.includes('SubmodelEnpiSteam')
      if (steamEnpi !== true && this.energyType.idShortCDEnpi === 'SubmodelEnpiSteam') {
        const newConceptDescriptionEnergyTypeSubmodel = {}
        newConceptDescriptionEnergyTypeSubmodel.identification = {
          idType: 'IRI',
          id: this.energyType.idEnpi
        }
        newConceptDescriptionEnergyTypeSubmodel.idShort = this.energyType.idShortCDEnpi
        newConceptDescriptionEnergyTypeSubmodel.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergyTypeSubmodel.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: this.energyType.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Teilmodell der ' + this.energyType.nameForSubmodelEnpi
                },
                {
                  language: 'EN',
                  text: 'Submodel of' + this.energyType.idShortCDEnpi
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergyTypeSubmodel.isCaseOf = []
        newConceptDescriptionEnergyTypeSubmodel.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergyTypeSubmodel)
      }
    }
  }
}
</script>

<style scoped>
#energy-types:hover {
  background-color: #0a322b !important;
  color: #F2F2F2;
  transition: all 0.5s ease;
}
#energy-types:hover img{
   -webkit-filter: invert(1);
   filter: invert(1);
}
.card-title {
    font-size: large;
}
a {
  color: #0a322b;
  text-decoration: none;
}
</style>
