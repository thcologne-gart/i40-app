<template>
    <v-row id ="row-chapter">
        <v-col id ="navigation" md = "2">
          <v-card class="mx-auto" height="100%" tile>
            <v-navigation-drawer color="grey lighten-5" width="100%">
                <!-- Change active class, siehe border -->
                <v-list-group
                v-for="site in sites"
                :key="site[1].value"
                no-action
                active-class="border"
                >
                <template v-slot:activator>
                    <v-list-item @click="chooseSite(site)">
                    <!-- <v-list-item link :to= "{ name: 'General Infos', params: { site: site } }"></v-list-item> -->
                      <v-list-item-content @click="chooseSite(site)">
                      <v-list-item-title v-text="site[1].value"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </template>
                    <div v-for="building in buildings" :key="building.submodelId">
                        <v-list-item v-if="building.numberOfSite === site[4].value" @click="chooseBuilding(building)">
                            <v-list-item-content >
                                <v-list-item-title v-text="building.buildingDesignation"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list-group>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col id = "content" md = "10">
            <v-card v-if="choosedBuilding !==''" class="mx-auto my-8" elevation="2" max-width="80%">
                <v-card-title id="card-title">{{ choosedBuilding.buildingDesignation }}</v-card-title>
                <v-card-subtitle class="mt-3">{{ grundfunktionString }}</v-card-subtitle>
                <hr>
                <div v-for="funktion in differentGrundfunktionen" :key="funktion">
                    <div v-if="funktion === 'Verteilen' && grundfunktionString ==='Wärme versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="verteilen" :funktion="funktion"/>
                    </div>
                    <div v-if="funktion === 'Erzeugen' && grundfunktionString ==='Wärme versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="erzeugen" :funktion="funktion"/>
                    </div>
                    <div v-if="funktion === 'Beziehen' && grundfunktionString ==='Wärme versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="beziehen" :funktion="funktion"/>
                    </div>
                    <div v-if="funktion === 'Speichern' && grundfunktionString ==='Wärme versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="speichern" :funktion="funktion"/>
                    </div>
                    <div v-if="funktion === 'LuftVerteilen' && grundfunktionString ==='Luft versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="verteilen" :funktion="funktion"/>
                    </div>
                    <div v-if="funktion === 'LuftBereitstellen' && grundfunktionString ==='Luft versorgen'">
                        <ShowBACnetProperties :zweiteGrundfunktion="bereitstellen" :funktion="funktion"/>
                    </div>
                </div>
            </v-card>
            <EditBACnetProperties :grundfunktion="grundfunktion" />
            <v-card v-if="choosedSite !==''" class="mx-auto my-8" elevation="2" max-width="80%">
                <v-card-title id="card-title">{{ choosedSite[1].value }}</v-card-title>
                <v-card-subtitle class="mt-3">{{ grundfunktionString }}</v-card-subtitle>
                <hr>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ShowBACnetProperties from '@/components/bp/ShowBACnetProperties.vue'
import EditBACnetProperties from '@/components/bp/EditBACnetProperties.vue'

export default {
  components: { ShowBACnetProperties, EditBACnetProperties },
  props: {
    sites: Array,
    buildings: Array,
    differentGrundfunktionen: Array,
    grundfunktion: Array,
    verteilen: Array,
    erzeugen: Array,
    speichern: Array,
    beziehen: Array,
    bereitstellen: Array,
    grundfunktionString: String
  },
  data () {
    return {
      submodelsJson: [],
      pin: 'mdi-pin',
      choosedSite: '',
      choosedBuilding: ''
      // chapterSections: []
      // submodels: ['Identification', 'TechnicalData', 'Documentation', 'OperationalData'],
      // submodels: [
      // { id: 1, name: 'Identification' },
      // { id: 2, name: 'Technical Data' }
      // ]
    }
  },
  computed: {
    numberofSites () {
      const loadInfos = this.$store.getters.loadedOrganizationInformation
      console.log(loadInfos)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          console.log(typeof numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      console.log(numberOfSites)
      return numberOfSites
    },
    selectSubmodels: function () {
      for (const i of this.submodels) {
        console.log(i)
      }
      return this.submodels
    }
  },
  mounted () {
    if (localStorage.getItem('choosedSite')) {
      try {
        this.choosedSite = JSON.parse(localStorage.getItem('choosedSite'))
      } catch (e) {
        localStorage.removeItem('choosedSite')
      }
      // this.choosedSite = localStorage.choosedSite
    } else if (localStorage.getItem('choosedBuilding')) {
      try {
        this.choosedBuilding = JSON.parse(localStorage.getItem('choosedBuilding'))
      } catch (e) {
        localStorage.removeItem('choosedBuilding')
      }
      console.log(this.choosedSite)
      console.log(this.choosedBuilding)
      // this.choosedSite = localStorage.choosedSite
    }
  },
  methods: {
    chooseSite (site) {
      console.log(this.choosedSite)
      this.choosedSite = site
      this.choosedBuilding = ''
      console.log(this.choosedSite)
    },
    chooseBuilding (building) {
      // console.log(this.choosedSite)
      this.choosedBuilding = building
      this.choosedSite = ''
      // console.log(this.choosedSite)
    }
  }
  /*
  methods: {
    async fetchTasks () {
      const res = await fetch('http://localhost:5000/submodels')

      const data = await res.json()
      // console.log(data)
      return data
    }
  },

  async created () {
    this.submodelsJson = await this.fetchTasks()
    // console.log(this.chapterSections)
  },
  */
}
</script>

<style>
#submodel-collapse {
    align-items: center;
    justify-content: center;
}
#content {
    border-left-style: solid;
    border-color: #FFAC1C;
    padding-top:0;
}
.col {
    padding-left: 0;
}
.nav-link {
    color:#0a322b;
}
.nav-tabs {
    margin-top: 5px;
}
#building-grid-title {
  color: blue !important;
}
</style>
