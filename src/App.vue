<template>
  <v-app>
    <TopHeader/>
      <router-view />
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  background: white;
  z-index: 999;
  border-bottom-style: solid;
  border-color: #F2F2F2;
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
    background-color: rgb(211, 209, 209);
    min-height: calc(100vh - 180px);
}
#ems-chapter {
    background-color: rgb(211, 209, 209);
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
</style>
