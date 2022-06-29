<template>
    <div>
      <AddOrganizationInformationCaBo />
      <div v-if="organization != null">
        <b-card class = "shadow p-3 mb-5 bg-white rounded showOrgaInfo">
            <div id ="displayOrganizationInformation">
                <b-row id="header">
                    <b-col><h5>Name</h5></b-col>
                    <b-col><h5>Value</h5></b-col>
                    <!-- <b-col><h5>Löschen</h5></b-col>//-->
                </b-row>
                <div v-for="information in organization" :key="information.idShort">
                    <b-row id = "body">
                        <b-col>{{ information.idShort }}</b-col>
                        <b-col>{{ information.value }}</b-col>
                    </b-row>
                </div>
                <EditOrganizationInformationCaBo :organization = organization />
            </div>

        </b-card>
      </div>
    </div>
</template>

<script>
import AddOrganizationInformationCaBo from '@/components/cabo/AddOrganizationInformationCaBo.vue'
import EditOrganizationInformationCaBo from '@/components/cabo/EditOrganizationInformationCaBo.vue'

export default {
  name: 'OrganizationInformation',
  data () {
    return {}
  },
  components: { EditOrganizationInformationCaBo, AddOrganizationInformationCaBo },
  computed: {
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformationCaBo)
      return this.$store.getters.loadedOrganizationInformationCaBo
    }
  }
  /*
  mounted () {
    this.showInfos()
  },
  methods: {
    showInfos () {
      console.log(this.$store.getters.loadedOrganizationInformationCaBo)
      const card = document.querySelector('.showOrgaInfo')
      if (this.$store.getters.loadedOrganizationInformationCaBo) {
        console.log('nicht null')
        card.classList.add('active')
      }
    }
  }
  */
}
</script>

<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 40px;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}

</style>
