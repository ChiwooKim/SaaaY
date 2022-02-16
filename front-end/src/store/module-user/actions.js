import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function getUserById({commit}, userId) {
  console.log('get user info : ',userId);
  api.get(`/user/id/${userId}`)
  .then(res => {
    console.log(res.data);
    commit("setUser", res.data);
  })

}
