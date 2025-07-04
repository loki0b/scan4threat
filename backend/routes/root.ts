import { Request, Response, Router } from "express";
import { execApiHandler } from "../exec";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const data = req.body;
    const url = data.url;
    const responseApiHandler = execApiHandler(url)
    console.log(responseApiHandler);
    res.send(
        JSON.stringify(responseApiHandler)
    );

});

export default router;
