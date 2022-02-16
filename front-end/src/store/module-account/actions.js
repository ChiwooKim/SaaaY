import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function getUser({ commit }, accessToken) {
  api
    .get("accounts/id", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      commit("getUser", response.data);
    });
}

export function getOwner({ commit }, targetId) {
  api
    .get(`accounts/${targetId}/owner`)
    .then((response) => commit("getOwner", response.data));
}

export function myFollower({ commit }, myId) {
  api
    .get(`accounts/${myId}/my-follower`)
    .then((response) => commit("myFollower", response.data));
}

export function myFollowing({ commit }, myId) {
  api.get(`accounts/${myId}/my-following`).then((response) => {
    commit("myFollowing", response.data);
  });
}

export function getFollowerList({ commit }, targetId) {
  api.get(`accounts/${targetId}/follower`).then((response) => {
    commit("getFollowerList", response.data);
  });
}

export function getFollowingList({ commit }, targetId) {
  api.get(`accounts/${targetId}/following`).then((response) => {
    commit("getFollowingList", response.data);
  });
}

export function addMyFollowingList({ commit }, data) {
  api
    .post(`accounts/${data.targetId}/follow`, null, {
      headers: {
        Authorization: data.accessToken,
      },
    })
    .then(() => {
      commit("addMyFollowingList", data.targetId);
    });
}

export function deleteMyFollowingList({ commit }, data) {
  api
    .delete(`accounts/${data.targetId}/follow`, {
      headers: { Authorization: data.accessToken },
    })
    .then(() => {
      commit("deleteMyFollowingList", data.targetId);
    });
}

export function getBlockList({ commit }, data) {
  api
    .get(`accounts/${data.targetId}/blocklist`, {
      headers: {
        Authorization: data.accessToken,
      },
    })
    .then((response) => {
      commit("getBlockList", response.data);
    });
}

export function addMyBlockList({ commit }, data) {
  api
    .post(`accounts/${data.targetId}/block`, null, {
      headers: {
        Authorization: data.accessToken,
      },
    })
    .then(() => {
      commit("addMyBlockList", data.targetId);
    });
}

export function deleteMyBlockList({ commit }, data) {
  const headers = { Authorization: data.accessToken };
  api
    .delete(`accounts/${data.targetId}/block`, {
      headers: {
        Authorization: data.accessToken,
      },
    })
    .then(() => {
      commit("deleteMyBlockList", data.targetId);
    });
}
