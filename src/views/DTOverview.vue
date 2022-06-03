<template>
  <div>
    <h4 id ="header">Verwaltungsschalen</h4>
    <b-card-group>
        <div v-for="aas in allAas" :key="aas.assetAdministrationShells">
        <b-card
        :sub-title= aas.aas.assetAdministrationShells[0].idShort>
            <router-link :to = "{ name: 'AAS Detail', params: { aas: aas } }">
                <b-card-img height="80px" top fluid :src= aas.pic></b-card-img>
            </router-link>
        </b-card>
        </div>
    </b-card-group>
  </div>
</template>

<script>
export default {
  async created () {
    // this.allAas = []
    // let aas
    // const repo = require('../assets/aas')
    // for (aas in repo) {
    //  console.log(repo[aas])
    //  this.allAas.push(aas)
    // }
    // console.log(this.allAas)
    this.allAas = [
      { pic: require('../assets/AAS.svg'), aas: require('../assets/aas/example_aas.json') },
      { pic: require('../assets/AAS.svg'), aas: require('../assets/aas/Example_AAS_ServoDCMotor_21.json') },
      { pic: require('../assets/AAS.svg'), aas: require('../assets/aas/14_Siemens.json') }
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
.card-group {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}
.card {
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
