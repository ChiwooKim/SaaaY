import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { RoomStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const roomModule: Module<RoomStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default roomModule;
