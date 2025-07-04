import { Request, Response, Router } from "express";

const myKey = Router();

myKey.post("/myKey", (req: Request, res: Response) => {
    const data: any = req.body;
    const apiKey: string = req.body.APIKey; 
    process.env["API_KEY"] = apiKey;
});

export default myKey;
