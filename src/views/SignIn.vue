<template>
    <div>
      <b-card>
            <b-row v-if="error" >
                <Alert @dismissed="onDismissed" :text="error.message" />
            </b-row>
            <b-form @submit="onSignIn" v-if="show">
            <b-form-group
                id="input-group-1"
                label="E-Mail"
                label-for="email"
            >
                <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Eingabe E-Mail"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Password"
                label-for="passowrd"
            >
                <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Eingabe Password"
                required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-secondary">Sign in</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  components: { Alert },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      console.log(this.$store.getters.loading)
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    onSignIn (event) {
      this.$store.dispatch('signUserIn', { email: this.form.email, password: this.form.password })
      console.log(this.form.email)
      event.preventDefault()
    },
    onDismissed () {
      console.log('Dismissed')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>
.card {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-inline: 30%;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
