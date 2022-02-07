import { Router } from "express";
import { createFollow, getFollowerList, getFollowingList } from "../controllers/Accounts";
const router = Router();

router.get("/:id/follower/", getFollowerList);

router.get("/:id/following/", getFollowingList);

router.post("/:id/follow/", createFollow);

router.delete("/:id/follow/", );

export default router;
