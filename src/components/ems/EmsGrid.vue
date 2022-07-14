<template>
    <!--
    <GetSubmodels :submodelsJson ="submodelsJson"/>
    //-->
    <v-row id ="row-chapter">
        <v-col id ="navigation" md = "2">
          <v-card class="mx-auto" height="100%" tile>
            <v-navigation-drawer width="100%">
              <v-list>
                <v-list-item link :to="submodel.link" :key="submodel.id" v-for="submodel in submodels">
                  <v-list-item-content>
                    <SubmodelsNameLeft :submodel="submodel" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
            <!-- <b-navbar toggleable="lg">
                <b-navbar-toggle target="submodel-collapse" class="row"></b-navbar-toggle>
                <b-collapse id="submodel-collapse" is-nav>
                    <b-navbar-nav>
                        <div>
                            <b-nav-item :key="submodel.id" v-for="submodel in submodels">
                                <SubmodelsNameLeft :submodel="submodel" />
                            </b-nav-item>
                        </div>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar> -->
        </v-col>
        <v-col id = "content" md = "10">
            <slot>
            </slot>
        </v-col>
    </v-row>
</template>

<script>
import SubmodelsNameLeft from '@/components/ems/SubmodelsNameLeft.vue'
// import GetSubmodels from '@/components/getSubmodels.vue'

export default {
  name: 'EmsGrid',
  // components: { SubmodelsNameLeft, GetSubmodels },
  components: { SubmodelsNameLeft },
  props: {
    submodels: Array
  },
  data () {
    return {
      submodelsJson: []
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
