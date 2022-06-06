<template>
  <div>
    <b-row id="ausgewählteEnergieart">
        <b-col :key="submodelJson.idShort">{{ submodelJson.idShort }}</b-col>
        <b-col>
            <b-icon @click="onDelete(submodelJson.id)" icon="x-circle" scale="1" variant="danger"></b-icon>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'GetSubmodel',
  props: {
    submodelJson: Object
  },
  data () {
    return {}
  },
  methods: {
    onDelete (id) {
      this.$emit('delete-energy-type', id)
    }
  }
}
</script>

<style scoped>
#ausgewählteEnergieart {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-inline: 10%;
}
.row {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
</style>
