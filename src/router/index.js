import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Start.vue'
import AuthGuard from './auth-guard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Start',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/performance',
    name: 'Performance',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/performancemonitoring/PerformanceStart.vue')
  },
  {
    path: '/context',
    name: 'Context',
    component: () => import('../views/OrganizationContext.vue')
  },
  {
    path: '/emsstart',
    name: 'EMS Start',
    component: () => import('../views/EMSWelcome.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/ems',
    name: 'Energiemanagement',
    component: () => import('../views/EmsStart.vue')
  },
  {
    path: '/buildingperformance',
    name: 'Building Performance',
    component: () => import('../views/buildingperformance/BPStart.vue')
  },
  {
    path: '/digitaltwins',
    name: 'Digital Twins',
    component: () => import('../views/digitaltwin/DTStart.vue')
  },
  {
    path: '/digitaltwinsoverview',
    name: 'Digital Twins Overview',
    component: () => import('../views/digitaltwin/DTOverview.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/digitaltwinsoverview/aasdetail',
    name: 'AAS Detail',
    component: () => import('../views/digitaltwin/AASDetail.vue'),
    props: true
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('../views/Management.vue')
  },
  {
    path: '/ressources',
    name: 'Ressourcen',
    component: () => import('../views/Ressources.vue')
  },
  {
    path: '/energetic-evaluation',
    name: 'Energetic Evaluation',
    component: () => import('../views/EnergeticEvaluation.vue')
  },
  {
    path: '/energy-performance-indicator',
    name: 'Energy Performance Indicators',
    component: () => import('../views/EnergyPerformanceIndicators.vue')
  },
  {
    path: '/energetic-evaluation/energy-type',
    name: 'Energy Type',
    component: () => import('../views/EnergyType.vue')
  },
  {
    path: '/energetic-evaluation/energy-source',
    name: 'Energy Source',
    component: () => import('../views/EnergySource.vue')
  },
  {
    path: '/energetic-evaluation/energy-source/energy-source-group',
    name: 'Energy Source Group',
    component: () => import('../views/EnergySourceGroup.vue'),
    props: true
  },
  {
    path: '/energetic-evaluation/energy-consumption',
    name: 'Energy Consumption',
    component: () => import('../views/EnergyConsumption.vue')
  },
  {
    path: '/energetic-evaluation/seu',
    name: 'Energy Consumption',
    component: () => import('../views/SEU.vue')
  },
  {
    path: '/energetic-evaluation/energy-source/component',
    name: 'Component',
    component: () => import('../views/Component.vue'),
    props: true
  },
  {
    path: '/energetic-evaluation/energy-source/gas-boiler',
    name: 'Gas Boiler',
    component: () => import('../views/GasBoiler.vue')
  },
  {
    path: '/energy-performance-indicator/heating',
    name: 'EnPi Heating',
    component: () => import('../views/EnPiHeating.vue')
  },
  {
    path: '/energy-performance-indicator/air',
    name: 'EnPi AHU',
    component: () => import('../views/EnPiAHU.vue')
  },
  {
    path: '/energy-performance-indicator/electricity',
    name: 'EnPi Electric',
    component: () => import('../views/EnPiElectric.vue')
  },
  {
    path: '/context/organization',
    name: 'Organization',
    component: () => import('../views/Organization.vue')
  },
  {
    path: '/context/sites',
    name: 'Sites',
    component: () => import('../views/Sites.vue')
  },
  {
    path: '/context/buildings',
    name: 'Buildings',
    component: () => import('../views/Buildings.vue')
  },
  {
    path: '/energy-goals',
    name: 'Energieziele',
    component: () => import('../views/EnergyGoals.vue')
  },
  {
    path: '/competence',
    name: 'Kompetenz',
    component: () => import('../views/Competence.vue')
  },
  {
    path: '/operation',
    name: 'Operation',
    component: () => import('../views/Operation.vue')
  },
  {
    path: '/buying',
    name: 'Buying',
    component: () => import('../views/Buying.vue')
  },
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('../views/Communication.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue')
  },
  {
    path: '/optimization',
    name: 'Optimization',
    component: () => import('../views/Optimization.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
