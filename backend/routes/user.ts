import { Request, Response, Router } from "express";

// TODO:
// improve user route and add response to all routes

const userRouter = Router();

userRouter.post("/user", (req: Request, res: Response) => {
    const data: any = req.body;
    const apiKey: any = data.APIKey;
    process.env.API_KEY = apiKey;
    console.log(process.env.API_KEY);
});

export default userRouter;
