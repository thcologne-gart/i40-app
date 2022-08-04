<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-btn class="green white--text">
      <v-icon>mdi-home-analytics</v-icon>
      <v-span> Energiemanagement</v-span>
    </v-btn>

    <v-container>
      <v-layout row wrap justify-space-around align-center>
        <v-flex xs12 md6>
          <v-card class="pa-3"> grid system part 1</v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pa-3">
            <v-layout row wrap>
            <v-flex xs10 md8>
            <div>
              <v-icon align-center>mdi-home-analytics</v-icon>
              system part 2</div>
            </v-flex>
            <v-flex xs2 md4>
              <v-btn>See more</v-btn>
            </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
  <!-- <div id = "home">
    <div>
      <v-card
        id="home"
        style="max-width: 40rem;"
        class="shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <v-img :src="require('@/assets/home.jpeg')"></v-img>
        <v-card-text>
          Lösungen für KI-gestützte Anwendungen im Gebäudesektor
        </v-card-text>
        <v-container>
          <v-btn id="start-button" :to="solution.link" variant="outline-secondary" v-for="solution in solutions" :key="solution.title">{{ solution.title }}</v-btn>
        </v-container>
      </v-card>
    </div>
  </div> -->
</template>

<script>

// export default {
//   data () {
//     return {
//       solutions: [
//         { link: '/emsstart', title: 'Energiemanagement' },
//         { link: '/performance', title: 'Performance Monitoring' },
//         { link: '/buildingperformance', title: 'Building Performance' },
//         { link: '/digitaltwins', title: 'Digital Twins' }
//       ]
//     }
//   }
// }
</script>

<style scoped>
/* #home {
  margin-top: 20px;
  margin-bottom: 20px;
}
#start-button {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    width: 40%;
} */
</style>
