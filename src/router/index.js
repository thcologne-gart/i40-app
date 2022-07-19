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
    path: '/contextstart',
    name: 'Context Start',
    component: () => import('../views/ems/context/ContextStart.vue')
  },
  {
    path: '/context',
    name: 'Context',
    component: () => import('../views/ems/context/OrganizationContext.vue')
  },
  {
    path: '/emsstart',
    name: 'EMS Start',
    component: () => import('../views/ems/EMSWelcome.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/ems',
    name: 'Energiemanagement',
    component: () => import('../views/ems/EmsStart.vue')
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
    path: '/digitaltwinsoverview/kpioverview',
    name: 'KPI overview',
    component: () => import('../views/digitaltwin/KPIOverview.vue'),
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
    component: () => import('../views/ems/management/Management.vue')
  },
  {
    path: '/management-start',
    name: 'Management Start',
    component: () => import('../views/ems/management/ManagementStart.vue')
  },
  {
    path: '/ressources',
    name: 'Ressourcen',
    component: () => import('../views/ems/ressources/Ressources.vue')
  },
  {
    path: '/ressources-start',
    name: 'Ressourcen Start',
    component: () => import('../views/ems/ressources/RessourcesStart.vue')
  },
  {
    path: '/energetic-evaluation',
    name: 'Energetic Evaluation',
    component: () => import('../views/ems/evaluation/EnergeticEvaluation.vue')
  },
  {
    path: '/evaluation-start',
    name: 'Evaluation Start',
    component: () => import('../views/ems/evaluation/EvaluationStart.vue')
  },
  {
    path: '/energy-performance-indicator',
    name: 'Energy Performance Indicators',
    component: () => import('../views/ems/indicators/EnergyPerformanceIndicators.vue')
  },
  {
    path: '/indicators-start',
    name: 'Indicators Start',
    component: () => import('../views/ems/indicators/IndicatorsStart.vue')
  },
  {
    path: '/evaluation-start/energy-type',
    name: 'Energy Type',
    component: () => import('../views/ems/evaluation/EnergyType.vue')
  },
  {
    path: '/evaluation-start/energy-source',
    name: 'Energy Source',
    component: () => import('../views/ems/evaluation/EnergySource.vue')
  },
  {
    path: '/evaluation-start/energy-source/energy-source-group',
    name: 'Energy Source Group',
    component: () => import('../views/ems/evaluation/EnergySourceGroup.vue'),
    props: true
  },
  {
    path: '/evaluation-start/energy-consumption',
    name: 'Energy Consumption',
    component: () => import('../views/ems/evaluation/EnergyConsumption.vue')
  },
  {
    path: '/evaluation-start/seu',
    name: 'Energy Consumption',
    component: () => import('../views/ems/evaluation/SEU.vue')
  },
  {
    path: '/evaluation-start/energy-source/component',
    name: 'Component',
    component: () => import('../views/ems/evaluation/Component.vue'),
    props: true
  },
  {
    path: '/energetic-evaluation/energy-source/gas-boiler',
    name: 'Gas Boiler',
    component: () => import('../views/ems/evaluation/GasBoiler.vue')
  },
  {
    path: '/indicators-start/enpis',
    name: 'EnPi Heating',
    component: () => import('../views/ems/indicators/EnPiOverview.vue')
  },
  {
    path: '/indicators-start/air',
    name: 'EnPi AHU',
    component: () => import('../views/ems/indicators/EnPiAHU.vue')
  },
  {
    path: '/indicators-start/electricity',
    name: 'EnPi Electric',
    component: () => import('../views/ems/indicators/EnPiElectric.vue')
  },
  {
    path: '/contextstart/organization',
    name: 'Organization',
    component: () => import('../views/ems/context/Organization.vue')
  },
  {
    path: '/contextstart/sites',
    name: 'Sites',
    component: () => import('../views/ems/context/Sites.vue')
  },
  {
    path: '/contextstart/buildings',
    name: 'Buildings',
    component: () => import('../views/ems/context/Buildings.vue')
  },
  {
    path: '/energy-goals',
    name: 'Energieziele',
    component: () => import('../views/ems/goals/EnergyGoals.vue')
  },
  {
    path: '/goals-start',
    name: 'Energieziele Start',
    component: () => import('../views/ems/goals/GoalsStart.vue')
  },
  {
    path: '/competence',
    name: 'Kompetenz',
    component: () => import('../views/ems/competence/Competence.vue')
  },
  {
    path: '/operation',
    name: 'Operation',
    component: () => import('../views/ems/operation/Operation.vue')
  },
  {
    path: '/buying',
    name: 'Buying',
    component: () => import('../views/ems/buying/Buying.vue')
  },
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('../views/ems/communication/Communication.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/ems/analysis/Analysis.vue')
  },
  {
    path: '/optimization',
    name: 'Optimization',
    component: () => import('../views/ems/optimization/Optimization.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
