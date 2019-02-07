import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import lobby, { ILobby, ILobbyState } from '@/store/modules/lobby';
import { IUserState } from '@/store/modules/user';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  lobby: ILobbyState;
}

export default new Vuex.Store<IRootState>({
  modules: {
    user,
    lobby
  } as any
});
