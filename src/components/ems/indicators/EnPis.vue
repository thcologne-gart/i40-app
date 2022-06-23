<template>
    <div>
        <AddEnpis :submodelId ="submodelId" />
          <div id ="displayEnpis">
            <b-row id="enpiHeader">
                <b-col><h5>Name</h5></b-col>
                <b-col><h5>Beschreibung</h5></b-col>
                <b-col></b-col>
                <!-- <b-col><h5>Löschen</h5></b-col>//-->
            </b-row>
            <div v-for="enpi in enpis" :key="enpi.name">
                <b-row id = "enpiBody" v-if="enpi.value === submodelId">
                    <b-col>{{ enpi.name }}</b-col>
                    <b-col>{{ enpi.description }}</b-col>
                    <b-col>
                        <EditEnpi :enpi = enpi />
                    </b-col>
                </b-row>
            </div>
            <!--
            <div :key="enpi" v-for="enpi in enpis">
                <b-row id = "enpiBody" v-if="enpi.semanticId.keys[0].value === 'submodel/enpi'">
                    <b-col>{{ enpi.idShort }}</b-col>
                    <b-col>{{ enpi.description }}</b-col>
                    <b-col>
                        <b-icon @click="deleteEnpi(enpi.id)" icon="x-circle" scale="1" variant="danger"></b-icon>
                    </b-col>
                </b-row>
            </div>
            //-->
          </div>
    </div>
</template>

<script>
import AddEnpis from '@/components/ems/indicators/AddEnpis.vue'
import EditEnpi from '@/components/ems/indicators/EditEnpi.vue'

export default {
  name: 'EnPis',
  props: {
    submodelId: String
  },
  components: { AddEnpis, EditEnpi },
  computed: {
    enpis () {
      console.log(this.$store.getters.loadedEnpis)
      return this.$store.getters.loadedEnpis
    }
  },

  methods: {
  /*
    async fetchEnpis () {
      const res = await fetch('http://localhost:5000/submodels')

      const loaded = await res.json()
      // console.log(loaded[0].semanticId.keys[0].value)
      return loaded
    },

    async deleteEnpi (id) {
      // console.log(id)
      // const tests = this.aasJson[0].submodels
      // console.log(`http://localhost:5000/submodels/${tests}`)
      if (confirm('Sind Sie sicher, dass sie die EnPi löschen möchten?')) {
        const res = await fetch(`http://localhost:5000/submodels/${id}`, {
          method: 'DELETE'
        })

        res.status === 200 ? (this.enpis = this.enpis.filter((enpi) => enpi.id !== id)) : alert('Fehler beim löschen des Energietypen')
      }
    }
    /*
    async addEnpi (enpi) {
      const res = await fetch('http://localhost:5000/submodels', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(enpi)
      })

      const data = await res.json()

      this.enpis = [...this.enpis, data]
    }
    */
  }
  /*
  async created () {
    this.enpis = await this.fetchEnpis()
  }
  */
}
</script>

<style scoped>
#displayEnpis {
    margin-top: 40px;
    margin-inline: 10%;
}
#enpiHeader {
    color: #0a322b;
    font-size: 1em
}
#enpiBody {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
</style>
