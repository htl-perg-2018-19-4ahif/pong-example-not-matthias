import { MutationTree, ActionTree, GetterTree } from 'vuex';

interface IUserState {
  username: string;
  loggedIn: boolean;
}

const state: IUserState = {
  username: '',
  loggedIn: false
};

const mutations: MutationTree<IUserState> = {
  LOGIN(state, username) {
    state.username = username;
    state.loggedIn = true;
  },
  LOGOUT(state) {
    state.username = '';
    state.loggedIn = false;
  }
};

const actions: ActionTree<IUserState, IUserState> = {
  login(context, username: string) {
    context.commit('LOGIN', username);
  },
  logout(context) {
    context.commit('LOGOUT');
  }
};

const getters: GetterTree<IUserState, IUserState> = {
  loggedIn: state => state.loggedIn
};

export default {
  state,
  mutations,
  actions,
  getters
};
