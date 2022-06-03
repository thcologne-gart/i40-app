<template>
    <div v-if="energySourceComponents.length != 0">
        <hr>
        <b-row>
            <b-col class="text-left" cols="4">
                <h5>Ausgewählte Komponente</h5>
            </b-col>
            <b-col cols="4">
                <h5>Upload Datenblatt</h5>
            </b-col>
            <b-col cols="4">
                <h5>Gespeicherte Datenblätter</h5>
            </b-col>
        </b-row>
        <hr>
        <div v-for="component in energySourceComponents" :key="component.componentElementCollectionId">
            <EnergySourceSheet :energySources ="energySources" :energySourceGroup="energySourceGroup" :component="component" :energySourceComponents="energySourceComponents" />
        </div>
    </div>
</template>

<script>
import EnergySourceSheet from '@/components/EnergySourceSheet.vue'

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
