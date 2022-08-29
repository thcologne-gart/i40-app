<template>
  <v-container>
    <v-card class="mx-auto my-16"
      max-width="65%"
      id="signup-card">
      <v-card-title id="signup-title">GART</v-card-title>
      <v-card-subtitle id ="signup-subtitle" class="overline">Sign Up</v-card-subtitle>
      <v-form @submit="onSignUp" @reset="onReset" v-if="show">
          <v-container>
              <v-text-field
                  v-model="form.firstname"
                  label="First name"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="form.lastname"
                  label="Last name"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="form.email"
                  label="E-Mail"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="form.password"
                  :type="'password'"
                  label="Passwort"
                  required
              ></v-text-field>
              <v-text-field
                  :type="'password'"
                  v-model="form.passwordconfirm"
                  label="Passwort bestätigen"
                  required
              ></v-text-field>
          </v-container>
          <v-row align="center" justify="space-around" id="buttons-signup">
              <v-col>
                <v-btn type="submit" id="buttons-signup">Sign Up</v-btn>
              </v-col>
              <v-col>
                <v-btn type="reset" id="buttons-reset">Reset</v-btn>
              </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: ''
      },
      show: true
    }
  },
  computed: {
    validation () {
      return this.form.password === this.form.passwordconfirm
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
      this.form.passwordconfirm = ''
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

<style>
#buttons-signup {
    margin-bottom: 20px;
}
#buttons-reset {
    margin-bottom: 20px;
}

#signup-subtitle {
  font-size: 0.9rem !important;
}
#signup-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

#signup-card {
  margin-top: 10% !important;
}
</style>
