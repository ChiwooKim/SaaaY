import { MutationTree } from 'vuex';
import { AccountStateInterface } from './state';

interface follow {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
      properties: {
        isFollower: boolean;
        isFollowing: boolean;
        username: string;
      };
    }
  ];
}

interface block {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
    }
  ];
}

interface User {
  id: string;
  username: string;
  email: string;
  biography: string;
}

const mutation: MutationTree<AccountStateInterface> = {
  getUser(state: AccountStateInterface, data: User) {
    state.user = data;
  },

  getOwner(state: AccountStateInterface, data: follow[]) {
    // state.owner = data[0]._fields[0].properties.username;
    state.owner = data;
  },

  myFollower(state: AccountStateInterface, data: string[]) {
    state.myFollower = data;
  },

  myFollowing(state: AccountStateInterface, data: string[]) {
    state.myFollowing = data;
  },

  getFollowerList(state: AccountStateInterface, data: follow[]) {
    state.followers = data;
  },

  getFollowingList(state: AccountStateInterface, data: follow[]) {
    state.followings = data;
  },

  addMyFollowingList(state: AccountStateInterface, targetId: string) {
    for (const follower of state.followers) {
      if (follower._fields[0].identity.low === targetId) {
        follower._fields[0].properties.isFollowing = true;
      }
    }

    for (const following of state.followings) {
      if (following._fields[0].identity.low === targetId) {
        following._fields[0].properties.isFollowing = true;
      }
    }

    if (!state.myFollowing.includes(targetId)) {
      state.myFollowing.push(targetId);
    }
  },

  deleteMyFollowingList(state: AccountStateInterface, targetId: string) {
    for (const follower of state.followers) {
      if (follower._fields[0].identity.low === targetId) {
        follower._fields[0].properties.isFollowing = false;
      }
    }

    for (const following of state.followings) {
      if (following._fields[0].identity.low === targetId) {
        following._fields[0].properties.isFollowing = false;
      }
    }

    state.myFollowing = state.myFollowing.filter((following) => {
      return following !== targetId;
    });
  },

  getBlockList(state: AccountStateInterface, data: block[]) {
    state.blockList = data;

    for (const block of state.blockList) {
      state.blockListId.push(block._fields[0].identity.low);
    }
  },

  addMyBlockList(state: AccountStateInterface, targetId: string) {
    // state.blockList.push(target);
    if (!state.blockListId.includes(targetId)) {
      state.blockListId.push(targetId);
    }
  },

  deleteMyBlockList(state: AccountStateInterface, targetId: string) {
    // state.blockList = state.blockList.filter(function (block) {
    //   return block._fields[0].identity.low !== targetId;
    // });

    state.blockListId = state.blockListId.filter(function (id) {
      return id !== targetId;
    });
  },
};

export default mutation;
