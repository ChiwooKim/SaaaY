import axios from "axios";
import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export async function getEvent({ commit }) {
  const accessToken = Cookies.get("access_token");
  api
    .get("schedule/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      commit("GET_EVENT", res.data);
    })
    .catch((err) => console.log(err));
}

export async function deleteEvent({}, eventId) {
  const accessToken = Cookies.get("access_token");
  await axios({
    method: "delete",
    url: "http://localhost:3000/schedule/delete",
    data: {
      id: eventId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// async createEvent({}, event: object) {
//   await axios({
//     method: 'post',
//     url: 'http://localhost:3000/schedule/create',
//     data: event,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// },

export async function updateEvent({}, event) {
  const accessToken = Cookies.get("access_token");
  await axios({
    method: "put",
    url: "http://localhost:3000/schedule/update",
    data: event,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
