<template>
  <div>
    <b-button v-b-modal="item[4].key" variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></b-button>

    <b-modal v-bind:id="item[4].key" hide-footer width="350px" persistent title="Edit Gebäudeangaben" ref="modal-one">
        <b-form-group
            id="input-group-2"
            label="Straße:"
            label-for="input-2"
        >
            <b-form-input
            id="input-2"
            placeholder="Edit Straße"
            v-model="editBuildingStreet"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="Bezeichnung:"
            label-for="input-3"
        >
            <b-form-input
            id="input-3"
            placeholder="Edit Bezeichnung"
            v-model="editBuildingDesignation"
            required
            ></b-form-input>
        </b-form-group>

        <hr>
        <b-button class="mt-3" variant="outline-secondary" block @click="onEditBuildingInfo">Save</b-button>
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
