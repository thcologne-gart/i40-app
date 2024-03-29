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
    component: () => import('../views/Home.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterSites.vue')
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
    path: '/generalstart',
    name: 'General Infos Start',
    component: () => import('../views/general/GeneralInfosStart.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/generalinfos',
    name: 'General Infos',
    component: () => import('../views/general/GeneralInfosSitesBuildings.vue')
    // props: true
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
    component: () => import('../views/digitaltwin/DTStart.vue'),
    beforeEnter: AuthGuard
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
    path: '/management-start/operation',
    name: 'Management Operation',
    component: () => import('../views/ems/management/Operation.vue')
  },
  {
    path: '/management-start/management',
    name: 'Management Management',
    component: () => import('../views/ems/management/ManagementSubmodel.vue')
  },
  {
    path: '/ressources-start/agents',
    name: 'Ressourcen',
    component: () => import('../views/ems/ressources/Agents.vue')
  },
  {
    path: '/ressources-start',
    name: 'Ressourcen',
    component: () => import('../views/ems/ressources/RessourcesStart.vue')
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
    path: '/goals-start/energy-goals',
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
    path: '/competence/competence',
    name: 'Kompetenz Kompetenz',
    component: () => import('../views/ems/competence/CompetenceSubmodel.vue')
  },
  {
    path: '/operation',
    name: 'Operation',
    component: () => import('../views/ems/operation/Operation.vue')
  },
  {
    path: '/operation/operation',
    name: 'Operation Operation',
    component: () => import('../views/ems/operation/OperationSubmodel.vue')
  },
  {
    path: '/buying',
    name: 'Buying',
    component: () => import('../views/ems/buying/Buying.vue')
  },
  {
    path: '/buying/buying',
    name: 'Buying Buying',
    component: () => import('../views/ems/buying/BuyingSubmodel.vue')
  },
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('../views/ems/communication/Communication.vue')
  },
  {
    path: '/communication/communication',
    name: 'Communication Communication',
    component: () => import('../views/ems/communication/CommunicationSubmodel.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/ems/analysis/Analysis.vue')
  },
  {
    path: '/analysis/measurement',
    name: 'Messung',
    component: () => import('../views/ems/analysis/Measurement.vue')
  },
  {
    path: '/optimization',
    name: 'Optimization',
    component: () => import('../views/ems/optimization/Optimization.vue')
  },
  {
    path: '/optimization/optimization',
    name: 'Optimization Optimization',
    component: () => import('../views/ems/optimization/OptimizationSubmodel.vue')
  },
  {
    path: '/buildingperformance/waermeversorgen',
    name: 'Wärme versorgen',
    component: () => import('../views/buildingperformance/WärmeVersorgen.vue'),
    props: true
  },
  {
    path: '/buildingperformance/kaelteversorgen',
    name: 'Kälte versorgen',
    component: () => import('../views/buildingperformance/KälteVersorgen.vue'),
    props: true
  },
  {
    path: '/buildingperformance/medienversorgen',
    name: 'Medien versorgen',
    component: () => import('../views/buildingperformance/MedienVersorgen.vue'),
    props: true
  },
  {
    path: '/buildingperformance/stromversorgen',
    name: 'Strom versorgen',
    component: () => import('../views/buildingperformance/StromVersorgen.vue'),
    props: true
  },
  {
    path: '/buildingperformance/luftversorgen',
    name: 'Luft versorgen',
    component: () => import('../views/buildingperformance/LuftVersorgen.vue'),
    props: true
  },
  {
    path: '/buildingperformance/sichern',
    name: 'Sichern',
    component: () => import('../views/buildingperformance/Sichern.vue'),
    props: true
  },
  {
    path: '/buildingperformance/befoerdern',
    name: 'Befördern',
    component: () => import('../views/buildingperformance/Befördern.vue'),
    props: true
  },
  {
    path: '/buildingperformance/andereanlagen',
    name: 'Andere Anlagen',
    component: () => import('../views/buildingperformance/AndereAnlagen.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
