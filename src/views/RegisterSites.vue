<template>
  <v-card class="mx-auto my-16"
      max-width="65%">
    <v-stepper v-model="e1">
        <v-stepper-header>
        <v-stepper-step
            :complete="e1 > 1"
            step="1"
            color="#5D3FD3"
        >
            Registrierung Unternehmen
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="e1 > 2"
            step="2"
            color="#5D3FD3"
        >
            Registrierung Liegenschaften
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" color="#5D3FD3">
            Registrierung Gebäude
        </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
        <v-stepper-content step="1">
            <v-card
            color="grey lighten-3" class="mx-auto my-6" max-width="75%" height="200px"
            ></v-card>

            <v-btn
            color="outline-secondary"
            @click="e1 = 2"
            id= "buttons-card"
            >
            Continue
            </v-btn>

        </v-stepper-content>

        <v-stepper-content step="2">
            <v-card
            color="grey lighten-3" class="mx-auto my-6" max-width="75%" height="200px"
            ></v-card>

            <v-btn
            color="outline-secondary"
            @click="e1 = 3"
            id= "buttons-card"
            >
            Continue
            </v-btn>

            <v-btn @click="e1 = 1" color="outline-secondary" id= "buttons-card">
            Back
            </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
            <v-card
            color="grey lighten-3" class="mx-auto my-6" max-width="75%" height="200px"
            ></v-card>
            <v-btn
            color="outline-secondary"
            @click="e1 = 1"
            id= "buttons-card"
            >
            Continue
            </v-btn>

            <v-btn id= "buttons-card" color="outline-secondary" @click="e1 = 2">
            Back
            </v-btn>
        </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      e1: 1
    }
  }
}
</script>
