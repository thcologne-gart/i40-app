<template>
  <div>
    <v-sheet elevation="2">
    <v-tabs center-active v-model="tab" background-color="grey lighten-2" slider-color="#FFAC1C" color="#0a322b">
        <v-tab v-for="submodel in submodels" :key="submodel.id">{{ submodel.name }}</v-tab>
    </v-tabs>
    </v-sheet>
    <v-tabs-items v-model="tab" id="custom-tab-items">
    <v-tab-item v-for="submodel in submodels" :key="submodel.id">
        <div v-if="submodel.name == 'Beauftragte'">
            <AgentsBuildings />
        </div>
    </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AgentsBuildings from '@/components/ems/ressources/buildings/AgentsBuildings.vue'

export default {
  data () {
    return {
      tab: null
    }
  },
  components: { AgentsBuildings },
  props: {
    building: Array,
    submodels: Array
  }
}
</script>
