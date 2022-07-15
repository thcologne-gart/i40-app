<template>
  <v-container>
    <v-card class="mx-auto my-16"
      max-width="50%"
      id="sign-in-card">
      <v-card-title id="signin-title">GART</v-card-title>
      <v-card-subtitle id ="signin-subtitle" class="overline">Sign In</v-card-subtitle>
      <v-form @submit="onSignIn" v-if="show">
          <v-container>
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
          </v-container>
          <v-row align="center" justify="space-around">
            <v-btn id="buttons-card" type="submit" variant="outline-secondary" >Sign In</v-btn>
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
        email: '',
        password: ''
      },
      show: true
    }
  },
  computed: {
    user () {
      console.log(this.$store.getters.user)
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
      console.log(value)
      if (value !== null && value !== undefined) {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    onSignIn (event) {
      this.$store.dispatch('signUserIn', { email: this.form.email, password: this.form.password })
      event.preventDefault()
      console.log(this.form.email)
    }
    /*
    onDismissed () {
      console.log('Dismissed')
      this.$store.dispatch('clearError')
    }
    */
  }
}
</script>

<style>
#signin-subtitle {
  font-size: 0.9rem !important;
}
#signin-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

#sign-in-card {
  margin-top: 10% !important;
}
</style>
