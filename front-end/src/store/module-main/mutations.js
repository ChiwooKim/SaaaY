export function someMutation(state) {}

export function setChatting(state, data) {
  state.chatData.push(data);
}

export function setMyconnectionId(state, data) {
  state.myConnectionId = data.myConnectionId;
  state.myFakerName = data.myFakerName;
}
