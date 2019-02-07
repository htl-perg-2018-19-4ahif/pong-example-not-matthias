import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';

//
// Interfaces
//
export interface IUserState {
  username: string;
  loggedIn: boolean;
}

//
// State
//
const state: IUserState = {
  username: '',
  loggedIn: false
};

//
// Mutations
//
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

//
// Actions
//
const actions: ActionTree<IUserState, IRootState> = {
  login(context, username) {
    context.commit('LOGIN', username);
  },
  logout(context) {
    context.commit('LOGOUT');
  }
};

//
// Getters
//
const getters: GetterTree<IUserState, IRootState> = {
  loggedIn: state => state.loggedIn,
  getUsername: state => state.username
};

//
// Export
//
export default { state, mutations, actions, getters };
