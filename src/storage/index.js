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
    simpsonData: {
      namespaced: true,
      
      //state
      state: {
        selectedShow: null,
        selectedSeasonEpisodes: null,
        selectedSeasonTitle: null,
        selectedEpisode: null,
        counter: 10,
        name: "steve",
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
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
        selectedSeasonEpisodes(state)
        {
          return state.selectedSeasonEpisodes
        },
        selectedSeasonTitle(state)
        {
          return state.selectedSeasonTitle
        }
      },

      //mutations
      mutations: {
        mutationSetCounter (state, value) {
          state.counter = value
        },
        
        mutationSetSelectedSeason (state, value) {
          state.selectedSeasonEpisodes = value.episodes
          state.selectedSeasonTitle = value.title
        }
        
      },

      //actions
      actions: {
        actionSetCounter ({commit}, value) {
          commit('mutationSetCounter', value)
        },
        
        actionSetSelectedSeason ({commit}, value) {
          commit('mutationSetSelectedSeason', value)
        }
      }
      
    }
  }
})
