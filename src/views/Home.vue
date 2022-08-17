<template>
  <div id = "home">
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      solutions: [
        { link: '/emsstart', title: 'Energiemanagement' },
        // { link: '/performance', title: 'Performance Monitoring' },
        // { link: '/register', title: 'Registrierung' },
        { link: '/digitaltwins', title: 'Digital Twins' }
      ]
    }
  }
}
</script>

<style scoped>
#home {
  margin-top: 20px;
  margin-bottom: 20px;
}
#start-button {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    width: 40%;
}
</style>
