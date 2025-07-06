import { Request, Response, Router } from "express";
import { apiAnalyse } from "../app/apiHandlerCpp";

const analyses: Router = Router();

analyses.post("/", callBack);

async function callBack(request: Request, response: Response) {
    const payload: any = request.body;
    const id: string = payload.id;
    const apiResponse: string = await apiAnalyse(id);
    
    response.send(
        JSON.stringify(apiResponse)
    );
}

export default analyses;