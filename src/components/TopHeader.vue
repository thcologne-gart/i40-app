<template>
    <div>
        <b-navbar id ="nav-bar" toggleable="lg" type="light" class="shadow-sm p-3 mb-2">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!--
                <b-navbar-nav>
                    <b-nav-item variant="primary" to="/">Home</b-nav-item>
                    <b-nav-item to="/performance">Performance Monitoring</b-nav-item>
                    <b-nav-item to="/ems">Energiemanagement</b-nav-item>
                </b-navbar-nav>
                //-->
                <b-navbar-nav v-for="item in menuItems" :key="item.title">
                    <b-nav-item-dropdown text="Solutions" v-if ="item.title === 'Solutions'">
                            <div v-for="solution in solutions" :key="solution.title">
                                <b-dropdown-item v-bind:to = solution.link>{{ solution.title }}</b-dropdown-item>
                            </div>
                        </b-nav-item-dropdown>
                    <b-nav-item v-else v-bind:to = item.link>{{ item.title }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            <b-navbar-nav>
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <b-icon icon="people-fill" scale="1.2"></b-icon>
                    </template>
                    <div v-for="logItem in logItems" :key="logItem.title">
                        <b-dropdown-item v-bind:to = logItem.link>{{ logItem.title }}</b-dropdown-item>
                    </div>
                    <b-dropdown-item v-if= "userIsAuthenticated" @click="onLogout" to="/">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            <b-navbar-brand id="nav-brand" class="d-none d-sm-block" to="/">AI for Buildings</b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
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
    solutions () {
      let solutions = [
        { icon: '', title: 'Energiemanagement', link: '/ems' },
        { icon: '', title: 'Performance Monitoring', link: '/performance' },
        { icon: '', title: 'Building Performance', link: '/buildingperformance' },
        { icon: '', title: 'Digital Twins', link: '/digitaltwins' }
      ]
      if (this.userIsAuthenticated) {
        solutions = [
        ]
      }
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
          { icon: '', title: 'Energiemanagement', link: '/ems' },
          { icon: '', title: 'Building Performance', link: '/buildingperformance' },
          { icon: '', title: 'Digital Twins', link: '/digitaltwins' }
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
#nav-brand {
    margin-left: 15px;
}
.nav-item-dropdown {
    color: green;
    background-color: black;;
}
</style>
