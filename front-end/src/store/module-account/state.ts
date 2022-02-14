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

export interface AccountStateInterface {
  prop: boolean;
  owner: follow[];
  myFollower: string[];
  myFollowing: string[];
  followers: follow[];
  followings: follow[];
  blockList: block[];
  blockListId: string[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    owner: [],
    myFollower: [],
    myFollowing: [],
    followers: [],
    followings: [],
    blockList: [],
    blockListId: [],
  };
}

export default state;
