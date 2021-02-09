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
        // selectedSeasonEpisodes: null,
        // selectedSeasonTitle: null,
        selectedEpisode: null,
        counter: null,
        // name: "steve",
        // todos: [
        //   { id: 1, text: '...', done: true },
        //   { id: 2, text: '...', done: false }
        // ]
      },
      
      //getters
      getters: {
        times(state) {
          return state.counter * 2
        },
        doneTodos(state) {
          return state.todos
        },
        name(state) {
          return state.name
        },
        selectedSeason(state)
        {
          return state.selectedSeason
        },
        // selectedSeasonEpisodes(state)
        // {
        //   return state.selectedSeasonEpisodes
        // },
        // selectedSeasonTitle(state)
        // {
        //   return state.selectedSeasonTitle
        // },
        selectedShow(state)
        {
          return state.selectedShow
        }
      },

      //mutations
      mutations: {
        mutationSetCounter (state, value) {
          state.counter = value
        },
        
        mutationSetSelectedSeason (state, value) {
          state.selectedSeason = value
          // state.selectedSeasonEpisodes = value.episodes
          // state.selectedSeasonTitle = value.season
        },
        
        mutationSetSelectedShow (state, value) {
          state.selectedShow = value
        }
        
      },

      //actions
      actions: {
        actionSetCounter ({commit}, value) {
          commit('mutationSetCounter', value)
        },
        
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
