<template>
    <div>
        <v-card class ="mx-auto my-16" max-width="60%" elevation="4">
            <v-card-title id="card-title">Standortinformationen</v-card-title>
            <div id ="displayOrganizationInformation">
                <v-row id="header">
                    <v-col><h5>Name</h5></v-col>
                    <v-col><h5>Value</h5></v-col>
                    <!-- <v-col><h5>Löschen</h5></v-col>//-->
                </v-row>
                <div v-for="information in site" :key="information.idShort">
                    <v-row id = "body">
                        <v-col>{{ information.idShort }}</v-col>
                        <v-col>{{ information.value }}</v-col>
                    </v-row>
                </div>
                <EditSiteInformation :site = site />
            </div>
      </v-card>
    </div>
</template>

<script>
import EditSiteInformation from '@/components/ems/context/EditSiteInformation.vue'
export default {
  props: {
    site: Array
  },
  components: { EditSiteInformation }
  /*
  computed: {
    site () {
      console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    }
  },
  */
}
</script>
<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#displayOrganizationInformation {
    margin-inline: 10%;
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
