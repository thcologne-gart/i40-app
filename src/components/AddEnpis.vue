<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle.my-collapse variant="outline-secondary">EnPi hinzufügen</b-button>
    </div>
    <b-collapse id="my-collapse">
        <b-card>
            <b-form @submit="onSubmitEnpi" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Name der EnPi:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Eingabe EnPi"
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
                v-model="form.description"
                placeholder="Eingabe Beschreibung"
                required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-secondary">Submit</b-button>
            <b-button type="reset" variant="outline-secondary">Reset</b-button>
            </b-form>
        </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        description: ''
      },
      show: true
    }
  },
  props: {
    submodelId: String
  },
  computed: {
    enpis () {
      return this.$store.getters.loadedEnpis
    }
  },
  methods: {
    onSubmitEnpi (event) {
      event.preventDefault()
      if (!this.form.name) {
        alert('Bitte Namen der EnPi angeben')
        return
      }
      const newEnPi = {}
      const keys = {
        type: 'GlobalReference',
        local: false,
        value: this.submodelId,
        index: 0,
        idType: 'IRDI'
      }
      newEnPi.semanticId = {
        keys: [keys]
      }
      newEnPi.qualifiers = []
      newEnPi.identification = {
        idType: 'IRI',
        id: `submodel/enpi/${this.form.name}`
      }
      newEnPi.idShort = this.form.name
      newEnPi.category = 'CONSTANT'
      newEnPi.modelType = {
        name: 'Submodel'
      }
      newEnPi.kind = 'Instance'
      newEnPi.id = Math.floor(Math.random() * 10000)
      newEnPi.description = this.form.description
      // const newEnPi = {
      // id: Math.floor(Math.random() * 10000),
      // name: this.form.name,
      // description: this.form.description

      this.$store.dispatch('createEnpi', newEnPi)

      console.log(newEnPi)
      this.$emit('new-enpi', newEnPi)
      this.form.name = ''
      this.form.description = ''
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.description = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.card {
    margin-inline: 10%;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
