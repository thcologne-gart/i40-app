<template>
    <div>
        <v-row>
            <v-col :key="energyGroup.id" v-for="energyGroup in energyUseGroup">
                <a href="#">
                    <v-card v-show="expand" id="energyUseGroup"
                        v-b-modal="energyGroup.name"
                        v-bind:title = energyGroup.name
                        class ="mx-auto my-4 pt-4" min-height="75px" elevation="2"
                    >
                        <div v-if="energyGroup.name === 'Heizung'">
                            <v-img  class="mx-auto" href="#" style="max-width: 20%;" :src= energyGroup.pic></v-img>
                            <b-modal v-bind:id="energyGroup.name" hide-footer width="350px" persistent :title="energyGroup.name">
                                    <v-text-field
                                    id="input-1"
                                    label="Anzahl getrennter Heizsysteme im Gebäude:"
                                    v-model.number="numberSystems"
                                    required
                                    ></v-text-field>
                                <v-btn class="mt-3" variant="outline-secondary" @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</v-btn>
                            </b-modal>
                        </div>

                        <div v-else-if="energyGroup.name === 'Kühlung'">
                            <a href="#">
                              <v-img  class="mx-auto" href="#" style="max-width: 20%;" :src= energyGroup.pic></v-img>
                            </a>
                            <b-modal v-bind:id="energyGroup.name" hide-footer width="350px" persistent :title="energyGroup.name">
                              <v-text-field
                                id="input-1"
                                label="Anzahl getrennter Kühlsysteme im Gebäude:"
                                v-model.number="numberSystems"
                                required
                              ></v-text-field>
                              <v-btn class="mt-3" variant="outline-secondary" @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</v-btn>
                            </b-modal>
                        </div>

                        <div v-else-if="energyGroup.name === 'Lüftung'">
                            <a href="#">
                              <v-img  class="mx-auto" href="#" style="max-width: 20%;" :src= energyGroup.pic></v-img>
                            </a>
                            <b-modal v-bind:id="energyGroup.name" hide-footer width="350px" persistent :title="energyGroup.name">
                                <v-text-field
                                id="input-1"
                                label="Anzahl getrennter Lüftungssysteme im Gebäude:"
                                v-model.number="numberSystems"
                                required
                              ></v-text-field>
                                <v-btn class="mt-3" variant="outline-secondary" @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</v-btn>
                            </b-modal>
                        </div>
                    </v-card>
                </a>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      numberSystems: null,
      energyUseGroup: [
        { id: 'energyUseGroupHeating', name: 'Heizung', pic: require('@/assets/heizung.svg'), nameForSubmodelElementCollection: 'Energiegruppe Heizung', idShortCD: 'EnergyGroupHeating', idEnpi: 'enpiGroupHeating', nameEnpi: 'Enpi Heizung', nameForSubmodelElementCollectionEnpi: 'EnPis Energiegruppe Heizung', idShortCDEnpi: 'EnpiEnergyGroupHeating' },
        { id: 'energyUseGroupCooling', name: 'Kühlung', pic: require('@/assets/kuehlung.svg'), nameForSubmodelElementCollection: 'Energiegruppe Kühlung', idShortCD: 'EnergyGroupCooling', idEnpi: 'enpiGroupCoolinf', nameEnpi: 'Enpi Kühlung', nameForSubmodelElementCollectionEnpi: 'EnPis Energiegruppe Kühlung', idShortCDEnpi: 'EnpiEnergyGroupCooling' },
        { id: 'energyUseGroupAirHandling', name: 'Lüftung', pic: require('@/assets/lueftung.svg'), nameForSubmodelElementCollection: 'Energiegruppe Lüftung', idShortCD: 'EnergyGroupAirHandling', idEnpi: 'enpiGroupAirHandling', nameEnpi: 'Enpi Lüftung', nameForSubmodelElementCollectionEnpi: 'EnPis Energiegruppe Lüftung', idShortCDEnpi: 'EnpiEnergyGroupAirHandling' }
      ]
    }
  },
  props: {
    energyType: Array,
    enpis: Array,
    building: Number,
    site: Number,
    expand: Boolean
  },
  computed: {
    getEnpis () {
      let enpi
      let enpiInformations = {}
      for (enpi in this.enpis) {
        if (this.enpis[enpi][0].submodelSemanticId === 'submodel/enpiElectricity') {
          // console.log('test')
          enpiInformations = {
            key: this.enpis[enpi][0].key,
            id: this.enpis[enpi][0].submodelId,
            submodelName: this.enpis[enpi][0].submodelName,
            submodelSemanticId: this.enpis[enpi][0].submodelSemanticId
          }
        }
        console.log(this.enpis[enpi])
      }
      return enpiInformations
    }
  },
  methods: {
    onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, enpiInformations]) {
      // event.preventDefault()
      console.log(energyType)
      console.log(enpiInformations)
      const numberSystemsArray = [0]
      this.$bvModal.hide(energyGroup.name)
      // this.$refs['modal-heating'].hide()
      let i
      for (i = 1; i < numberSystems; i++) {
        numberSystemsArray.push(i)
      }
      // console.log(numberSystemsArray)
      // const newEnergySourceGroup = {}
      for (const system in numberSystemsArray) {
        const newEnergySourceGroup = [
          {
            ordered: false,
            allowDuplicates: false,
            value: [],
            semanticId: {
              keys: [{
                type: 'GlobalReference',
                local: true,
                value: energyGroup.id,
                index: 0,
                idType: 'IRI'
              }]
            },
            constraints: [],
            hasDataSpecification: [],
            idShort: energyGroup.nameForSubmodelElementCollection + ' ' + system,
            category: 'CONSTANT',
            modelType: {
              name: 'SubmodelElementCollection'
            }
          }
        ]
        // console.log(newEnergySourceGroup)
        const submodelKey = this.energyType[0].key
        console.log(submodelKey)
        this.$store.dispatch('addEnergyUseGroup', [newEnergySourceGroup, submodelKey])
      }
      this.numberSystems = null
      // console.log(newEnergySourceGroup)
      // console.log(this.item[0].key)
      // const submodelKey = this.item[0].key
      // this.$store.dispatch('addEnergyUseGroup', [newEnergySourceGroup, submodelKey])
      const conceptDescriptions = this.$store.getters.loadedConceptDescriptions
      const idShorts = []
      for (const element in conceptDescriptions) {
        idShorts.push(conceptDescriptions[element].payload.idShort)
      }
      const heating = idShorts.includes('EnergyGroupHeating')
      if (heating !== true && energyGroup.idShortCD === 'EnergyGroupHeating') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.id
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCD
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Informationen der Energiegruppe Heizung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the information of the energy group heating'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }

      const cooling = idShorts.includes('EnergyGroupCooling')
      if (cooling !== true && energyGroup.idShortCD === 'EnergyGroupCooling') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.id
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCD
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Informationen der Energiegruppe Kühlung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the information of the energy group cooling'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }

      const air = idShorts.includes('EnergyGroupAirHandling')
      if (air !== true && energyGroup.idShortCD === 'EnergyGroupAirHandling') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.id
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCD
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollection
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCD
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Informationen der Energiegruppe Lüftung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the information of the energy group air handling'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }
      // Add Submodel Element Collections für Enpis
      for (const system in numberSystemsArray) {
        const newEnpiGroup = [
          {
            ordered: false,
            allowDuplicates: false,
            value: [],
            semanticId: {
              keys: [{
                type: 'GlobalReference',
                local: true,
                value: energyGroup.idEnpi,
                index: 0,
                idType: 'IRI'
              }]
            },
            constraints: [],
            hasDataSpecification: [],
            idShort: energyGroup.nameForSubmodelElementCollectionEnpi + ' ' + system,
            category: 'CONSTANT',
            modelType: {
              name: 'SubmodelElementCollection'
            }
          }
        ]
        // console.log(newEnergySourceGroup)
        const submodelKey = enpiInformations.key
        console.log(submodelKey)
        this.$store.dispatch('addEnergyUseGroup', [newEnpiGroup, submodelKey])
      }
      // Add Concept Descriptions der Enpi Collections
      const heatingEnpi = idShorts.includes('EnpiEnergyGroupHeating')
      if (heatingEnpi !== true && energyGroup.idShortCDEnpi === 'EnpiEnergyGroupHeating') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.idEnpi
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCDEnpi
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Energieleistungskennzahlen der Energiegruppe Heizung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the energy performance indicators of the energy group heating'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }
      const coolingEnpi = idShorts.includes('EnpiEnergyGroupCooling')
      if (coolingEnpi !== true && energyGroup.idShortCDEnpi === 'EnpiEnergyGroupCooling') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.idEnpi
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCDEnpi
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Energieleistungskennzahlen der Energiegruppe Kühlung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the energy performance indicators of the energy group cooling'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }
      const airEnpi = idShorts.includes('EnpiEnergyGroupAirHandling')
      if (airEnpi !== true && energyGroup.idShortCDEnpi === 'EnpiEnergyGroupAirHandling') {
        const newConceptDescriptionEnergySourceGroup = {}
        newConceptDescriptionEnergySourceGroup.identification = {
          idType: 'IRI',
          id: energyGroup.idEnpi
        }
        newConceptDescriptionEnergySourceGroup.idShort = energyGroup.idShortCDEnpi
        newConceptDescriptionEnergySourceGroup.modelType = {
          name: 'ConceptDescription'
        }
        newConceptDescriptionEnergySourceGroup.embeddedDataSpecification = [
          {
            dataSpecification: {
              keys: []
            },
            dataSpecificationContent: {
              preferredName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              shortName: [
                {
                  language: 'DE',
                  text: energyGroup.nameForSubmodelElementCollectionEnpi
                },
                {
                  language: 'EN',
                  text: energyGroup.idShortCDEnpi
                }
              ],
              unit: '',
              dataType: '',
              definition: [
                {
                  language: 'DE',
                  text: 'Sammlung der Energieleistungskennzahlen der Energiegruppe Lüftung'
                },
                {
                  language: 'EN',
                  text: 'Collection of the energy performance indicators of the energy group air handling'
                }
              ]
            }
          }
        ]
        newConceptDescriptionEnergySourceGroup.isCaseOf = []
        newConceptDescriptionEnergySourceGroup.descriptions = []

        this.$store.dispatch('createConceptDescriptions', newConceptDescriptionEnergySourceGroup)
      }
    }
  }
}
</script>

<style scoped>
.card-title {
    font-size: 20px;
}
#energyUseGroup:hover {
  background-color: #0a322b !important;
  color: #F2F2F2;
  transition: all 0.5s ease;
}
#energyUseGroup:hover img{
   -webkit-filter: invert(1);
   filter: invert(1);
}
a {
  color: #0a322b;
  text-decoration: none;
}
</style>
