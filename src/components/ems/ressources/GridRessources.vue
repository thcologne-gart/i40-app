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
                          <v-list-item-content>
                            <v-list-item-title v-text="building.buildingDesignation"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list-group>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col id = "content" md = "10">
          <slot></slot>
          <div v-if="choosedSite === '' & choosedBuilding === ''">Platzhalter
          </div>
          <div v-else-if="choosedSite !== '' & choosedBuilding === ''">
            <RessourcesSite :site="choosedSite" :submodels="submodels" />
          </div>
          <div v-else-if="choosedBuilding !== '' & choosedSite === ''">
            <RessourcesBuilding :building="choosedBuilding" :submodels="submodels" />
          </div>
        </v-col>
    </v-row>
</template>

<script>
import RessourcesSite from '@/components/ems/ressources/sites/RessourcesSite.vue'
import RessourcesBuilding from '@/components/ems/ressources/buildings/RessourcesBuilding.vue'

export default {
  components: { RessourcesSite, RessourcesBuilding },
  props: {
    sites: Array,
    buildings: Array,
    linkToInfos: String
  },
  data () {
    return {
      submodelsJson: [],
      // pin: 'mdi-pin',
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
  },
  created () {
    this.submodels = [
      { id: 1, name: 'Beauftragte', link: '/ressources-start/agents' }
    ]
    this.emsChapter = { name: 'Ressourcen', link: '/ressources-start' }
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
</style>
