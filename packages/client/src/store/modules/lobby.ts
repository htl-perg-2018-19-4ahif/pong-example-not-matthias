import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';

export interface ILobby {
  name: string;
  player1: string;
  player2: string;
}

export interface ILobbyState {
  queue: ILobby;
  lobbies: ILobby[];
}

const state: ILobbyState = {
  queue: { name: '', player1: '', player2: '' },
  lobbies: []
};

const mutations: MutationTree<ILobbyState> = {
  JOIN_QUEUE(state, lobby: ILobby) {
    state.queue = lobby;
  },
  LEAVE_QUEUE(state) {
    state.queue.player1 = '';
  },
  ENEMY_JOIN_QUEUE(state, lobby: ILobby) {
    state.queue.player2 = lobby.player2;
  },
  ENEMY_LEAVE_QUEUE(state) {
    state.queue.player2 = '';
  }
};

const actions: ActionTree<ILobbyState, IRootState> = {
  joinQueue(context, username: string) {
    context.commit('JOIN_QUEUE', username);
  },
  leaveQueue(context) {
    context.commit('LEAVE_QUEUE');
  },
  enemyJoinQueue(context) {
    context.commit('ENEMY_JOIN_QUEUE');
  },
  enemyLeaveQueue(context) {
    context.commit('ENEMY_LEAVE_QUEUE');
  }
};

const getters: GetterTree<ILobbyState, IRootState> = {
  isQueuing: state => state.queue.name && state.queue.player1 && state.queue.player2
};

export default {
  state,
  mutations,
  actions,
  getters
};
