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
          <div v-if="choosedSite === '' & choosedBuilding === ''">
          </div>
          <div v-else-if="choosedSite !== '' & choosedBuilding === ''">
            <InfosCardSiteBP :site="choosedSite" />
          </div>
          <div v-else-if="choosedBuilding !== '' & choosedSite === ''">
            <InfosCardBuildingBP :building="choosedBuilding" :site="choosedSite" />
          </div>
        </v-col>
    </v-row>
</template>

<script>
import InfosCardSiteBP from '@/components/bp/InfosCardSiteBP.vue'
import InfosCardBuildingBP from '@/components/bp/InfosCardBuildingBP.vue'

export default {
  components: { InfosCardSiteBP, InfosCardBuildingBP },
  props: {
    sites: Array,
    buildings: Array,
    linkToInfos: String
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
      // this.choosedSite = localStorage.choosedSite
    }
  },
  /*
  watch: {
    choosedSite (newSite) {
      localStorage.choosedSite = newSite[1].value
    }
  },
  */
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
  methods: {
    chooseSite (site) {
      console.log(this.choosedSite)
      this.choosedSite = site
      this.choosedBuilding = ''
      console.log(this.choosedSite)
      const parsed = JSON.stringify(this.choosedSite)
      localStorage.setItem('choosedSite', parsed)
      localStorage.setItem('choosedBuilding', '')
      // localStorage.choosedSite = this.choosedSite[1].value
    },
    chooseBuilding (building) {
      // console.log(this.choosedSite)
      this.choosedBuilding = building
      const parsed = JSON.stringify(this.choosedBuilding)
      localStorage.setItem('choosedBuilding', parsed)
      localStorage.setItem('choosedSite', '')
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
