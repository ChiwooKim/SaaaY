export function someMutation(/* state */) {}

export function changeMessage(state, newMsg) {
  state.message = newMsg;
}

export function authenticate(state, user) {
  state.user = user;
  state.message = "main";
}
