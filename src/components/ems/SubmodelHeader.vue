<template>
    <div id = "header">
        <div v-if="buildings.length < numberOfBuildingsAsArray.length">
          <v-card no-body class="mx-auto my-12" elevation="4" max-width="90%" id="overall-building-card">
              <v-tabs v-model="tab" vertical id="buildings-tabs" background-color="grey lighten-5" slider-color="#FFAC1C" color="#0a322b">
                  <v-tab v-for="building in numberOfBuildingsAsArray" :key="building">
                    Gebäude {{ building }}
                  </v-tab>
                  <v-tab-item v-for="building in numberOfBuildingsAsArray" :key="building">
                    <slot name="building" v-bind:building="building">Platzhalter</slot>
                  </v-tab-item>
              </v-tabs>
          </v-card>
        </div>
        <div v-else-if="buildings.length === numberOfBuildingsAsArray.length">
            <v-card no-body class="mx-auto my-12" elevation="4" max-width="90%" id="overall-building-card">
                <v-tabs v-model="tab" vertical id="buildings-tabs" background-color="grey lighten-5" slider-color="#FFAC1C" color="#0a322b">
                    <v-tab v-for="building in buildings" :key="building.buildingNames">
                      {{ building.buildingNames }}
                    </v-tab>
                    <v-tab-item v-for="building in buildings" :key="building.buildingNames">
                      <slot name="building" v-bind:building="building.buildingNumber">Platzhalter</slot>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </div>
    </div>
</template>

<script>

export default {
  name: 'SubmodelHeader',
  data () {
    return {
      tab: null
    }
  },
  props: {
    submodelName: String,
    numberOfBuildings: Array,
    site: Number
  },
  computed: {
    numberOfBuildingsAsArray () {
      let i
      const numberOfBuildings = [1]
      const site = this.site + 1
      console.log(this.site)
      console.log(this.numberOfBuildings)
      for (const item in this.numberOfBuildings) {
        if (this.numberOfBuildings[item].numberOfSite === site) {
          // console.log(this.numberOfBuildings[item].numberOfBuildings)
          for (i = 2; i <= this.numberOfBuildings[item].numberOfBuildings; i++) {
            numberOfBuildings.push(i)
          }
        }
      }
      console.log(numberOfBuildings)
      return numberOfBuildings
    },
    buildings () {
      const buildings = this.$store.getters.loadedBuildingInformation
      console.log(buildings)
      // console.log(this.site)
      const buildingsArray = []
      const site = this.site + 1
      console.log(site)
      for (const item in buildings) {
        for (const test in this.numberOfBuildingsAsArray) {
          if (buildings[item][3].value === this.numberOfBuildingsAsArray[test] && buildings[item][2].value === site) {
            console.log('yay')
            buildingsArray.push({
              // numberOfSite: buildings[item][2].value,
              buildingNumber: buildings[item][3].value,
              // numberBuildings: this.numberOfBuildingsAsArray[test].numberBuildingsArray
              buildingNames: buildings[item][1].value
            })
          }
        }
      }
      console.log(buildingsArray)
      return buildingsArray
    }
  }
}
</script>

<style scoped>
#building-navbar {
    margin-top: -50px;
}
.nav-item-dropdown {
    color: green;
    background-color: black;;
}
#header {
    margin-top: 15px;
    color: #0a322b;
}
</style>
