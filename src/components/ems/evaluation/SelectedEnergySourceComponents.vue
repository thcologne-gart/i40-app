<template>
    <div v-if="energySourceComponents.length != 0">
        <hr>
        <v-row>
            <v-col cols="6">
                <h6>Ausgewählte Komponente</h6>
            </v-col>
            <v-col cols="6">
                <h6>Upload Datenblatt</h6>
            </v-col>
        </v-row>
        <hr>
        <div v-for="component in energySourceComponents" :key="component.componentElementCollectionId">
            <EnergySourceSheet :energySources ="energySources" :energySourceGroup="energySourceGroup" :component="component" :energySourceComponents="energySourceComponents" />
        </div>
    </div>
</template>

<script>
import EnergySourceSheet from '@/components/ems/evaluation/EnergySourceSheet.vue'

export default {
  props: {
    energySources: Array,
    energySourceGroup: Object,
    energySourceComponents: Array
  },
  components: { EnergySourceSheet }
}
</script>

<style>
#selected-components {
    margin-top: 15px;
}
</style>
