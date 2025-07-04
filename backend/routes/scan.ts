import { Request, Response, Router } from "express";
import { execApiHandler } from "../app/apiHandlerCpp";

const scanRouter = Router();

scanRouter.post("/", (req: Request, res: Response) => {
    const data: string = req.body;
    const url: string = data["url"];

    console.log("ping");
    
    const apiResponse: string = execApiHandler(url);
    res.send(
        JSON.stringify(apiResponse)
    )
})

export default scanRouter;