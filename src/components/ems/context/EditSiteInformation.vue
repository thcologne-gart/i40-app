<template>
  <div>
    <v-btn id="edit-button" v-b-modal="site[5].key" variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></v-btn>

    <b-modal v-bind:id="site[5].key" hide-footer width="350px" persistent title="Edit Standortangaben" ref="modal-one">
        <v-form
            id="input-group-2"
            label="Land:"
            label-for="input-2"
        >
            <v-text-field
            id="input-2"
            placeholder="Edit Land"
            v-model="editSiteCountry"
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
            v-model="editSiteCity"
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
            v-model="editSiteZip"
            required
            ></v-text-field>
        </v-form>

        <v-form
            id="input-group-5"
            label="Anzahl Gebäude:"
            label-for="input-5"
        >
            <v-text-field
            id="input-5"
            placeholder="Edit Anzahl der Gebäude"
            v-model="editSiteNumberBuildings"
            required
            ></v-text-field>
        </v-form>
        <v-btn variant="outline-secondary" block @click="onEditSiteInfo" size="sm">Save</v-btn>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editSiteCountry: this.site[0].value,
      editSiteCity: this.site[1].value,
      editSiteZip: this.site[2].value,
      editSiteNumberBuildings: this.site[3].value
    }
  },
  props: ['site'],
  methods: {
    onEditSiteInfo () {
      console.log(this.site)
      this.$refs['modal-one'].hide()
      this.$store.dispatch('updateSiteInformation', {
        id: this.site[5].key,
        siteCountry: this.editSiteCountry,
        siteCity: this.editSiteCity,
        siteZip: this.editSiteZip,
        siteNumberBuildings: this.editSiteNumberBuildings
      })
    }
  }
}
</script>
