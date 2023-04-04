import { createStore } from "vuex";

const store = createStore({
  state: {
    loggedIn: false,
    accessKey: "",
    logInTime: -1,
    queuedOrPrev: true,
  },
  getters: {},
  mutations: {
    setLoggedIn(state, loggedIn: boolean) {
      state.loggedIn = loggedIn;
    },
    setAccessKey(state, accessKey: string) {
      state.accessKey = accessKey;
    },
    setLogInTime(state, logInTime: number) {
      state.logInTime = logInTime;
    },
    setQueuedOrPrev(state, queuedOrPrev: boolean) {
      state.queuedOrPrev = queuedOrPrev;
    },
  },
  actions: {
    setAccessKey({ commit }, { authKey: accessKey, time }: { authKey: string; time: number }) {
      commit("setLoggedIn", true);
      commit("setAccessKey", accessKey);
      commit("setLogInTime", time);
    },
    clearAccessKey({ commit }) {
      // localStorage.clear();
      commit("setAccessKey", "");
      commit("setLoggedIn", false);
      commit("setLogInTime", -1);
    },
    setQueuedOrPrev({ commit }, queuedOrPrev: boolean) {
      commit("setQueuedOrPrev", queuedOrPrev);
    },
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("vuexStore", JSON.stringify(state));
});

if (localStorage.getItem("vuexStore")) {
  // Replace the state object with the stored item
  store.replaceState(Object.assign(store.state, JSON.parse(localStorage.getItem("vuexStore") || "{}")));
}

export default store;
