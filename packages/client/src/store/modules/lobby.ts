import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';

//
// Interfaces
//
export interface ILobby {
  name: string;
  creator: string;
  slots: string;

  player1: string;
  player2: string;
}

export interface ILobbyState {
  lobbies: ILobby[];
}

//
// State
//
const state: ILobbyState = {
  lobbies: []
};

//
// Mutations
//
const mutations: MutationTree<ILobbyState> = {
  SET_LOBBIES(state: ILobbyState, lobbies: ILobby[]) {
    state.lobbies = lobbies;
  }
};

//
// Actions
//
const actions: ActionTree<ILobbyState, IRootState> = {
  setLobbies(context, lobbies: ILobby[]) {
    context.commit('SET_LOBBIES', lobbies);
  }
};

//
// Getters
//
const getters: GetterTree<ILobbyState, IRootState> = {};

//
// Export
//
export default {
  state,
  mutations,
  actions,
  getters
};
