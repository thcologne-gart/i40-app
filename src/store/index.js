import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database'
import { getStorage, ref as sRef, uploadString, getDownloadURL } from 'firebase/storage'
// import { getDatabase, ref, child, get, push } from 'firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedAas: null,
    loadedAASJson: null,
    loadedAasDeletionEnergyTypes: null,
    loadedSubmodels: null,
    loadedConceptDescriptions: null,
    loadedOrganizationInformation: null,
    loadedSiteInformation: null,
    loadedBuildingInformation: null,
    loadedEnergyTypeInformation: null,
    loadedEnpiSubmodels: null,
    loadEnergySourceGroupsComponents: null,
    // loadedEnergyTypes: null,
    loadedPdfs: null,
    loadedEnpis: null,
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createAas (state, payload) {
      state.loadedAas = payload
    },
    updateSubmodelElementValue (state, payload) {
      state.loadedAASJson = payload
    },
    uploadAas (state, payload) {
      state.loadedAASJson = payload
    },
    createSubmodelContext (state, payload) {
      state.loadedSubmodels = payload
    },
    setLoadedOrganizationInformation (state, payload) {
      state.loadedOrganizationInformation = payload
    },
    updateOrganizationInformation (state, payload) {
      state.loadedOrganizationInformation = payload
    },
    updateSiteInformation (state, payload) {
      state.loadedSiteInformation = payload
    },
    updateBuildingInformation (state, payload) {
      state.loadedBuildingInformation = payload
    },
    updateEnergyTypes (state, payload) {
      state.loadedEnergyTypeInformation = payload
    },
    updateEnpis (state, payload) {
      state.loadedEnpiSubmodels = payload
    },
    setLoadedAas (state, payload) {
      state.loadedAas = payload
    },
    setLoadedAASJson (state, payload) {
      state.loadedAASJson = payload
    },
    setLoadedAasDeletionEnergyTypes (state, payload) {
      state.loadedAasDeletionEnergyTypes = payload
    },
    setLoadedSubmodels (state, payload) {
      state.loadedSubmodels = payload
    },
    setLoadedConceptDescriptions (state, payload) {
      state.loadedConceptDescriptions = payload
    },
    setLoadedSiteInformation (state, payload) {
      state.loadedSiteInformation = payload
    },
    setLoadedBuildingInformation (state, payload) {
      state.loadedBuildingInformation = payload
    },
    setLoadedEnergyTypeInformation (state, payload) {
      state.loadedEnergyTypeInformation = payload
    },
    setLoadedEnpiSubmodels (state, payload) {
      state.loadedEnpiSubmodels = payload
    },
    setLoadedEnpis (state, payload) {
      state.loadedEnpis = payload
    },
    createEnpi (state, payload) {
      state.loadedEnpis.push(payload)
    },
    updateEnpi (state, payload) {
      const enpi = state.loadedEnpis.find(enpi => {
        return enpi.id === payload.id
      })
      if (payload.title) {
        enpi.idShort = payload.idShort
      }
      if (payload.description) {
        enpi.description = payload.description
      }
    },
    /*
    setLoadedEnergyTypes (state, payload) {
      state.loadedEnergyTypes = payload
    },
    createEnergyType (state, payload) {
      state.loadedEnergyTypes.push(payload)
    },
    */
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    uploadPdf (state, payload) {
      state.loadedPdfs.push(payload)
    },
    setLoadedPdfs (state, payload) {
      state.loadedPdfs = payload
    }
  },
  actions: {
    createAas ({ commit }, payload) {
      // const enpi = { payload }
      // console.log(enpi)
      const database = getDatabase()
      // push(child(ref(database, 'enpis')))
      // ref(database, 'enpis').push(enpi)
      push(ref(database, 'assetAdministrationShells/'), {
        payload
      })
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createAas', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addSubmodelToAas ({ commit }, payload) {
      console.log(payload)
      // const newPayload = payload[0]
      const database = getDatabase()
      push(ref(database, 'assetAdministrationShells/' + payload[1] + '/payload/submodels/keys/'), {
        idType: payload[0].idType,
        index: payload[0].index,
        local: payload[0].local,
        type: payload[0].type,
        value: payload[0].value
      })
    },

    addEnergyUseGroup ({ commit }, payload) {
      console.log(payload)
      // const newPayload = payload[0]
      const database = getDatabase()
      push(ref(database, 'submodels/' + payload[1] + '/payload/submodelElements/'), {
        ordered: payload[0][0].ordered,
        allowDuplicates: payload[0][0].allowDuplicates,
        value: payload[0][0].value,
        semanticId: payload[0][0].semanticId,
        constraints: payload[0][0].constraints,
        hasDataSpecification: payload[0][0].hasDataSpecification,
        idShort: payload[0][0].idShort,
        category: payload[0][0].category,
        modelType: payload[0][0].modelType
      })
    },

    addComponentEnergySource ({ commit }, payload) {
      console.log(payload)
      // const newPayload = payload[0]
      const database = getDatabase()
      console.log('submodels/' + payload[1] + '/payload/submodelElements/' + payload[2] + '/')
      push(ref(database, 'submodels/' + payload[1] + '/payload/submodelElements/' + payload[2] + '/value/'), {
        ordered: payload[0][0].ordered,
        allowDuplicates: payload[0][0].allowDuplicates,
        value: payload[0][0].value,
        semanticId: payload[0][0].semanticId,
        constraints: payload[0][0].constraints,
        hasDataSpecification: payload[0][0].hasDataSpecification,
        idShort: payload[0][0].idShort,
        category: payload[0][0].category,
        modelType: payload[0][0].modelType
      })
    },

    updateComponentInformation ({ commit }, payload) {
      const database = getDatabase()
      const updateObj = {}
      // console.log(payload)
      updateObj['/value'] = payload[0].value
      console.log(updateObj)
      console.log('submodels/' + payload[0].submodelKey + '/payload/submodelElements/' + payload[0].groupCollectionKey + '/value/' + payload[0].componentKey + '/value/' + payload[0].submodelElementId)

      return update(ref(database, 'submodels/' + payload[0].submodelKey + '/payload/submodelElements/' + payload[0].groupCollectionKey + '/value/' + payload[0].componentKey + '/value/' + payload[0].submodelElementId), updateObj)
      /*
        .then(() => {
          commit('updateComponentInformation', payload)
        })
        .catch(error => {
          console.log(error)
        })
      */
    },

    updateSubmodelElementValue ({ commit }, payload) {
      const database = getDatabase()
      // const updateObj = {}
      // console.log(payload)
      // updateObj['/value'] = payload[1]
      const updateObj = payload[1]
      // console.log(updateObj)
      // console.log('aas/' + payload[0].aasId + '/submodels/' + payload[0].submodelId + '/submodelElements/' + payload[0].submodelElementId)

      // return update(ref(database, 'aas/' + payload[0].aasId + '/submodels/' + payload[0].submodelId + '/submodelElements/' + payload[0].submodelElementId), updateObj)
      push(ref(database, 'aas/' + payload[0].aasId + '/submodels/' + payload[0].submodelId + '/submodelElements/' + payload[0].submodelElementId + '/value/'), {
        updateObj
      })
        .then((data) => {
          const key = data.key
          // console.log(data)
          commit('updateSubmodelElementValue', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    createSubmodelContext ({ commit }, payload) {
      const database = getDatabase()
      console.log(payload)
      push(ref(database, 'submodels/'), {
        payload
      })
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createSubmodelContext', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    createConceptDescriptions ({ commit }, payload) {
      const database = getDatabase()
      push(ref(database, 'conceptDescriptions/'), {
        payload
      })
    },

    loadAas ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'assetAdministrationShells/'), (snapshot) => {
        const data = snapshot.val()
        let keyAas
        const aas = []
        for (const key in data) {
          const submodelId = data[key].payload.submodels.keys[0].value
          if (submodelId.includes('submodels/building-information/')) {
            keyAas = key
            // console.log(keyAas)
            // const submodelId = data[key].payload.submodels.keys
            aas.push({
              key: keyAas,
              submodelId: submodelId
            })
          }
        }
        // console.log(aas)
        commit('setLoadedAas', aas)
      })
    },

    loadAASJson ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'aas/'), (snapshot) => {
        const data = snapshot.val()
        // console.log(data)
        // let keyAas
        // const aas = []
        /*
        for (const key in data) {
          const submodelId = data[key].payload.submodels.keys[0].value
          if (submodelId.includes('submodels/building-information/')) {
            keyAas = key
            aas.push({
              key: keyAas,
              submodelId: submodelId
            })
          }
        }
        */
        // console.log(aas)
        commit('setLoadedAASJson', data)
      })
    },

    loadAasDeleteionEnergyTypes ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'assetAdministrationShells/'), (snapshot) => {
        const data = snapshot.val()
        let keyAas
        const aas = []
        for (const key in data) {
          keyAas = key
          // console.log(keyAas)
          // const submodelId = data[key].payload.submodels.keys
          aas.push({
            aasKey: keyAas,
            submodels: data[key].payload.submodels.keys
          })
        }
        commit('setLoadedAasDeletionEnergyTypes', aas)
      })
    },

    loadSubmodels ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        commit('setLoadedSubmodels', data)
      })
    },

    loadConceptDescriptions ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'conceptDescriptions/'), (snapshot) => {
        const data = snapshot.val()
        commit('setLoadedConceptDescriptions', data)
      })
    },

    loadSiteInformation ({ commit }) {
      const database = getDatabase()
      // let keySubmodelContext
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        let keySubmodelContext2
        const submodelElements2 = []
        // console.log(data)
        for (const key in data) {
          if (data[key].payload.semanticId.keys[0].value === 'site/information-semantics') {
            // console.log(data)
            keySubmodelContext2 = key
            const submodelId = data[key].payload.identification.id
            // console.log(keySubmodelContext2)
            const dataSubmodelElements2 = data[key].payload.submodelElements
            // console.log(dataSubmodelElements2)
            dataSubmodelElements2.push({
              key: keySubmodelContext2,
              id: submodelId
            })
            // console.log(dataSubmodelElements2)
            submodelElements2.push(dataSubmodelElements2)
            // submodelElements2.push(keySubmodelContext2)
            // console.log(submodelElements2)
            /*
            for (const keyElements in dataSubmodelElements2) {
              elementsWithKey.push({
                key: keySubmodelContext2,
                id: keyElements,
                idShort: dataSubmodelElements2[keyElements].idShort,
                value: dataSubmodelElements2[keyElements].value
              })
            }
            */
            // console.log(submodelElements2)
            commit('setLoadedSiteInformation', submodelElements2)
          }
        }
      })
    },

    loadBuildingInformation ({ commit }) {
      const database = getDatabase()
      // let keySubmodelContext
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        let keySubmodelContext2
        const submodelElements2 = []
        // console.log(data)
        for (const key in data) {
          if (data[key].payload.semanticId.keys[0].value === 'ems/building/information-semantics') {
            keySubmodelContext2 = key
            const dataSubmodelElements2 = data[key].payload.submodelElements
            dataSubmodelElements2.push({
              submodelId: data[key].payload.identification.id,
              key: keySubmodelContext2
            })
            submodelElements2.push(dataSubmodelElements2)
            commit('setLoadedBuildingInformation', submodelElements2)
          }
        }
      })
    },
    loadEnergyTypeInformation ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        let keySubmodelContext2
        const submodelElements2 = []
        // console.log(data)
        for (const key in data) {
          if (data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeElectricity' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeHeat' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeGas' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeOil' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeBiomass' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypePellets' || data[key].payload.semanticId.keys[0].value === 'submodel/energyTypeSteam') {
            keySubmodelContext2 = key
            // console.log(keySubmodelContext2)
            // console.log((data[key]).payload)
            // let dataSubmodelElements2
            // const dataSubmodelElements2 = data[key].payload.submodelElements
            // console.log(typeof dataSubmodelElements2)
            const allSubmodelElements = []
            allSubmodelElements.push({
              submodelName: data[key].payload.idShort,
              submodelId: data[key].payload.identification.id,
              key: keySubmodelContext2,
              submodelSemanticId: data[key].payload.semanticId.keys[0].value
            })
            // console.log(typeof allSubmodelElements)
            for (const element in data[key].payload.submodelElements) {
              // console.log(element)
              if (data[key].payload.submodelElements[element].modelType.name === 'Property') {
                // console.log(data[key].payload.submodelElements[element])
                allSubmodelElements.push({
                  [element]: data[key].payload.submodelElements[element]
                })
              } else if (data[key].payload.submodelElements[element].modelType.name === 'SubmodelElementCollection') {
                // console.log('SubmodelCollection')
                // console.log(data[key].payload.submodelElements[element])
                allSubmodelElements.push({
                  [element]: data[key].payload.submodelElements[element]
                })
              }
            }
            // console.log(allSubmodelElements)
            // console.log(dataSubmodelElements2)
            /*
            dataSubmodelElements2.push({
              submodelName: data[key].payload.idShort,
              submodelId: data[key].payload.identification.id,
              key: keySubmodelContext2,
              submodelSemanticId: data[key].payload.semanticId.keys[0].value
            })
            */
            submodelElements2.push(allSubmodelElements)
            // console.log(submodelElements2)
            commit('setLoadedEnergyTypeInformation', submodelElements2)
          }
        }
      })
    },
    loadEnpiSubmodels ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        let keySubmodelContext2
        const submodelElements2 = []
        for (const key in data) {
          if (data[key].payload.semanticId.keys[0].value === 'submodel/enpiElectricity' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiHeat' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiGas' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiOil' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiBiomass' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiPellets' || data[key].payload.semanticId.keys[0].value === 'submodel/enpiSteam') {
            keySubmodelContext2 = key
            const allSubmodelElements = []
            allSubmodelElements.push({
              submodelName: data[key].payload.idShort,
              submodelId: data[key].payload.identification.id,
              key: keySubmodelContext2,
              submodelSemanticId: data[key].payload.semanticId.keys[0].value
            })
            for (const element in data[key].payload.submodelElements) {
              if (data[key].payload.submodelElements[element].modelType.name === 'Property') {
                allSubmodelElements.push({
                  [element]: data[key].payload.submodelElements[element]
                })
              } else if (data[key].payload.submodelElements[element].modelType.name === 'SubmodelElementCollection') {
                allSubmodelElements.push({
                  [element]: data[key].payload.submodelElements[element]
                })
              }
            }
            submodelElements2.push(allSubmodelElements)
            commit('setLoadedEnpiSubmodels', submodelElements2)
          }
        }
      })
    },

    loadOrganizationInformation ({ commit }) {
      const database = getDatabase()
      // let keySubmodelContext
      onValue(ref(database, 'submodels/'), (snapshot) => {
        const data = snapshot.val()
        let keySubmodelContext2
        const submodelElements2 = []
        for (const key in data) {
          if (data[key].payload.semanticId.keys[0].value === 'ems/context-semantics') {
            keySubmodelContext2 = key
            const dataSubmodelElements2 = data[key].payload.submodelElements

            for (const keyElements in dataSubmodelElements2) {
              submodelElements2.push({
                key: keySubmodelContext2,
                id: keyElements,
                idShort: dataSubmodelElements2[keyElements].idShort,
                value: dataSubmodelElements2[keyElements].value
              })
            }
            commit('setLoadedOrganizationInformation', submodelElements2)
          }
        }
      })
    },
    /*
            submodels.push({
              id: key,
              idShort: data[key].payload.semanticId.keys[0].value
            })
          }
        }
        const iterator = submodels.values()
        console.log(submodels)
        for (const item of iterator) {
          if (item.idShort === 'ems/context-semantics') {
            keySubmodelContext1 = item.id
            console.log(item.id)
          }
        }
        // commit('setLoadedOrganizationInformation', submodels)
        onValue(ref(database, 'submodels/' + keySubmodelContext1 + '/payload/submodelElements'), (snapshot) => {
          const dataSubmodelElements = snapshot.val()
          console.log(dataSubmodelElements)
          // const submodelElements = []
          for (const keyElements in dataSubmodelElements) {
            submodelElements.push({
              key: keySubmodelContext1,
              id: keyElements,
              idShort: dataSubmodelElements[keyElements].idShort,
              value: dataSubmodelElements[keyElements].value
            })
          }
          console.log(submodelElements)
          // return submodelElements
        })
        console.log(submodelElements)
        commit('setLoadedOrganizationInformation', submodelElements)
      })
    },
    */

    updateOrganizationInformation ({ commit }, payload) {
      const database = getDatabase()
      const updateObj = {}
      // updateObj.value = payload.organizationName
      updateObj['/0/value'] = payload.organizationName
      updateObj['/1/value'] = payload.organizationCountry
      updateObj['/2/value'] = payload.organizationCity
      updateObj['/3/value'] = payload.organizationZip

      return update(ref(database, 'submodels/' + payload.id + '/payload/submodelElements'), updateObj)
        .then(() => {
          commit('updateOrganizationInformation', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateSiteInformation ({ commit }, payload) {
      const database = getDatabase()
      const updateObj = {}
      // updateObj.value = payload.organizationName
      updateObj['/0/value'] = payload.siteCountry
      updateObj['/1/value'] = payload.siteCity
      updateObj['/2/value'] = payload.siteZip
      updateObj['/3/value'] = payload.siteNumberBuildings

      return update(ref(database, 'submodels/' + payload.id + '/payload/submodelElements'), updateObj)
        .then(() => {
          commit('updateSiteInformation', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateBuildingInformation ({ commit }, payload) {
      const database = getDatabase()
      const updateObj = {}
      // updateObj.value = payload.organizationName
      updateObj['/0/value'] = payload.buildingStreet
      updateObj['/1/value'] = payload.buildingDesignation

      return update(ref(database, 'submodels/' + payload.id + '/payload/submodelElements'), updateObj)
        .then(() => {
          commit('updateBuildingInformation', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadEnpis ({ commit }) {
      const database = getDatabase()
      // const readEnpis = ref(database, 'enpis/')
      // console.log(readEnpis)
      onValue(ref(database, 'enpis/'), (snapshot) => {
        const data = snapshot.val()
        const enpis = []
        for (const key in data) {
          enpis.push({
            id: key,
            name: data[key].payload.idShort,
            description: data[key].payload.description,
            value: data[key].payload.semanticId.keys[0].value
          })
        }
        commit('setLoadedEnpis', enpis)
      })
    },

    createEnpi ({ commit }, payload) {
      // const enpi = { payload }
      // console.log(enpi)
      const database = getDatabase()
      // push(child(ref(database, 'enpis')))
      // ref(database, 'enpis').push(enpi)
      push(ref(database, 'enpis/'), {
        payload
      })
        .then((data) => {
          const key = data.key
          commit('createEnpi', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /*
    createEnergyType ({ commit }, payload) {
      // const enpi = { payload }
      // console.log(enpi)
      const database = getDatabase()
      // push(child(ref(database, 'enpis')))
      // ref(database, 'enpis').push(enpi)
      push(ref(database, 'energyTypes/'), {
        payload
      })
        .then((data) => {
          const key = data.key
          commit('createEnergyType', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadEnergyTypes ({ commit }) {
      const database = getDatabase()
      // const readEnpis = ref(database, 'enpis/')
      // console.log(readEnpis)
      onValue(ref(database, 'energyTypes/'), (snapshot) => {
        const data = snapshot.val()
        const energyTypes = []
        // console.log(enpis)
        for (const key in data) {
          energyTypes.push({
            id: key,
            name: data[key].payload.idShort,
            description: data[key].payload.description,
            value: data[key].payload.semanticId.keys[0].value
          })
        }
        commit('setLoadedEnergyTypes', energyTypes)
      })
    },
    */
    uploadPdf ({ commit }, payload) {
      const database = getDatabase()
      let pdfUrl
      let key
      const pdfData = payload[0]
      const submodelElement = payload[1]
      console.log(payload[2])
      // const idInformation = payload[2]
      console.log('submodels/' + payload[2].submodelId + '/payload/submodelElements/' + payload[2].energySourceCollectionId + '/value/' + payload[2].componentCollectionId + '/value/')
      push(ref(database, 'submodels/' + payload[2].submodelId + '/payload/submodelElements/' + payload[2].energySourceCollectionId + '/value/' + payload[2].componentCollectionId + '/value/'), {
        submodelElement
      })
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = pdfData.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const storage = getStorage()
          const storageRef = sRef(storage, 'pdfs/' + key + ext)
          return uploadString(storageRef, pdfData.pdfContent, 'data_url')
        })
        .then(fileData => {
          console.log(fileData.metadata.fullPath)
          const storage = getStorage()
          return getDownloadURL(sRef(storage, fileData.metadata.fullPath))
            .then((url) => {
              pdfUrl = url
              return update(ref(database, 'submodels/' + payload[2].submodelId + '/payload/submodelElements/' + payload[2].energySourceCollectionId + '/value/' + payload[2].componentCollectionId + '/value/' + key), { pdfUrl: pdfUrl })
            })
            // console.log(pdfUrl)
            // return ref(database, 'pdfs').child(key).update({ pdfUrl: pdfUrl })
        })
        .then(() => {
          commit('uploadPdf', {
            ...pdfData,
            pdfUrl: pdfUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      /*
      push(ref(database, 'pdfs/'), {
        pdfData
      })
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const storage = getStorage()
          const storageRef = sRef(storage, 'pdfs/' + key + ext)
          return uploadString(storageRef, payload.pdfContent, 'data_url')
        })
        .then(fileData => {
          console.log(fileData.metadata.fullPath)
          const storage = getStorage()
          return getDownloadURL(sRef(storage, fileData.metadata.fullPath))
            .then((url) => {
              pdfUrl = url
              return update(ref(database, 'pdfs/' + key + '/payload'), { pdfUrl: pdfUrl })
            })
          // console.log(pdfUrl)
          // return ref(database, 'pdfs').child(key).update({ pdfUrl: pdfUrl })
        })
        .then(() => {
          commit('uploadPdf', {
            ...payload,
            pdfUrl: pdfUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
        */
    },

    loadPdfs ({ commit }) {
      const database = getDatabase()
      onValue(ref(database, 'pdfs/'), (snapshot) => {
        const data = snapshot.val()
        const pdfs = []
        for (const key in data) {
          pdfs.push({
            id: key,
            name: data[key].payload.name,
            pdfUrl: data[key].payload.pdfUrl,
            pdfContent: data[key].payload.pdfContent,
            type: data[key].payload.type
          })
        }
        commit('setLoadedPdfs', pdfs)
      })
    },

    uploadAAS ({ commit }, payload) {
      const database = getDatabase()
      push(ref(database, 'aas/'), {
        payload
      })
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('uploadAas', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    updateEnpiData ({ commit }, payload) {
      const database = getDatabase()
      const updateObj = {}
      if (payload.idShort) {
        updateObj.idShort = payload.idShort
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      return update(ref(database, 'enpis/' + payload.id + '/payload'), updateObj)
        .then(() => {
          commit('updateEnpi', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteEnpi ({ commit }, payload) {
      const database = getDatabase()
      return remove(ref(database, 'enpis/' + payload.id + '/payload'))
    },

    deleteEnergyType ({ commit }, payload) {
      const database = getDatabase()
      return remove(ref(database, 'submodels/' + payload.id))
    },
    deleteSubmodelFromAas ({ commit }, payload) {
      const database = getDatabase()
      return remove(ref(database, 'assetAdministrationShells/' + payload[0].aasKey + '/payload/submodels/keys/' + payload[0].submodelKey))
    },
    deletePdf ({ commit }, payload) {
      // console.log(payload)
      const database = getDatabase()
      return remove(ref(database, 'submodels/' + payload.submodelId + '/payload/submodelElements/' + payload.sourceGroupId + '/value/' + payload.componentId + '/value/' + payload.pdfId))
    },

    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      const auth = getAuth()
      /*
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
      */
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          commit('setLoading', false)
          const newUser = {
            id: userCredential.user.uid
          }
          commit('setUser', newUser)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      const auth = getAuth()
      /*
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            console.log(newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
      */
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const newUser = {
            id: userCredential.user.uid
          }
          commit('setUser', newUser)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid })
    },
    logout ({ commit }) {
      const auth = getAuth()
      signOut(auth)
      commit('setUser', null)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  modules: {
  },
  getters: {
    loadedAas (state) {
      return state.loadedAas
    },
    loadedAASJson (state) {
      return state.loadedAASJson
    },
    loadedAasDeletionEnergyTypes (state) {
      return state.loadedAasDeletionEnergyTypes
    },
    loadedSubmodels (state) {
      return state.loadedSubmodels
    },
    loadedConceptDescriptions (state) {
      return state.loadedConceptDescriptions
    },
    loadedOrganizationInformation (state) {
      return state.loadedOrganizationInformation
    },
    loadedSiteInformation (state) {
      return state.loadedSiteInformation
    },
    loadedBuildingInformation (state) {
      return state.loadedBuildingInformation
    },
    loadedEnergyTypeInformation (state) {
      return state.loadedEnergyTypeInformation
    },
    loadedEnpiSubmodels (state) {
      return state.loadedEnpiSubmodels
    },
    loadedEnpis (state) {
      return state.loadedEnpis
    },
    /*
    loadedEnergyTypes (state) {
      return state.loadedEnergyTypes
    },
    */
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    loadedPdfs (state) {
      return state.loadedPdfs
    }
  }
})
