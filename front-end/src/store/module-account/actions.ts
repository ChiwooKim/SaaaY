import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';
import axios from 'axios';

interface block {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
    }
  ];
}

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async getOwner({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/owner`
    );
    commit('getOwner', result.data);
  },

  async myFollower({ commit }, myId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${myId}/my-follower`
    );
    commit('myFollower', result.data);
  },

  async myFollowing({ commit }, myId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${myId}/my-following`
    );
    commit('myFollowing', result.data);
  },

  async getFollowerList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/follower`
    );
    commit('getFollowerList', result.data);
  },

  async getFollowingList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/following`
    );
    commit('getFollowingList', result.data);
  },

  async addMyFollowingList({ commit }, targetId: string) {
    await axios.post(`http://localhost:3000/accounts/${targetId}/follow`);
    commit('addMyFollowingList', targetId);
  },

  async deleteMyFollowingList({ commit }, targetId: string) {
    await axios.delete(`http://localhost:3000/accounts/${targetId}/follow`);
    commit('deleteMyFollowingList', targetId);
  },

  async getBlockList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/blocklist`
    );
    commit('getBlockList', result.data);
  },

  async addMyBlockList({ commit }, target: block) {
    await axios.post(
      `http://localhost:3000/accounts/${target._fields[0].identity.low}/block`
    );
    commit('addMyBlockList', target);
  },

  async deleteMyBlockList({ commit }, targetId: string) {
    await axios.delete(`http://localhost:3000/accounts/${targetId}/block`);
    commit('deleteMyBlockList', targetId);
  },
};

export default actions;
