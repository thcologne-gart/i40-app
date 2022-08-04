<template>
    <div v-if="buildings != null">
        <v-card class ="mx-auto my-10" max-width="75%" elevation="2">
        <v-card-title id="card-title">Gebäudeinformationen</v-card-title>
        <hr>
        <div id ="displayBuildingInformation">
            <v-row id="header">
                <v-col><h5>Name</h5></v-col>
                <v-col><h5>Value</h5></v-col>
                <!-- <v-col><h5>Löschen</h5></v-col>//-->
            </v-row>
            <div v-for="item in buildings" :key="item[1].value">
                <div v-if="item[2].value === site && item[3].value === building " >
                    <div v-for="information in item" :key="information.idShort">
                        <v-row id = "body">
                            <v-col>{{ information.idShort }}</v-col>
                            <v-col>{{ information.value }}</v-col>
                        </v-row>
                    </div>
                    <EditBuildingInformation :site = site :item= item />
                </div>
            </div>
        </div>
      </v-card>
    </div>
</template>

<script>
import EditBuildingInformation from '@/components/ems/context/EditBuildingInformation.vue'
export default {
  props: {
    site: Number,
    building: Number
  },
  components: { EditBuildingInformation },
  computed: {
    buildings () {
      // console.log(this.building)
      console.log(this.$store.getters.loadedBuildingInformation)
      return this.$store.getters.loadedBuildingInformation
    }
  }
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
#displayBuildingInformation {
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
