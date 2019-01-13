export const state = () => ({
  centerLatitude: 0,
  centerLongitude: 0,
  aedPositions: []
})

export const actions = {
  setCenter({ commit }, { latitude, longitude }) {
    commit('setCenterLatitude', latitude)
    commit('setCenterLongitude', longitude)
  },
  async getAedPositions({ commit }, { latitude, longitude }) {
    const url = process.env.API_URL
    const params = {
      lat: latitude,
      lng: longitude
    }
    const response = await this.$axios
      .get(url, { params: params })
      .then(response => {
        return response.data
      })
      .catch(() => {
        return []
      })
    commit('setAedPositions', response)
  }
}

export const mutations = {
  setCenterLatitude(state, data) {
    state.centerLatitude = data
  },
  setCenterLongitude(state, data) {
    state.centerLongitude = data
  },
  setAedPositions(state, data) {
    state.aedPositions = data
  }
}

export const getters = {
  centerLatitude(state) {
    return state.centerLatitude
  },
  centerLongitude(state) {
    return state.centerLongitude
  },
  aedPositions(state) {
    return state.aedPositions
  }
}
