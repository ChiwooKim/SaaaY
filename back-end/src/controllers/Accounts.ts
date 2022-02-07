import { RequestHandler } from "express";
import { Accounts } from "../services/Accounts";

const accounts = new Accounts();

export const getFollowerList: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const targetId = req.params.id;

  async function getList(targetId: string) {
    const result = await accounts.getFollowerList(targetId);
    res.json({ followerList: result });
  }
  getList(targetId).catch((err) => {
    console.log(err);
  });
};

export const getFollowingList: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const targetId = req.params.id;

  async function getList(targetId: string) {
    const result = await accounts.getFollowingList(targetId);
    res.json({ FollowingList: result });
  }
  getList(targetId).catch((err) => {
    console.log(err);
  });
};
