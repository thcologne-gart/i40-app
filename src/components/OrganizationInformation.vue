<template>
    <div>
      <AddOrganizationInformation />
      <div v-if="organization != null">
        <b-card class = "showOrgaInfo">
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
                <EditOrganizationInformation :organization = organization />
            </div>

        </b-card>
      </div>
    </div>
</template>

<script>
import AddOrganizationInformation from '@/components/AddOrganizationInformation.vue'
import EditOrganizationInformation from '@/components/EditOrganizationInformation.vue'

export default {
  name: 'OrganizationInformation',
  data () {
    return {}
  },
  components: { EditOrganizationInformation, AddOrganizationInformation },
  computed: {
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformation)
      return this.$store.getters.loadedOrganizationInformation
    }
  }
  /*
  mounted () {
    this.showInfos()
  },
  methods: {
    showInfos () {
      console.log(this.$store.getters.loadedOrganizationInformation)
      const card = document.querySelector('.showOrgaInfo')
      if (this.$store.getters.loadedOrganizationInformation) {
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
}
#header {
    color: #025939;
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
