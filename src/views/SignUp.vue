<template>
    <div>
      <b-card>
            <b-row v-if="error" >
                <Alert @dismissed="onDismissed" :text="error.message" />
            </b-row>
            <b-form @submit="onSignUp" @reset="onReset" v-if="show">
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

            <b-form-group
                id="input-group-3"
                label="Confirm Password"
                label-for="confirmpassowrd"
            >
                <b-form-input
                id="confirmpassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="Bestätigung Password"
                :state="validation"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                Passwörter stimmen nicht überein.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="outline-secondary">
                Sign up
            </b-button>
            <b-button type="reset" variant="outline-secondary">Reset</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  components: { Alert },
  data () {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      show: true
    }
  },
  computed: {
    validation () {
      return this.form.password === this.form.confirmPassword
    },
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
    onSignUp (event) {
      this.$store.dispatch('signUserUp', { email: this.form.email, password: this.form.password })
      console.log(this.form.email)
      event.preventDefault()
      if (!this.form.email) {
        alert('Bitte E-Mail angeben')
      }
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.form.confirmPassword = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
