<template>
  <div>
    <div>
      <v-card
        id="bp-start"
        style="max-width: 40rem;"
        class="shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <v-card-title id="title">Digital Twins</v-card-title>
        <v-img :src="require('@/assets/dt-start.jpeg')"></v-img>
        <v-card-text>
          Visualisieren Sie die digitalen Zwillinge ihrer technischen Komponenten
        </v-card-text>
        <v-btn to="/digitaltwinsoverview" variant="outline-secondary">Start</v-btn>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
#title {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
