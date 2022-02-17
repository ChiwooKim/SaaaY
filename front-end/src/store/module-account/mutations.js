export function someMutation(/* state */) {}

export function getUser(state, data) {
  state.user = data;
}

export function getOwner(state, data) {
  // state.owner = data[0]._fields[0].properties.username;
  state.owner = data;
}

export function myFollower(state, data) {
  state.myFollower = data;
}

export function myFollowing(state, data) {
  state.myFollowing = data;
}

export function getFollowerList(state, data) {
  state.followers = data;
  state.ownerFollower = [];
  for (const follower of state.followers) {
    state.ownerFollower.push(follower._fields[0].identity.low);
  }
}

export function getFollowingList(state, data) {
  state.followings = data;
  state.ownerFollowing = [];
  for (const following of state.followings) {
    state.ownerFollowing.push(following._fields[0].identity.low);
  }
}

export function addMyFollowingList(state, data) {
  for (const follower of state.followers) {
    if (follower._fields[0].identity.low === data.targetId) {
      follower._fields[0].properties.isFollowing = true;
    }
  }

  for (const following of state.followings) {
    if (following._fields[0].identity.low === data.targetId) {
      following._fields[0].properties.isFollowing = true;
    }
  }

  if (!state.myFollowing.includes(data.targetId)) {
    state.myFollowing.push(data.targetId);
  }

  if (
    (data.targetId === data.ownerId) &
    !state.ownerFollower.includes(data.myId)
  ) {
    state.ownerFollower.push(data.myId);
  }

  if (data.myId === data.ownerId) {
    state.ownerFollowing = state.myFollowing;
  }
}

export function deleteMyFollowingList(state, data) {
  for (const follower of state.followers) {
    if (follower._fields[0].identity.low === data.targetId) {
      follower._fields[0].properties.isFollowing = false;
    }
  }

  for (const following of state.followings) {
    if (following._fields[0].identity.low === data.targetId) {
      following._fields[0].properties.isFollowing = false;
    }
  }

  state.myFollowing = state.myFollowing.filter((following) => {
    return following !== data.targetId;
  });

  if (data.targetId === data.ownerId) {
    state.ownerFollower = state.ownerFollower.filter((follower) => {
      return follower !== data.myId;
    });
  }

  if (data.myId === data.ownerId) {
    state.ownerFollowing = state.myFollowing;
  }
}

export function getBlockList(state, data) {
  state.blockList = data;

  for (const block of state.blockList) {
    state.blockListId.push(block._fields[0].identity.low);
  }
}

export function addMyBlockList(state, targetId) {
  // state.blockList.push(target);
  if (!state.blockListId.includes(targetId)) {
    state.blockListId.push(targetId);
  }
}

export function deleteMyBlockList(state, targetId) {
  // state.blockList = state.blockList.filter(function (block) {
  //   return block._fields[0].identity.low !== targetId;
  // });

  state.blockListId = state.blockListId.filter(function (id) {
    return id !== targetId;
  });
}
