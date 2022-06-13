import { keyBy } from "lodash";

export function GET_EVENT(state, save_event) {
  console.log("mut", save_event);
  state.events = save_event;
}

export function CREATE_EVENT(state, event) {
  console.log(event);
  state.events = event;
}
