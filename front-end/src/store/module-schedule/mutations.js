export function GET_EVENT(state, save_event) {
  console.log(save_event);
  state.events = save_event;
}
