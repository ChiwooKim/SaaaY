import { Room } from 'src/components/models';
import { MutationTree } from 'vuex';
import { RoomStateInterface } from './state';

// const mutation: MutationTree<RoomListStateInterface> = {
//   getRoomList(statd: RoomListStateInterface, data: roomList) {
//     state.roomList = data;
//   },
// };
const mutation: MutationTree<RoomStateInterface> = {
  getRoomList(state: RoomStateInterface, data: Room[]) {
    state.rooms = data;
  },
};

export default mutation;
