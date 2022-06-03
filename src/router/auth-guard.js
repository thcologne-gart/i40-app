import Store from '../store'

export default (to, from, next) => {
  if (Store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}
