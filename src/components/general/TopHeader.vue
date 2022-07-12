<template>
    <div>
        <v-app-bar
            v-if= "userIsAuthenticated"
            id="top-header"
            color="grey lighten-5"
            app
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title
                id="navbar-title"
                >CaBo</v-toolbar-title>
            <v-btn id="home-icon" icon @click="$router.push('/home')">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div v-for="solution in solutions" :key="solution.title">
              <v-btn plain @click="() => {}" :to="solution.link">
                {{ solution.title }}
              </v-btn>
            </div>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon
                        >mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <!-- <v-list-item v-for="item in logItems" :key="item.title" @click="() => {}" :to="item.link">
                        {{ item.title }}
                    </v-list-item> -->
                    <v-list-item v-if= "userIsAuthenticated" @click="onLogout" to="/signin">Logout</v-list-item>
                </v-list>
            </v-menu>
            </v-app-bar>
    </div>
</template>

<script>

export default {
  data: () => ({
    home: '/'
  }),
  methods: {
    onLogout () {
      console.log('test')
      this.$store.dispatch('logout')
    }
  },
  computed: {
    /*
    logItems () {
      let logItems = [
        { icon: '', title: 'Sign In', link: '/signin' },
        { icon: '', title: 'Sign Up', link: '/signup' }
      ]
      if (this.userIsAuthenticated) {
        logItems = [
        ]
      }
      return logItems
    },
    */
    solutions () {
      const solutions = [
        { icon: '', title: 'Digital Twins', link: '/digitaltwins' },
        { icon: '', title: 'Building Performance', link: '/buildingperformance' },
        { icon: '', title: 'Energiemanagement', link: '/emsstart' },
        { icon: '', title: 'Performance Monitoring', link: '/performance' }
      ]
      return solutions
    },
    menuItems () {
      let menuItems = [
        { icon: '', title: 'Home', link: '/' },
        { icon: '', title: 'Solutions', link: '/' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: '', title: 'Home', link: '/home' },
          { icon: '', title: 'Performance Monitoring', link: '/performance' },
          { icon: '', title: 'Energiemanagement', link: '/emsstart' },
          { icon: '', title: 'Building Performance', link: '/buildingperformance' },
          { icon: '', title: 'Digital Twins', link: '/digitaltwins' }
          // { icon: '', title: 'CaBo', link: '/cabo' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<style scoped>
#navbar-title {
  color: #301934;
  font-weight: 500;
}
#home-icon {
  margin-left: 20px;
}
</style>
