<template>
  <div>
    <h4 id ="header">Verwaltungsschalen</h4>
    <!--
    <b-card-group>
        <div v-for="aas in allAas" :key="aas.assetAdministrationShells">
        <b-card class="shadow p-3 mb-5 bg-white rounded" id="show-aas"
        :sub-title= aas.aas.assetAdministrationShells[0].idShort>
            <router-link :to = "{ name: 'AAS Detail', params: { aas: aas.aas } }">
                <b-card-img height="80px" top fluid :src= aasPic></b-card-img>
            </router-link>
        </b-card>
        </div>
    </b-card-group>
    -->
    <b-card-group>
        <div v-for="shell in aas" :key="shell[0]">
        <b-card class="shadow p-3 mb-5 bg-white rounded" id="show-shell"
        :sub-title= shell.assetAdministrationShells[0].idShort>
            <router-link :to = "{ name: 'AAS Detail', params: { aas: shell } }">
                <b-card-img height="80px" top fluid :src= aasPic></b-card-img>
            </router-link>
        </b-card>
        </div>
    </b-card-group>
    <div>
        <b-card class="shadow p-3 mb-5 bg-white rounded" id="add-aas-card">
            <h4 id ="header">Verwaltungsschalen hinzufügen</h4>
            <b-col class="text-left" cols="4">
                <b-form-file v-model="file" plain accept=".json" @change="onFileSelected"></b-form-file>
            </b-col>
                <div id="json" v-if="filename !== ''">
                    <div>
                        <button id="upload-button" @click="onUploadAAS()" v-on:click="isHidden = true" variant="outline-warning">Upload AAS</button>
                    </div>
                        <iframe
                            :src= 'filename'
                            width="85%"
                            height="770"
                            v-if="!isHidden"
                        >
                        </iframe>
                </div>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: null,
      filename: '',
      isHidden: false
    }
  },
  methods: {
    onFileSelected (e) {
      e.preventDefault()
      console.log(e)
      const files = e.target.files
      // this.file = e.target.files[0]
      // let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.filename = fileReader.result
        // console.log(this.filename)
      })
      fileReader.readAsDataURL(files[0])
      // const file2 = fileReader.readAsText(files[0])
      // console.log(file2)
      this.file = files[0]
      console.log(this.file)
    },
    onUploadAAS () {
      const aasData = {
        aasContent: this.filename,
        name: this.file.name,
        type: this.file.type,
        lastModifiedDate: this.file.lastModifiedDate
      }
      console.log(aasData)
      this.$store.dispatch('uploadAAS', aasData)
    }
  },

  computed: {
    aas () {
      console.log(this.$store.getters.loadedAASJson)
      const loadedAas = this.$store.getters.loadedAASJson
      console.log(loadedAas.aas1)
      // for (const item in loadedAas) {
      // console.log(loadedAas[item].payload.aasContent)
      // const json = atob(loadedAas[item].payload.aasContent)
      // const result = JSON.parse(json)
      // console.log(result)
      // }
      return loadedAas
    }
  },
  async created () {
    // this.allAas = []
    // let aas
    // const repo = require('../assets/aas')
    // for (aas in repo) {
    //  console.log(repo[aas])
    //  this.allAas.push(aas)
    // }
    // console.log(this.allAas)
    this.aasPic = require('@/assets/AAS.svg')
    console.log(this.aasPic)
    this.allAas = [
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/example_aas.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/Example_AAS_ServoDCMotor_21.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/14_Siemens.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/RLTGALab_mitProperties_rev10.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/SupplyTemperature_20210201.json') }
    ]
    console.log(this.allAas)
    // this.submodelsJson = await this.fetchTasks()
    // const test = await this.fetchAas()
    // this.submodelsInAas = test[0]
    // this.aasJson = test[1]
  }
}
</script>

<style scoped>
#add-aas-card {
    margin-inline: 30%;
    margin-bottom: 30px;
}
.card-group {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}
#show-aas {
    width: 260px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 30px;
}
#show-shell {
    width: 260px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 30px;
}
#header {
    margin-top: 15px;
    color: #025939;
}
</style>
