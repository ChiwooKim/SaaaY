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

export interface AccountStateInterface {
  prop: boolean;
  user: User;
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
    user: { id: '', username: '', email: '', biography: '' },
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
