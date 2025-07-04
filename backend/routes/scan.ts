import { Request, Response, Router } from "express";
import { execApiHandler } from "../app/apiHandlerCpp";

const scanRouter = Router();

scanRouter.post("/scanUrl", (req: Request, res: Response) => {
    const urlLink: string = req.body.urlLink;
    
    const apiResponse: string = execApiHandler(urlLink);
    res.send(
        JSON.stringify(apiResponse)
    )
})

scanRouter.post("/scanFile", (req: Request, res: Response) => {
    res.send("oi");
})

export default scanRouter;