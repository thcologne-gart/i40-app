<template>
  <div>
    <div>
      <b-card
        id="bp-start"
        title="Building Performance"
        tag="article"
        style="max-width: 40rem;"
        class="shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <b-card-img :src="require('@/assets/bp-start.jpeg')"></b-card-img>
        <b-card-text>
          Starten Sie mit der Konfiguration Ihrer Building Performance Applikation
        </b-card-text>
        <b-button to="/buildingperformance" variant="outline-secondary">Start</b-button>
      </b-card>
    </div>
  </div>
</template>

<style>
#bp-start {
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
