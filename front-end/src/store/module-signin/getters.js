export function someGetter(/* state */) {}

export function getUser(state) {
  const user = { ...state.user };
  return user;
}
