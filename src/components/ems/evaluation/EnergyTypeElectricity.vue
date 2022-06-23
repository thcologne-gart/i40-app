<template>
    <div>
        <b-row>
            <b-col :key="energyGroup.id" v-for="energyGroup in energyUseGroup">
                <a href="#">
                    <b-card id="energyUseGroup"
                        v-bind:title = energyGroup.name
                        class="shadow p-3 mb-5 bg-white rounded"
                    >
                        <div v-if="energyGroup.name === 'Heizung'">
                            <b-card-img v-b-modal="energyType[0].key + 'heating'" href="#" style="max-width: 20%;" top fluid :src= energyGroup.pic></b-card-img>
                            <b-modal v-bind:id="energyType[0].key + 'heating'" hide-footer width="350px" persistent :title="energyGroup.name">
                                <b-form-group
                                    id="input-group-1"
                                    label="Anzahl getrennter Heizsysteme im Gebäude:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    placeholder="Anzahl Heizsysteme"
                                    v-model.number="numberSystems"
                                    required
                                    ></b-form-input>
                                </b-form-group>

                                <hr>
                                <b-button class="mt-3" variant="outline-secondary" block  @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</b-button>
                            </b-modal>
                        </div>

                        <div v-else-if="energyGroup.name === 'Kühlung'">
                            <a href="#">
                                <b-card-img v-b-modal="energyType[0].key + 'cooling'" href="#" style="max-width: 20%;" top fluid :src= energyGroup.pic></b-card-img>
                            </a>
                            <b-modal v-bind:id="energyType[0].key + 'cooling'" hide-footer width="350px" persistent :title="energyGroup.name">
                                <b-form-group
                                    id="input-group-1"
                                    label="Anzahl getrennter Kühlsysteme im Gebäude:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    placeholder="Anzahl Kühlsysteme"
                                    v-model.number="numberSystems"
                                    required
                                    ></b-form-input>
                                </b-form-group>

                                <hr>
                                <b-button class="mt-3" variant="outline-secondary" block  @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</b-button>
                            </b-modal>
                        </div>

                        <div v-else-if="energyGroup.name === 'Lüftung'">
                            <a href="#">
                                <b-card-img v-b-modal="energyType[0].key + 'air'" href="#" style="max-width: 20%;" top fluid :src= energyGroup.pic></b-card-img>
                            </a>
                            <b-modal v-bind:id="energyType[0].key + 'air'" hide-footer width="350px" persistent :title="energyGroup.name">
                                <b-form-group
                                    id="input-group-1"
                                    label="Anzahl getrennter Lüftungssysteme im Gebäude:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    placeholder="Anzahl Lüftungssysteme"
                                    v-model.number="numberSystems"
                                    required
                                    ></b-form-input>
                                </b-form-group>

                                <hr>
                                <b-button class="mt-3" variant="outline-secondary" block  @click="onSubmitEnergySourceGroup ([energyGroup, numberSystems, energyType, getEnpis])">Save</b-button>
                            </b-modal>
                        </div>

                        <!--
                        <a href="#">
                            <b-card-img v-b-modal="energyGroup.name" @click="onSubmitEnergySourceGroup (energyGroup)" href="#" style="max-width: 20%;" top fluid :src= energyGroup.pic></b-card-img>
                        </a>
                        -->
                    </b-card>
                </a>
            </b-col>
        </b-row>
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
    site: Number
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
      this.$bvModal.hide(energyType[0].key + 'heating')
      this.$bvModal.hide(energyType[0].key + 'cooling')
      this.$bvModal.hide(energyType[0].key + 'air')
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
