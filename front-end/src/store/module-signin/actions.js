import { Cookies, Notify } from "quasar";
import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function authenticate({ commit }, user) {
  api
    .post("/user/login", user)
    .then((response) => {
      Cookies.set("access_token", response.data.access_token, {
        expires: "1d",
      });
    })
    .then(() => api.post("/user/email", user))
    .then((response) => {
      commit("authenticate", response.data);
    })
    .catch(() => {
      Notify.create({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Check Your Email or Password",
      });
    });
}

export function loginByAccessToken({ commit }, accessToken) {
  api
    .get("/user/verify", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log("response :", response.data);
      commit("authenticate", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateProfile({ commit }, user) {
  console.log("update profile");
  const accessToken = Cookies.get("access_token");
  if (accessToken)
    api
      .put("user/profile", user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("response :", response.data);
        commit("authenticate", response.data);
      })
      .catch(console.log);
}
