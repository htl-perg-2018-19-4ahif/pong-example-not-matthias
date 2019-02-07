import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';

export interface IUserState {
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

const actions: ActionTree<IUserState, IRootState> = {
  login(context, username: string) {
    context.commit('LOGIN', username);
  },
  logout(context) {
    context.commit('LOGOUT');
  }
};

const getters: GetterTree<IUserState, IRootState> = {
  loggedIn: state => state.loggedIn
};

export default { namespaced: true, state, mutations, actions, getters };
