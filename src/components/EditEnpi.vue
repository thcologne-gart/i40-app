<template>
  <div>
    <b-button v-b-modal="enpi.name" variant="outline-secondary" size="sm"><b-icon-pencil-square></b-icon-pencil-square></b-button>

    <b-modal hide-footer width="350px" persistent v-bind:id="enpi.name" title="Edit EnPi" ref="modal-one">
        <b-form-group
            id="input-group-1"
            label="Name der EnPi:"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            placeholder="Neuer EnPi Name"
            v-model="editName"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-2"
            label="Beschreibung der EnPi:"
            label-for="input-2"
        >
            <b-form-input
            id="input-2"
            placeholder="Neue EnPi Beschreibung"
            v-model="editDescription"
            required
            ></b-form-input>
        </b-form-group>
        <hr>
        <b-button id ="delete-button" class="mt-3" variant="outline-danger" block @click="onDeleteEnpi">EnPi löschen</b-button>
        <b-button class="mt-3" variant="outline-secondary" block @click="onSaveChanges">EnPi editieren</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editName: this.enpi.name,
      editDescription: this.enpi.description
    }
  },
  props: ['enpi'],
  methods: {
    onDeleteEnpi () {
      this.$refs['modal-one'].hide()
      this.$store.dispatch('deleteEnpi', {
        id: this.enpi.id
      })
    },
    onSaveChanges () {
      if (this.editName.trim() === '' || this.editDescription.trim() === '') {
        return
      }
      this.$refs['modal-one'].hide()
      this.$store.dispatch('updateEnpiData', {
        id: this.enpi.id,
        idShort: this.editName,
        description: this.editDescription
      })
    }
  }
}
</script>

<style>
#delete-button {
    margin-right: 30px;
}
</style>
