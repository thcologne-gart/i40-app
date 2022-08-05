<template>
  <v-app>
    <div v-if="isSignUp">
      <router-view />
    </div>
    <div v-else>
      <TopHeader/>
        <router-view />
    </div>
    <Footer/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import TopHeader from '@/components/general/TopHeader.vue'
import Footer from '@/components/general/Footer.vue'

export default {
  name: 'App',
  components: { TopHeader, Footer },
  data () {
    return {
      submodelsJson: []
    }
  },
  computed: {
    selectSubmodels: function () {
      for (const i of this.submodels) {
        console.log(i)
      }
      return this.submodels
    },
    isSignUp () {
      return this.$route.name === 'Sign Up'
    }
  }
  /*
  methods: {
    async fetchTasks () {
      const res = await fetch('http://localhost:5000/submodels')
      const data = await res.json()
      console.log(data)
      return data
    }
  },
  async created () {
    this.submodelsJson = await this.fetchTasks()
    console.log(this.chapterSections)
  }
  */
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
#footer {
  margin-top:auto;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(45deg, #93c572, #5f8575);
}
.text-left {
    text-align: left;
}
#nav {
  font-weight: bold;
  color: #0a322b;
  a {
  &.router-link-exact-active {
    color: #0a322b;
  }
  }
}
#submodel-item {
  color: #0a322b;
  a {
  &.router-link-active {
    // border: 2px solid #4d4e4e;
    color: #0a322b;
    border-radius: 4px;
    min-width: 9rem;
    background-color: rgb(245, 184, 234);
  }
  }
}
#building-navbar {
  color: #0a322b;
  a {
  &.router-link-exact-active {
    color: #0a322b;
  }
  }
}
#grid-layout {
  height: 100% !important;
  margin-left: 0;
  padding:0;
}
#chapter {
  display: inline;
  a {
  &.router-link-active {
    box-shadow: 2px 2px #0a322b;
    background-color: rgb(245, 184, 234);
    color: #0a322b;
    }
  }
}
#nav-bar {
  background: white;
}
#nav-brand {
  color: #0a322b;
}
#sticky-ems-chapter {
  position: sticky;
  top: 0;
  z-index: 999;
  border-bottom-style: solid;
  border-color: #FFAC1C;
}
.nav-pills .nav-link.active {
    background-color: white !important;
    border: 2px solid #4d4e4e !important;
    color: green !important;
}
.carousel-control-prev, .carousel-control-next {
  opacity: 1 !important;
  background: rgba(247, 249, 252, .3) !important;
}
.carousel-caption {
    background: rgba(247, 249, 252, .3) !important;
}
#energy-source-card {
    max-inline-size: 50%;
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
#navigation {
    padding:0;
    min-height: calc(100vh - 180px);
}
.card {
  margin-inline:5%;
}
.card-header {
  background-color: rgba(249, 175, 236, 0.6) !important;
}
/*
.col-auto {
  background-color: rgba(249, 175, 236, 0.8) !important;
}
*/
#card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a322b;
  font-weight: 500;
  font-size: 22px;
  padding-bottom: 0px;
}

#source-group-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a322b;
  font-weight: 500;
  font-size: 22px;
}

#edit-button {
  margin-bottom: 10px;
}

#buttons-card {
    margin-bottom: 20px;
    width: 20%;
    margin-inline: 10%;
}

#custom-tab-items {
    background-color: transparent !important;
}

</style>
