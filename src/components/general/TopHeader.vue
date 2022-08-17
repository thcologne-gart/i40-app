<template>
    <div>
        <v-app-bar
            id="top-header"
            color="grey lighten-5"
            >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title
                id="navbar-title"
                >GART</v-toolbar-title>
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
                    <v-list-item v-else  to="/signin">Sign In</v-list-item>
                </v-list>
            </v-menu>
            </v-app-bar>
            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
            >
              <v-list
                nav
                dense
              >
                <v-list-item-group
                  v-model="group"
                  class="text-left"
                  active-class="deep-purple--text text--accent-4"
                >
                <div v-for="item in appBarItems" :key="item.title">
                  <v-list-item :to="item.link">
                    <!-- <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon> -->
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </div>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
    </div>
</template>

<script>

export default {
  data: () => ({
    home: '/',
    drawer: false,
    group: null
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
        { icon: '', title: 'Allgemeine Infos', link: '/generalstart' },
        { icon: '', title: 'Digital Twins', link: '/digitaltwins' },
        // { icon: '', title: 'Building Performance', link: '/buildingperformance' },
        { icon: '', title: 'Energiemanagement', link: '/emsstart' }
        // { icon: '', title: 'Performance Monitoring', link: '/performance' }
      ]
      return solutions
    },
    appBarItems () {
      const appBar = [
        { icon: '', title: 'Home', link: '/home' },
        { icon: '', title: 'Allgemeine Infos', link: '/generalstart' },
        { icon: '', title: 'Digital Twins', link: '/digitaltwins' },
        // { icon: '', title: 'Building Performance', link: '/buildingperformance' },
        { icon: '', title: 'Energiemanagement', link: '/emsstart' },
        { icon: '', title: 'Hinzufügen Standorte & Gebäude', link: '/register' }
        // { icon: '', title: 'Performance Monitoring', link: '/performance' }
      ]
      return appBar
    },
    menuItems () {
      let menuItems = [
        { icon: '', title: 'Home', link: '/' },
        { icon: '', title: 'Solutions', link: '/' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: '', title: 'Home', link: '/home' },
          { icon: '', title: 'Allgemeine Infos', link: '/generalstart' },
          // { icon: '', title: 'Performance Monitoring', link: '/performance' },
          { icon: '', title: 'Energiemanagement', link: '/emsstart' },
          // { icon: '', title: 'Building Performance', link: '/buildingperformance' },
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
