export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    // console.log(!!state.user)
    return !!state.user
  }
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
export const actions = {
  setUser(context, user) {
    context.commit('setUser', user)
  }
}
