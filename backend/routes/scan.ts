import { Request, Response, Router } from "express";
import { execApiHandler } from "../app/apiHandlerCpp";

const scanRouter = Router();

scanRouter.post("/", (req: Request, res: Response) => {
    const urlLink: string = req.body.urlLink;

    console.log("ping", urlLink);
    
    const apiResponse: string = execApiHandler(urlLink);
    res.send(
        JSON.stringify(apiResponse)
    )
})

export default scanRouter;