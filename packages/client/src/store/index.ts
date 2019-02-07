import Vue from 'vue';
import Vuex from 'vuex';
import user, { IUserState } from '@/store/modules/user';
import lobby, { ILobbyState } from '@/store/modules/lobby';
import queue, { IQueueState } from '@/store/modules/queue';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  lobby: ILobbyState;
  queue: IQueueState;
}

export default new Vuex.Store<IRootState>({
  modules: {
    user,
    lobby,
    queue
  } as any
});
