<template>
    <b-container fluid id="grid-layout">
        <!--
        <GetSubmodels :submodelsJson ="submodelsJson"/>
        //-->
        <b-row id ="row-chapter" style="min-height:500px">
            <b-col id ="navigation" md = "2">
                <b-navbar toggleable="lg">
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
                </b-navbar>
            </b-col>
            <b-col id = "content" md = "10">
                <slot>
                </slot>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import SubmodelsNameLeft from '@/components/SubmodelsNameLeft.vue'
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
    border-color: #F2F2F2;
}
.col {
    padding-left: 0;
}
.nav-link {
    color:#025939;
}
.nav-tabs {
    margin-top: 5px;
}
</style>
