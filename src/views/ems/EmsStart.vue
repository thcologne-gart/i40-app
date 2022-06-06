<template>
  <div>
    <div>
      <b-card
        id="ems-start"
        title="Energiemanagementsystem"
        tag="article"
        style="max-width: 40rem;"
        class="mx-auto"
      >
        <b-card-img :src="require('@/assets/ems-start.jpeg')"></b-card-img>
        <b-card-text>
          Starten Sie mit der Konfiguration Ihres Energiemanagentsystems
        </b-card-text>
        <b-button to="/emsstart" variant="outline-secondary">Start</b-button>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
#ems-start {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
