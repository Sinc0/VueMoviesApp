import { createStore } from 'vuex'

export default createStore({
  //global
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
        recentlySearched: null
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
        },
        recentlySearched(state)
        {
          return state.recentlySearched
        }
      },

      //mutations
      mutations: {      
        mutationSetSelectedSeason (state, value) {
          state.selectedSeason = value
        },
        
        mutationSetSelectedShow (state, value) {
          state.selectedShow = value
        },
        
        mutationSetRecentlySearched (state, value) {
          state.recentlySearched = value
        }
        
      },

      //actions
      actions: {   
        actionSetSelectedSeason ({commit}, value) {
          commit('mutationSetSelectedSeason', value)
        },
        
        actionSetSelectedShow ({commit}, value) {
          commit('mutationSetSelectedShow', value)
        },

        actionSetRecentlySearched ({commit}, value)
        {
          commit('mutationSetRecentlySearched', value)
        }
      }
      
    }
  }
})
