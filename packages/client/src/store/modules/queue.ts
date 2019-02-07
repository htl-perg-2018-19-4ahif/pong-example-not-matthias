import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';
import { IPlayer } from '@/interfaces/player';

//
// Interfaces
//
export interface IQueueState {
  player1: IPlayer;
  player2: IPlayer;
}

//
// State
//
const state: IQueueState = {
  player1: { name: '' },
  player2: { name: '' }
};

//
// Mutations
//
const mutations: MutationTree<IQueueState> = {
  //
  // Player joins/leaves queue
  //
  PLAYER_JOIN_QUEUE(state, username: string) {
    state.player1.name = username;
  },
  PLAYER_LEAVE_QUEUE(state) {
    state.player1.name = '';
  },

  //
  // Enemy joins/leaves queue
  //
  ENEMY_JOIN_QUEUE(state, username: string) {
    state.player2.name = username;
  },
  ENEMY_LEAVE_QUEUE(state) {
    state.player2.name = '';
  }
};

//
// Actions
//
const actions: ActionTree<IQueueState, IRootState> = {
  //
  // Player joins/leaves queue
  //
  playerJoinQueue(context, username: string) {
    context.commit('PLAYER_JOIN_QUEUE', username);
  },
  playerLeaveQueue(context) {
    context.commit('LEAVE_QUEUE');
  },

  //
  // Enemy joins/leaves queue
  //
  enemyJoinQueue(context, username: string) {
    context.commit('ENEMY_JOIN_QUEUE', username);
  },
  enemyLeaveQueue(context) {
    context.commit('ENEMY_LEAVE_QUEUE');
  }
};

//
// Getters
//
const getters: GetterTree<IQueueState, IRootState> = {
  canStart: state => state.player1.name && state.player2.name
};

//
// Export
//
export default {
  state,
  mutations,
  actions,
  getters
};
