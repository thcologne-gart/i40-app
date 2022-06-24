<template>
    <div>
        <b-card id ="cardOrganizationForm" class="shadow p-3 mb-5 bg-white rounded">
            <b-form @submit="onCreateEmsAas" @reset="onReset">
            <b-form-group
                id="organization-name"
                label="Name der Organisation:"
                label-for="organization-name"
            >
                <b-form-input
                id="organization-name"
                v-model="form.organizationName"
                placeholder="Name der Organisation"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="country"
                label="Land:"
                label-for="country"
            >
                <country-select class="form-select" v-model="form.country" placeholder= 'Sitz des Unternehmens (Land)' topCountry="DE" />
            </b-form-group>

            <b-form-group
                id="city"
                label="Stadt:"
                label-for="city"
            >
                <b-form-input
                id="city"
                v-model="form.city"
                placeholder="Sitz des Unternehmens (Stadt)"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="zipcode"
                label="Postleitzahl:"
                label-for="zipcode"
            >
                <b-form-input
                id="zipcode"
                v-model.number="form.zipcode"
                placeholder="Sitz des Unternehmens (Postleitzahl)"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="number-sites"
                label="Anzahl Standorte:"
                label-for="number-sites"
            >
                <b-form-input
                id="number-sites"
                v-model.number="form.numberOfSites"
                placeholder="Anzahl der Standorte, die in das EMS integriert werden"
                required
                type = number
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="outline-secondary">Submit</b-button>
            <b-button type="reset" variant="outline-secondary">Reset</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        organizationName: '',
        country: '',
        city: '',
        zipcode: null,
        numberOfSites: null
      }
    }
  },
  computed: {
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformation)
      return this.$store.getters.loadedOrganizationInformation
    }
  },
  mounted () {
    this.showForm()
  },
  methods: {
    showForm () {
      // console.log(this.organization[0].value)
      const card = document.getElementById('cardOrganizationForm')
      const alreadyFilled = this.organization[0].value
      // console.log('jiiii')
      if (!alreadyFilled) {
        console.log('nicht null')
      } else {
        card.classList.add('d-none')
      }
    },
    onCreateEmsAas (event) {
      const card = document.getElementById('cardOrganizationForm')
      card.classList.add('d-none')
      console.log(typeof this.form.numberOfSites)
      event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-asset/${this.form.organizationName}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: 'submodels/context',
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `ems-aas/${this.form.organizationName}`
      }
      newAas.idShort = 'EmsAas'
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'ems/context-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: 'submodels/context'
      }
      newSubmodel.idShort = 'Context'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.form.organizationName,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/organization-name',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'OrganizationName',
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
          value: this.form.country,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/country',
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
              value: 'ems/context-semantics/city',
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
              value: 'ems/context-semantics/zipcode',
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
          value: this.form.numberOfSites,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/numberOfSites',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfSites',
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
        }
      ]
      const newConceptDescriptionON = {}
      newConceptDescriptionON.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/organization-name'
      }
      newConceptDescriptionON.idShort = 'OrganizationName'
      newConceptDescriptionON.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionON.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Unternehmensname'
              },
              {
                language: 'EN',
                text: 'OrganizationName'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'UnternhemensName'
              },
              {
                language: 'EN',
                text: 'OrganizationName'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Name des Unternehmens'
              },
              {
                language: 'EN',
                text: 'Name of the organization'
              }
            ]
          }
        }
      ]
      newConceptDescriptionON.isCaseOf = []
      newConceptDescriptionON.descriptions = []

      const newConceptDescriptionCountry = {}
      newConceptDescriptionCountry.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/country'
      }
      newConceptDescriptionCountry.idShort = 'Country'
      newConceptDescriptionCountry.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionCountry.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Land'
              },
              {
                language: 'EN',
                text: 'Country'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Land'
              },
              {
                language: 'EN',
                text: 'Country'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Land in dem das Unternehmen seinen Sitz hat'
              },
              {
                language: 'EN',
                text: 'Country in which the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionCountry.isCaseOf = []
      newConceptDescriptionCountry.descriptions = []

      const newConceptDescriptionCity = {}
      newConceptDescriptionCity.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/city'
      }
      newConceptDescriptionCity.idShort = 'City'
      newConceptDescriptionCity.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionCity.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Stadt'
              },
              {
                language: 'EN',
                text: 'City'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Stadt'
              },
              {
                language: 'EN',
                text: 'City'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Stadt in dem das Unternehmen seinen Sitz hat'
              },
              {
                language: 'EN',
                text: 'City in which the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionCity.isCaseOf = []
      newConceptDescriptionCity.descriptions = []

      const newConceptDescriptionZip = {}
      newConceptDescriptionZip.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/zipcode'
      }
      newConceptDescriptionZip.idShort = 'ZipCode'
      newConceptDescriptionZip.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionZip.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Postleitzahl'
              },
              {
                language: 'EN',
                text: 'Zipcode'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Postleitzahl'
              },
              {
                language: 'EN',
                text: 'Zipcode'
              }
            ],
            unit: '',
            dataType: 'INTEGER',
            definition: [
              {
                language: 'DE',
                text: 'Postleitzahl der Stadt in dem das Unternehmen seinen Sitz hat'
              },
              {
                language: 'EN',
                text: 'Zipcode of the city in which the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionZip.isCaseOf = []
      newConceptDescriptionZip.descriptions = []

      const newConceptDescriptionNoS = {}
      newConceptDescriptionNoS.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/numberOfSites'
      }
      newConceptDescriptionNoS.idShort = 'NumberOfSites'
      newConceptDescriptionNoS.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionNoS.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'AnzahlStandorte'
              },
              {
                language: 'EN',
                text: 'NumberOfSites'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'AnzahlStandorte'
              },
              {
                language: 'EN',
                text: 'NumberOfSites'
              }
            ],
            unit: '',
            dataType: 'INTEGER',
            definition: [
              {
                language: 'DE',
                text: 'Anzahl der Standorte eines Unternehmens'
              },
              {
                language: 'EN',
                text: 'Number of sites from an organization'
              }
            ]
          }
        }
      ]
      newConceptDescriptionNoS.isCaseOf = []
      newConceptDescriptionNoS.descriptions = []

      const newConceptDescription = {}
      newConceptDescription.identification = {
        idType: 'IRDI',
        id: 'site/information-semantics'
      }
      newConceptDescription.idShort = 'SubmodelSiteInformation'
      newConceptDescription.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescription.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'TeilmodellStandortInformation'
              },
              {
                language: 'EN',
                text: 'SubmodelSiteInformation'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'TeilmodellStandortInformation'
              },
              {
                language: 'EN',
                text: 'SubmodelSiteInformation'
              }
            ],
            unit: '',
            dataType: '',
            definition: [
              {
                language: 'DE',
                text: 'Teilmodell mit Informationen über den Standort eines Unternehmens'
              },
              {
                language: 'EN',
                text: 'Submodel with information about a site of an organization'
              }
            ]
          }
        }
      ]
      newConceptDescription.isCaseOf = []
      newConceptDescription.descriptions = []

      const newConceptDescriptionCountrySite = {}
      newConceptDescriptionCountrySite.identification = {
        idType: 'IRI',
        id: 'ems/site/context-semantics/country'
      }
      newConceptDescriptionCountrySite.idShort = 'Country'
      newConceptDescriptionCountrySite.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionCountrySite.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Land'
              },
              {
                language: 'EN',
                text: 'Country'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Land'
              },
              {
                language: 'EN',
                text: 'Country'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Land in dem der Standort des Unternehmens lokalisiert ist'
              },
              {
                language: 'EN',
                text: 'Country in which the site of the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionCountrySite.isCaseOf = []
      newConceptDescriptionCountrySite.descriptions = []

      const newConceptDescriptionCitySite = {}
      newConceptDescriptionCitySite.identification = {
        idType: 'IRI',
        id: 'ems/site/context-semantics/city'
      }
      newConceptDescriptionCitySite.idShort = 'City'
      newConceptDescriptionCitySite.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionCitySite.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Stadt'
              },
              {
                language: 'EN',
                text: 'City'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Stadt'
              },
              {
                language: 'EN',
                text: 'City'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Stadt in dem der Standort des Unternehmens lokalisiert ist'
              },
              {
                language: 'EN',
                text: 'City in which the site of the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionCitySite.isCaseOf = []
      newConceptDescriptionCitySite.descriptions = []

      const newConceptDescriptionZipSite = {}
      newConceptDescriptionZipSite.identification = {
        idType: 'IRI',
        id: 'ems/site/context-semantics/zipcode'
      }
      newConceptDescriptionZipSite.idShort = 'ZipCode'
      newConceptDescriptionZipSite.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionZipSite.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Postleitzahl'
              },
              {
                language: 'EN',
                text: 'Zipcode'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Postleitzahl'
              },
              {
                language: 'EN',
                text: 'Zipcode'
              }
            ],
            unit: '',
            dataType: 'INTEGER',
            definition: [
              {
                language: 'DE',
                text: 'Postleitzahl der Stadt in welcher der Standort des Unternehmens lokalisiert ist'
              },
              {
                language: 'EN',
                text: 'Zipcode of the site of the organization is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionZipSite.isCaseOf = []
      newConceptDescriptionZipSite.descriptions = []

      const newConceptDescriptionNoB = {}
      newConceptDescriptionNoB.identification = {
        idType: 'IRI',
        id: 'ems/site/context-semantics/numberBuildings'
      }
      newConceptDescriptionNoB.idShort = 'NumberOfBuildings'
      newConceptDescriptionNoB.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionNoB.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'AnzahlGebäude'
              },
              {
                language: 'EN',
                text: 'NumberOfBuildings'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'AnzahlGebäude'
              },
              {
                language: 'EN',
                text: 'NumberOfBuildings'
              }
            ],
            unit: '',
            dataType: 'INTEGER',
            definition: [
              {
                language: 'DE',
                text: 'Anzahl der Gebäude an einem Standort eines Unternehmens'
              },
              {
                language: 'EN',
                text: 'Number of buildings at one site of an organization'
              }
            ]
          }
        }
      ]
      newConceptDescriptionNoB.isCaseOf = []
      newConceptDescriptionNoB.descriptions = []

      const newConceptDescriptionSubmodelBuilding = {}
      newConceptDescriptionSubmodelBuilding.identification = {
        idType: 'IRI',
        id: 'ems/building/information-semantics'
      }
      newConceptDescriptionSubmodelBuilding.idShort = 'BuildingInformation'
      newConceptDescriptionSubmodelBuilding.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionSubmodelBuilding.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Gebäudeinformationen'
              },
              {
                language: 'EN',
                text: 'BuildingInformation'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'GebäudeInformationen'
              },
              {
                language: 'EN',
                text: 'BuildingInformation'
              }
            ],
            unit: '',
            dataType: '',
            definition: [
              {
                language: 'DE',
                text: 'Teilmodell mit Informationen über ein Gebäude'
              },
              {
                language: 'EN',
                text: 'Submodel with information about a building'
              }
            ]
          }
        }
      ]
      newConceptDescriptionSubmodelBuilding.isCaseOf = []
      newConceptDescriptionSubmodelBuilding.descriptions = []

      const newConceptDescriptionStreet = {}
      newConceptDescriptionStreet.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/street'
      }
      newConceptDescriptionStreet.idShort = 'Street'
      newConceptDescriptionStreet.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionStreet.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Straße'
              },
              {
                language: 'EN',
                text: 'Street'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Straße'
              },
              {
                language: 'EN',
                text: 'Street'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Straße in der sich das Gebäude befindet'
              },
              {
                language: 'EN',
                text: 'Street where the building is located'
              }
            ]
          }
        }
      ]
      newConceptDescriptionStreet.isCaseOf = []
      newConceptDescriptionStreet.descriptions = []

      const newConceptDescriptionDesignation = {}
      newConceptDescriptionDesignation.identification = {
        idType: 'IRI',
        id: 'ems/context-semantics/designation'
      }
      newConceptDescriptionDesignation.idShort = 'Designation'
      newConceptDescriptionDesignation.modelType = {
        name: 'ConceptDescription'
      }
      newConceptDescriptionDesignation.embeddedDataSpecification = [
        {
          dataSpecification: {
            keys: []
          },
          dataSpecificationContent: {
            preferredName: [
              {
                language: 'DE',
                text: 'Bezeichnung'
              },
              {
                language: 'EN',
                text: 'Designation'
              }
            ],
            shortName: [
              {
                language: 'DE',
                text: 'Bezeichnung'
              },
              {
                language: 'EN',
                text: 'Designation'
              }
            ],
            unit: '',
            dataType: 'STRING',
            definition: [
              {
                language: 'DE',
                text: 'Bezeichnung des Gebäudes'
              },
              {
                language: 'EN',
                text: 'Designation of the building'
              }
            ]
          }
        }
      ]
      newConceptDescriptionDesignation.isCaseOf = []
      newConceptDescriptionDesignation.descriptions = []

      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionCountrySite)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionCitySite)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionZipSite)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionNoB)
      this.$store.dispatch('createConceptDescriptions', newConceptDescription)

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionON)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionCountry)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionCity)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionZip)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionNoS)

      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionSubmodelBuilding)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionStreet)
      this.$store.dispatch('createConceptDescriptions', newConceptDescriptionDesignation)

      console.log(newAas)
      this.$emit('new-aas', newAas)
      this.form.organizationName = ''
      // this.form.country = null
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberOfSites = ''
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.organizationName = ''
      // this.form.country = null
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberOfSites = ''
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
#displayOrganizationInformation {
    margin-inline: 10%;
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
