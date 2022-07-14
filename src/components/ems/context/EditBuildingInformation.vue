<template>
  <div>
    <v-btn id="edit-button" v-b-modal="item[4].key" variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></v-btn>

    <b-modal v-bind:id="item[4].key" hide-footer width="350px" persistent title="Edit Gebäudeangaben" ref="modal-one">
        <v-form
            id="input-group-2"
            label="Straße:"
            label-for="input-2"
        >
            <v-text-field
            id="input-2"
            placeholder="Edit Straße"
            v-model="editBuildingStreet"
            required
            ></v-text-field>
        </v-form>

        <v-form
            id="input-group-3"
            label="Bezeichnung:"
            label-for="input-3"
        >
            <v-text-field
            id="input-3"
            placeholder="Edit Bezeichnung"
            v-model="editBuildingDesignation"
            required
            ></v-text-field>
        </v-form>

        <v-btn class="mt-3" variant="outline-secondary" block @click="onEditBuildingInfo" size="sm">Save</v-btn>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editBuildingStreet: this.item[0].value,
      editBuildingDesignation: this.item[1].value
    }
  },
  props: {
    site: Array,
    item: Array
  },
  methods: {
    onEditBuildingInfo () {
      console.log(this.item)
      this.$refs['modal-one'].hide()
      this.$store.dispatch('updateBuildingInformation', {
        id: this.item[4].key,
        buildingStreet: this.editBuildingStreet,
        buildingDesignation: this.editBuildingDesignation
      })
    }
  }
}
</script>
