<template>
    <div v-if="buildings != null">
        <b-card class = "showBuildingInfo">
        <div id ="displayBuildingInformation">
            <b-row id="header">
                <b-col><h5>Name</h5></b-col>
                <b-col><h5>Value</h5></b-col>
                <!-- <b-col><h5>Löschen</h5></b-col>//-->
            </b-row>
            <div v-for="item in buildings" :key="item[1].value">
                <div v-if="item[2].value === site[4].value && item[3].value === building " >
                    <div v-for="information in item" :key="information.idShort">
                        <b-row id = "body">
                            <b-col>{{ information.idShort }}</b-col>
                            <b-col>{{ information.value }}</b-col>
                        </b-row>
                    </div>
                    <EditBuildingInformation :site = site :item= item />
                </div>
            </div>
        </div>
      </b-card>
    </div>
</template>

<script>
import EditBuildingInformation from '@/components/ems/context/EditBuildingInformation.vue'
export default {
  props: {
    site: Array,
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
