import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { RoomStateInterface } from './state';

const getters: GetterTree<RoomStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
