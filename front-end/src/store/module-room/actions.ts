import axios from 'axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RoomStateInterface } from './state';

const actions: ActionTree<RoomStateInterface, StateInterface> = {
  async getRoomList({ commit }) {
    const result = await axios.get('http://localhost:3000/room/list');
    console.log(result.data);
    commit('getRoomList', result.data);
  },
};

export default actions;
