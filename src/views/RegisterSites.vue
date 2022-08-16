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
            <div v-if="organization == null">
              <AddOrgaInformation />
            </div>
            <div v-else-if="organization != null">
              <v-card id="cardOrganizationForm" color="grey lighten-3" class="mx-auto my-6" max-width="75%">
                  <v-card-title id="card-title">Unternehmensinformationen</v-card-title>
                  <hr>
                  <div id ="displayOrganizationInformation">
                      <v-row id="header">
                          <v-col><h5>Name</h5></v-col>
                          <v-col><h5>Value</h5></v-col>
                          <!-- <v-col><h5>Löschen</h5></v-col>//-->
                      </v-row>
                      <div v-for="information in organization" :key="information.idShort">
                          <v-row id = "body">
                              <v-col>{{ information.idShort }}</v-col>
                              <v-col>{{ information.value }}</v-col>
                          </v-row>
                      </div>
                      <hr>
                      <EditOrganizationInformation :organization = organization />
                  </div>

              </v-card>
            </div>
            <div v-if="organization != null">
              <v-btn
              color="outline-secondary"
              @click="e1 = 2"
              id= "buttons-card"
              >
              Continue
              </v-btn>
            </div>

        </v-stepper-content>

        <v-stepper-content step="2">
            <AddSites />
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
import AddOrgaInformation from '@/components/general/AddOrgaInformation.vue'
import AddSites from '@/components/general/AddSites.vue'
import EditOrganizationInformation from '@/components/ems/context/EditOrganizationInformation.vue'

export default {
  data () {
    return {
      e1: 1
    }
  },
  components: { AddOrgaInformation, EditOrganizationInformation, AddSites },
  computed: {
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformation)
      return this.$store.getters.loadedOrganizationInformation
    }
  }
}
</script>
