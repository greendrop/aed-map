export const state = () => ({
  aedPositions: []
})

export const actions = {
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
  setAedPositions(state, data) {
    state.aedPositions = data
  }
}

export const getters = {
  aedPositions(state) {
    return state.aedPositions
  }
}
