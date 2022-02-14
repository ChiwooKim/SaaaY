import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SigninStateInterface } from './state';

const actions: ActionTree<SigninStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
