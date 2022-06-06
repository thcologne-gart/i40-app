<template>
  <div>
    <div>
      <b-card
        id="performance-start"
        title="Performance Monitoring"
        tag="article"
        style="max-width: 40rem;"
        class="mx-auto"
      >
        <b-card-img :src="require('@/assets/performance-start.jpeg')"></b-card-img>
        <b-card-text>
          Starten Sie mit der Konfiguration Ihres Performance Monitorings
        </b-card-text>
        <b-button to="/performance" variant="outline-secondary">Start</b-button>
      </b-card>
    </div>
  </div>
</template>

<style>
#performance-start {
  margin-top: 20px;
  margin-bottom: 20px;
}

#grid-layout {
  margin-top: 10px;
}

#navigation {
  border-right-style: solid;
  border-top-style: solid;
  border-color: #F2F2F2;
  text-align: left;
}

#content {
  border-top-style: solid;
  border-color: #F2F2F2;
}
</style>
