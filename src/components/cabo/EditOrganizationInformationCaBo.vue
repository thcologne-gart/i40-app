<template>
  <div>
    <b-button v-b-modal.modal-1 variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></b-button>

    <b-modal hide-footer width="350px" id ="modal-1" persistent title="Edit Unternehmensangaben" ref="modal-one">
        <b-form-group
            id="input-group-1"
            label="Name der Organisation:"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            placeholder="Edit Name"
            v-model="editOrganizationName"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-2"
            label="Land:"
            label-for="input-2"
        >
            <b-form-input
            id="input-2"
            placeholder="Edit Land"
            v-model="editOrganizationCountry"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="Stadt:"
            label-for="input-3"
        >
            <b-form-input
            id="input-3"
            placeholder="Edit Stadt"
            v-model="editOrganizationCity"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-4"
            label="Postleitzahl:"
            label-for="input-4"
        >
            <b-form-input
            id="input-4"
            placeholder="Edit Postleitzahl"
            v-model="editOrganizationZip"
            required
            ></b-form-input>
        </b-form-group>
        <hr>
        <b-button class="mt-3" variant="outline-secondary" block @click="onEditOrgaInfo">Save</b-button>
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
      this.$store.dispatch('updateOrganizationInformationCaBo', {
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
