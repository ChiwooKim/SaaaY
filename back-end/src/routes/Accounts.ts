import { Router } from "express";
import { getFollowerList, getFollowingList } from "../controllers/Accounts";
const router = Router();

router.get("/:id/follower/", getFollowerList);

router.get("/:id/following/", getFollowingList);

router.post("/:id/follow/", );

router.delete("/:id/follow/", );

export default router;
