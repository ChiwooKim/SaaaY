import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function getRoomList({ commit }) {
  api.get("room/list").then((response) => {
    commit("getRoomList", response.data);
  });
}
