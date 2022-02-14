import { Room } from 'src/components/models';

export interface RoomStateInterface {
  rooms: Room[];
}

function state(): RoomStateInterface {
  return {
    rooms: [],
  };
}

export default state;
