import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '..';

//
// Interfaces
//
interface IQueue {
  player1: string;
  player2: string;
}

export interface IQueueState {
  queue: IQueue;
}

//
// State
//
const state: IQueueState = {
  queue: {
    player1: '',
    player2: ''
  }
};

//
// Mutations
//
const mutations: MutationTree<IQueueState> = {
  //
  // Player joins/leaves queue
  //
  PLAYER_JOIN_QUEUE(state, username: string) {
    state.queue.player1 = username;
  },
  PLAYER_LEAVE_QUEUE(state) {
    state.queue.player1 = '';
  },

  //
  // Enemy joins/leaves queue
  //
  ENEMY_JOIN_QUEUE(state, username: string) {
    state.queue.player2 = username;
  },
  ENEMY_LEAVE_QUEUE(state) {
    state.queue.player2 = '';
  }
};

//
// Actions
//
const actions: ActionTree<IQueueState, IRootState> = {
  //
  // Player joins/leaves queue
  //
  joinQueue(context, username: string) {
    context.commit('PLAYER_JOIN_QUEUE', username);
  },
  leaveQueue(context) {
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
  canStart: state => state.queue.player1 && state.queue.player2
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
