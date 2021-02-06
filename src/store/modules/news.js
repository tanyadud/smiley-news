import axios from '@/axios-auth'

// initial state
const state = {
  news_latest: [],
  news: [],
  categories: [],
  categories_featured: [],
}

// getters
const getters = {}

// actions
const actions = {
  get_news_latest({
    commit
  }) {
    axios.get('/news/latest')
      .then(res => {
        commit('SET_NEWS_LATEST', res.data.latest_news);
        commit('SET_CATEGORIES_FEATURED', res.data.featured_goals);
      })
      .catch(error => console.error(error))
  },
  get_categories({
    commit
  }) {
    axios.get('/goals')
      .then(res => {
        commit('SET_CATEGORIES', res.data.goal_categories[0].goals);
      })
      .catch(error => console.error(error))
  },
}



// mutations
const mutations = {
  SET_NEWS_LATEST(state, data) {
    state.news = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_CATEGORIES_FEATURED(state, data) {
    state.categories_featured = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}