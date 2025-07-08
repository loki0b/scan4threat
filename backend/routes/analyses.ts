import { Request, Response, Router } from "express";
import { apiAnalyse } from "../app/apiHandlerCpp";

const analyses: Router = Router();

analyses.post("/", callBack);

async function callBack(request: Request, response: Response) {
    const payload: any = request.body;
    console.log('Recebido no backend /api/analyses:', payload)
    const id: string = payload.id;
    const apiResponse: string = await apiAnalyse(id);
    console.log('Resposta da apiAnalyse:', apiResponse)
    response.send(
        JSON.stringify(apiResponse)
    );
}

export default analyses;