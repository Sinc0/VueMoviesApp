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
        recentlySearched: null,
        followedShows: null,
        selectedMovie: null,
        followedMovies: null
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
        },
        followedShows(state)
        {
          return state.followedShows
        },
        selectedMovie(state)
        {
          return state.selectedMovie
        },
        followedMovies(state)
        {
          return state.followedMovies
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
        },

        mutationSetFollowedShows (state, value) {
          state.followedShows = value
        },

        mutationSetSelectedMovie (state, value) {
          state.selectedMovie = value
        },

        mutationSetFollowedMovies (state, value) {
          state.followedMovies = value
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
        },

        actionSetFollowedShows ({commit}, value)
        {
          commit('mutationSetFollowedShows', value)
        },

        actionSetSelectedMovie({commit}, value)
        {
          commit('mutationSetSelectedMovie', value)
        },

        actionSetFollowedMovies({commit}, value)
        {
          commit('mutationSetFollowedMovies', value)
        }
      }
      
    }
  }
})
