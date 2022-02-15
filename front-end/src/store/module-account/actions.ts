import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';
import { api } from 'src/boot/axios';

// interface block {
//   keys: string[];
//   _fields: [
//     {
//       identity: { low: string; high: string };
//     }
//   ];
// }

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async getUser({ commit }, accessToken: string) {
    const headers = { Authorization: accessToken };
    const result = await api.get('accounts/id', { headers });
    commit('getUser', result.data);
  },

  async getOwner({ commit }, targetId: string) {
    const result = await api.get(`accounts/${targetId}/owner`);
    commit('getOwner', result.data);
  },

  async myFollower({ commit }, myId: string) {
    const result = await api.get(`accounts/${myId}/my-follower`);
    commit('myFollower', result.data);
  },

  async myFollowing({ commit }, myId: string) {
    const result = await api.get(`accounts/${myId}/my-following`);
    commit('myFollowing', result.data);
  },

  async getFollowerList({ commit }, targetId: string) {
    const result = await api.get(`accounts/${targetId}/follower`);
    commit('getFollowerList', result.data);
  },

  async getFollowingList({ commit }, targetId: string) {
    const result = await api.get(`accounts/${targetId}/following`);
    commit('getFollowingList', result.data);
  },

  async addMyFollowingList(
    { commit },
    data: { accessToken: string; targetId: string }
  ) {
    const headers = { Authorization: data.accessToken };
    await api.post(`accounts/${data.targetId}/follow`, null, {
      headers,
    });
    commit('addMyFollowingList', data.targetId);
  },

  async deleteMyFollowingList(
    { commit },
    data: { accessToken: string; targetId: string }
  ) {
    const headers = { Authorization: data.accessToken };
    await api.delete(`accounts/${data.targetId}/follow`, { headers });
    commit('deleteMyFollowingList', data.targetId);
  },

  async getBlockList(
    { commit },
    data: { accessToken: string; targetId: string }
  ) {
    const headers = { Authorization: data.accessToken };
    const result = await api.get(`accounts/${data.targetId}/blocklist`, {
      headers,
    });
    commit('getBlockList', result.data);
  },

  async addMyBlockList(
    { commit },
    data: { accessToken: string; targetId: string }
  ) {
    const headers = { Authorization: data.accessToken };
    await api.post(`accounts/${data.targetId}/block`, null, {
      headers,
    });
    commit('addMyBlockList', data.targetId);
  },

  async deleteMyBlockList(
    { commit },
    data: { accessToken: string; targetId: string }
  ) {
    const headers = { Authorization: data.accessToken };
    await api.delete(`accounts/${data.targetId}/block`, { headers });
    commit('deleteMyBlockList', data.targetId);
  },
};

export default actions;
