import { Request, Response, Router } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const data = req.body;
    const url = data.url;
});

export default router;
