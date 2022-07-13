<template>
    <div>
      <AddOrganizationInformation />
      <div v-if="organization != null">
        <v-card class="mx-auto my-12" elevation="4"
                max-width="60%">
            <v-card-title id="card-title">Unternehmensinformationen</v-card-title>
            <div id ="displayOrganizationInformation">
                <v-row id="header">
                    <v-col><h5>Name</h5></v-col>
                    <v-col><h5>Value</h5></v-col>
                    <!-- <v-col><h5>Löschen</h5></v-col>//-->
                </v-row>
                <v-divider></v-divider>
                <div v-for="information in organization" :key="information.idShort">
                    <v-row id = "body">
                        <v-col>{{ information.idShort }}</v-col>
                        <v-col>{{ information.value }}</v-col>
                    </v-row>
                </div>
                <EditOrganizationInformation :organization = organization />
            </div>

        </v-card>
      </div>
    </div>
</template>

<script>
import AddOrganizationInformation from '@/components/ems/context/AddOrganizationInformation.vue'
import EditOrganizationInformation from '@/components/ems/context/EditOrganizationInformation.vue'

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
    margin-top: 40px;
}
#header {
    color: #0a322b;
    font-size: 1em;
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}

</style>
