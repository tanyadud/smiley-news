import axios from '@/axios-auth'

// initial state
const state = {
  currentCategory: '',
  goals: [],
  pastEvents: [],
  events: [],
  pastEventsPages: 1,
  eventsPages: 1,
}

// getters
const getters = {}

// actions
const actions = {
  get_events_data({
    commit
  }) {
    axios.get('/goals')
      .then(res => {
        commit('SET_USERDATA', res.data.goal_categories[0]);

        return res.data.goal_categories[0];
      })
      .catch(error => console.error(error))
  },
  get_events({
    commit
  }, page) {
    page = page || 1;
    let url = (this.getters['user/isAuthenticated']) ? '/events/auth?page=' + page : '/events?page=' + page;

    axios.get(url)
      .then(res => {

        commit('SET_EVENTS', res.data.events)
        commit('SET_EVENTS_PAGES', res.data.pages_count)


        if (this.getters['user/isAuthenticated']) {
          commit('user/SET_USER_ATTENDING_EVENTS', res.data.attending, {
            root: true
          })
        }
      })
      .catch(error => console.error(error))
  },
  get_past_events({
    commit
  }) {
    axios.get('/events/past')
      .then(res => {
        commit('SET_PAST_EVENTS', res.data.events)
      })
      .catch(error => console.error(error))
  },
  send_filter_params({
    commit
  }, params) {
    axios.get('/events/filters', {
        params: params
      })
      .then(res => {
        if (res.data.events.length === 0) {
          alert('Sorry, no event\'ts found.');
        } else {
          commit('SET_EVENTS', res.data.events);
        }
      })
      .catch(error => console.error(error))
  },
  registerUserForEvent({
    commit
  }, item) {
    axios.post('/events/' + item.id + '/attend', item)
      .then(res => {
        let result = res.data.attending;
        commit('user/SET_USER_ATTENDING_EVENTS', result, {
          root: true
        })
      })
      .catch(error => console.error(error))
  },
  unregisterUserForEvent({
    commit
  }, event) {
    axios.post('/events/' + event.id + '/attend/cancel', event)
      .then(res => {
        let result = res.data.attending;
        console.log(res.data);
        commit('user/SET_USER_ATTENDING_EVENTS', result, {
          root: true
        });
      })
      .catch(error => console.error(error))
  },
  updateOrganisationRegistration({
    commit
  }, event) {
    axios.post('/events/' + event.id + '/attend/update', event)
      .then(res => {
        // let result = res.data.attending;
        // console.log(res.data);
        // commit('user/SET_USER_ATTENDING_EVENTS', result, {
        //   root: true
        // });
      })
      .catch(error => console.error(error))
  },
}



// mutations
const mutations = {
  SET_USERDATA(state, data) {
    state.goals = data.goals;
    state.currentCategory = data.name
  },
  SET_PAST_EVENTS(state, data) {
    state.pastEvents = data
  },
  SET_EVENTS(state, data) {
    state.events = data
  },
  SET_EVENTS_PAGES(state, data) {
    state.eventsPages = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}