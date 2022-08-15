<template>
    <v-row id ="row-chapter">
        <v-col id ="navigation" md = "2">
          <v-card class="mx-auto" height="100%" tile>
            <v-navigation-drawer color="grey lighten-5">
                <!-- Change active class, siehe border -->
                <v-list-group
                v-for="site in sites"
                :key="site[1].value"
                :prepend-icon="pin"
                no-action
                active-class="border"
                >
                <template v-slot:activator>
                    <v-list-item @click="chooseSite(site)">
                    <!-- <v-list-item link :to= "{ name: 'General Infos', params: { site: site } }"></v-list-item> -->
                      <v-list-item-content>
                      <v-list-item-title v-text="site[1].value"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </template>
                    <div v-for="building in buildings" :key="building.submodelId">
                        <v-list-item v-if="building.numberOfSite === site[4].value">
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
          <div v-if="choosedSite === ''">
          </div>
          <div v-else>
            <InfosCard :site="choosedSite" />
          </div>
        </v-col>
    </v-row>
</template>

<script>
import InfosCard from '@/components/general/InfosCard.vue'

export default {
  components: { InfosCard },
  props: {
    sites: Array,
    buildings: Array,
    linkToInfos: String
  },
  data () {
    return {
      submodelsJson: [],
      pin: 'mdi-pin',
      choosedSite: ''
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
      console.log(this.choosedSite)
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
</style>
