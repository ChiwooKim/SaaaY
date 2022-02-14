import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SigninStateInterface } from './state';

const getters: GetterTree<SigninStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
