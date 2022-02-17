export function someMutation(state) {}

export function setChatting(state, data) {
  state.chatData.push(data);
}

export function setMyName(state, data) {
  state.myName = data;
}
