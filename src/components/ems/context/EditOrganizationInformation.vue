<template>
  <div>
    <v-btn id="edit-button" v-b-modal.modal-1 variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></v-btn>

    <b-modal hide-footer width="350px" id ="modal-1" persistent title="Edit Unternehmensangaben" ref="modal-one">
        <v-form
            id="input-group-1"
            label="Name der Organisation:"
            label-for="input-1"
        >
            <v-text-field
            id="input-1"
            placeholder="Edit Name"
            v-model="editOrganizationName"
            required
            ></v-text-field>
        </v-form>

        <v-form
            id="input-group-2"
            label="Land:"
            label-for="input-2"
        >
            <v-text-field
            id="input-2"
            placeholder="Edit Land"
            v-model="editOrganizationCountry"
            required
            ></v-text-field>
        </v-form>

        <v-form
            id="input-group-3"
            label="Stadt:"
            label-for="input-3"
        >
            <v-text-field
            id="input-3"
            placeholder="Edit Stadt"
            v-model="editOrganizationCity"
            required
            ></v-text-field>
        </v-form>

        <v-form
            id="input-group-4"
            label="Postleitzahl:"
            label-for="input-4"
        >
            <v-text-field
            id="input-4"
            placeholder="Edit Postleitzahl"
            v-model="editOrganizationZip"
            required
            ></v-text-field>
        </v-form>
        <v-btn variant="outline-secondary" @click="onEditOrgaInfo">Save</v-btn>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editOrganizationName: this.organization[0].value,
      editOrganizationCountry: this.organization[1].value,
      editOrganizationCity: this.organization[2].value,
      editOrganizationZip: this.organization[3].value
    }
  },
  props: ['organization'],
  methods: {
    onEditOrgaInfo () {
      console.log(typeof this.editOrganizationZip)
      if (this.editOrganizationName.trim() === '' || this.editOrganizationCountry.trim() === '') {
        return
      }
      this.$refs['modal-one'].hide()
      this.$store.dispatch('updateOrganizationInformation', {
        id: this.organization[0].key,
        organizationName: this.editOrganizationName,
        organizationCountry: this.editOrganizationCountry,
        organizationCity: this.editOrganizationCity,
        organizationZip: this.editOrganizationZip
      })
    }
  }
}
</script>
