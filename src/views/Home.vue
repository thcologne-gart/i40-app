<template>
  <div id = "home">
    <div>
      <b-card
        id="home"
        title="Nachhaltigere und effizientere Gebäude durch smarte Automatisierung und künstliche Intelligenz"
        tag="article"
        style="max-width: 40rem;"
        class="mx-auto"
      >
        <b-card-img :src="require('../assets/home.jpeg')"></b-card-img>
        <b-card-text>
          Lösungen für KI-gestützte Anwendungen im Gebäudesektor
        </b-card-text>
        <b-button to="/ems" variant="outline-secondary">Energiemanagement</b-button>
        <b-button to="/performance" variant="outline-secondary">Performance Monitoring</b-button>
        <b-button to="/buildingperformance" variant="outline-secondary">Building Performance</b-button>
        <b-button to="/digitaltwins" variant="outline-secondary">Digital Twins</b-button>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
#home {
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn {
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 25px;
    margin-bottom: 20px;
    padding: 10px;
    width: 35%;
}
</style>
