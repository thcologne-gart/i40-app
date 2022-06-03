<template>
    <div>
        <b-card class = "showOrgaInfo">
        <div id ="displayOrganizationInformation">
            <b-row id="header">
                <b-col><h5>Name</h5></b-col>
                <b-col><h5>Value</h5></b-col>
                <!-- <b-col><h5>Löschen</h5></b-col>//-->
            </b-row>
            <div v-for="information in site" :key="information.idShort">
                <b-row id = "body">
                    <b-col>{{ information.idShort }}</b-col>
                    <b-col>{{ information.value }}</b-col>
                </b-row>
            </div>
            <EditSiteInformation :site = site />
        </div>
      </b-card>
    </div>
</template>

<script>
import EditSiteInformation from '@/components/EditSiteInformation.vue'
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
