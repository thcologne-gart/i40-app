<template>
    <div>
        <b-card-group>
            <div v-for="site in numberSites" :key="site">
                <b-card class="shadow p-3 mb-5 bg-white rounded" id="show-site">
                </b-card>
            </div>
        </b-card-group>
    </div>
</template>

<script>
export default {
  data () {
    return {
      test: ''
    }
  },
  props: {
    organization: Array
  },
  computed: {
    numberSites () {
      let numberSites
      const numberOfSites = [0]
      for (const item in this.organization) {
        const element = this.organization[item]
        if (element.idShort === 'Anzahl Standorte') {
          numberSites = element.value
        }
      }
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      return numberOfSites
    }
  }
}
</script>

<style scoped>
.card-group {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}
#show-site {
    width: 260px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 30px;
}
</style>
