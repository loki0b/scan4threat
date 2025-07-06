import { Request, Response, Router } from "express";
import { apiScanUrl } from "../app/apiHandlerCpp";

const URL = "url";
const FILE = "file";

const scanRouter = Router();

scanRouter.post("/", async (request: Request, response: Response) => {
    const payload: any = request.body;
    const payloadType = payload.type;
    
    if (payloadType === URL) {
        const url: string = payload.urlLink;
        const apiResponse: string = await apiScanUrl(url);
        
        response.send(
            JSON.stringify(apiResponse)
        );
    } 
    
    // TODO
    else if (payloadType === FILE) {
        const file: any = payload.formData.get("uploadedFile");
        //const apiResponse: string = await apiScanFile(file);

        response.send(
            //JSON.stringify(apiResponse)
        );
    } 
    
    else {
        response.send({
            error: "unknown type"
        });
    }
});

export default scanRouter;
