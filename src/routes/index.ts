import { Router } from "express";
import geniusRoutes from "./genius";
import lyricsRoute from "./lyrics";

const router = Router();

router.use("/genius", geniusRoutes);
router.use("/lyrics", lyricsRoute);

export default router;
