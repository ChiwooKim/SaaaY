import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function getRoomList({ commit }) {
  api.get("room/list").then((response) => {
    commit("GET_ROOMLIST", response.data);
  });
}

export function getRoom({ commit }, roomId) {
  api.get(`room/${roomId}`).then((response) => {
    commit("SET_ROOM", response.data);
  });
}

export function createRoom({ commit }, data) {
  // 백엔드로 방만드는데 필요한 파라미터들을 보냄
  //url 주소 , 데이터객체
  console.log(data.accessToken);
  api
    .post(`room/`, data.room, {
      headers: {
        Authorization: "Bearer " + data.accessToken,
      },
    })
    .then(() => {
      console.log("프론트에서 데이터 보냄", data);
    });
}

export function setIndex({ commit }, index) {
  commit("SET_INDEX", index);
}
