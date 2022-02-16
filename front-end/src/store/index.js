import { store } from "quasar/wrappers";
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from "vuex";

// import example from './module-example'
import account from "./module-account";
import schedule from "./module-schedule";
// import room from "./module-room";
import signin from "./module-signin";
import user from "./module-user";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export interface StateInterface {
//   // Define your own store structure, using submodules if needed
//   // example: ExampleStateInterface;
//   // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
//   example: unknown;
//   account: AccountStateInterface;
//   room: RoomStateInterface;
//   signin: SigninStateInterface;
// }

// provide typings for `this.$store`
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: VuexStore<StateInterface>;
//   }
// }

// provide typings for `useStore` helper
export const storeKey = Symbol("vuex-key");

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      account,
      schedule,
      // room,
      signin,
      user,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
