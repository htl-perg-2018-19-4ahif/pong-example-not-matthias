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
  PLAYER_JOIN_QUEUE(state, player: IPlayer) {
    state.player1 = player;
  },
  PLAYER_LEAVE_QUEUE(state) {
    state.player1.name = '';
  },

  //
  // Enemy joins/leaves queue
  //
  ENEMY_JOIN_QUEUE(state, player: IPlayer) {
    state.player2 = player;
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
  playerJoinQueue(context, player: IPlayer) {
    context.commit('PLAYER_JOIN_QUEUE', player);
  },
  playerLeaveQueue(context) {
    context.commit('PLAYER_LEAVE_QUEUE');
  },

  //
  // Enemy joins/leaves queue
  //
  enemyJoinQueue(context, player: IPlayer) {
    context.commit('ENEMY_JOIN_QUEUE', player);
  },
  enemyLeaveQueue(context) {
    context.commit('ENEMY_LEAVE_QUEUE');
  }
};

//
// Getters
//
const getters: GetterTree<IQueueState, IRootState> = {
  canStart: state => state.player1.name && state.player2.name,
  getUsernamePlayer1: state => state.player1.name,
  getUsernamePlayer2: state => state.player2.name
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
