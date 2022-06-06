<template>
  <div>
    <div>
      <b-card
        id="digital-twins-start"
        title="Digital Twins"
        tag="article"
        style="max-width: 40rem;"
        class="shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <b-card-img :src="require('@/assets/dt-start.jpeg')"></b-card-img>
        <b-card-text>
          Visualisieren Sie die digitalen Zwillinge ihrer technischen Komponenten
        </b-card-text>
        <b-button to="/digitaltwinsoverview" variant="outline-secondary">Start</b-button>
      </b-card>
    </div>
  </div>
</template>

<style>
#digital-twins-start {
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
