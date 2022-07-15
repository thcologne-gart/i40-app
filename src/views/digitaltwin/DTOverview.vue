<template>
  <div>
    <h4 id ="header">Verwaltungsschalen</h4>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="(shell, aasId) in aas" :key="shell[0]"
            cols=4
          >
            <v-card class="shadow p-3 mb-5 bg-white rounded" id="show-shell" height="250px">
                <v-card-subtitle>{{ shell.assetAdministrationShells[0].idShort }}</v-card-subtitle>
                  <router-link :to = "{ name: 'AAS Detail', params: { aas: shell, aasId: aasId } }">
                      <v-img aspect-ratio="2.0" contain top fluid :src= aasPic></v-img>
                  </router-link>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: null,
      filename: '',
      isHidden: false,
      interval: null,
      loadAas: [],
      showAas: []
    }
  },
  methods: {
    onFileSelected (e) {
      e.preventDefault()
      // console.log(e)
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
      // console.log(this.file)
    },
    onUploadAAS () {
      const aasData = {
        aasContent: this.filename,
        name: this.file.name,
        type: this.file.type,
        lastModifiedDate: this.file.lastModifiedDate
      }
      // console.log(aasData)
      this.$store.dispatch('uploadAAS', aasData)
    }
  },

  computed: {
    aas () {
      // console.log(this.$store.getters.loadedAASJson)
      const loadedAas = this.$store.getters.loadedAASJson
      // console.log(loadedAas.aas1)
      // this.loadAas = loadedAas
      // for (const item in loadedAas) {
      // console.log(loadedAas[item].payload.aasContent)
      // const json = atob(loadedAas[item].payload.aasContent)
      // const result = JSON.parse(json)
      // console.log(result)
      // }
      return loadedAas
    }
  },
  created () {
    // console.log(this.aas.length)

    const count = Object.keys(this.aas).length
    // console.log(count)
    // this.interval = setInterval(() => {
    for (const item in this.aas) {
      // console.log(this.aas[item])
      if (count > this.showAas.length) {
        const thisAas = this.aas[item]
        // console.log(thisAas)
        setTimeout(addAas, 4000, thisAas)
      }
    }
    var array = [1, 2, 3, 4, 5]

    for (var i = 0; i < array.length; i++) {
      delay(i, array)
    }

    /*
      this.interval = setInterval(() => {
        console.log(this.aas[item])
        if (count > this.showAas.length) {
          this.showAas.push(this.aas[item])
          // console.log(this.showAas)
        } else {
          clearInterval(this.interval)
        }
      }, 8000)
      console.log(this.showAas)
    }
    */
    // console.log(this.interval)
    // console.log(this.showAas)
    // this.allAas = []
    // let aas
    // const repo = require('../assets/aas')
    // for (aas in repo) {
    //  console.log(repo[aas])
    //  this.allAas.push(aas)
    // }
    // console.log(this.allAas)
    this.aasPic = require('@/assets/AAS.svg')
    // console.log(this.aasPic)
    this.allAas = [
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/example_aas.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/Example_AAS_ServoDCMotor_21.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/14_Siemens.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/RLTGALab_mitProperties_rev10.json') },
      { pic: require('@/assets/AAS.svg'), aas: require('@/assets/aas/SupplyTemperature_20210201.json') }
    ]
    // console.log(this.allAas)
    // this.submodelsJson = await this.fetchTasks()
    // const test = await this.fetchAas()
    // this.submodelsInAas = test[0]
    // this.aasJson = test[1]
  }
}

function addAas (thisAas) {
  // console.log(thisAas)
}

function delay (i, array) {
  setTimeout(() => {
    // console.log(array[i])
  }, 4000)
}

</script>

<style scoped>
#aas-row {
  width: fit-content;
}
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
    color: #0a322b;
}
</style>
