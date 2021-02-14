import { createStore } from 'vuex'

export default createStore({
  //default
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },

  //modules
  modules: {
    showData: {
      namespaced: true,
      
      //state
      state: {
        selectedShow: null,
        selectedSeason: null,
        selectedEpisode: null,
      },
      
      //getters
      getters: {
        selectedSeason(state)
        {
          return state.selectedSeason
        },
        selectedShow(state)
        {
          return state.selectedShow
        }
      },

      //mutations
      mutations: {      
        mutationSetSelectedSeason (state, value) {
          state.selectedSeason = value
        },
        
        mutationSetSelectedShow (state, value) {
          state.selectedShow = value
        }
        
      },

      //actions
      actions: {   
        actionSetSelectedSeason ({commit}, value) {
          console.log(value)
          commit('mutationSetSelectedSeason', value)
        },
        
        actionSetSelectedShow ({commit}, value) {
          commit('mutationSetSelectedShow', value)
        }
      }
      
    }
  }
})
