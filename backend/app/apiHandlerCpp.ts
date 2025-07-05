import { execFile } from "child_process";
import path from "path";

 // TODO: 
 // return execFile payload to back and process
 // implement general binPath   

function execApiHandler(url: string): string {
    const binPath = path.join("/home/loki0b/eecs/scan4threat/backend/", "bin", "api_handler"); 
    const apiKey: string | undefined = process.env.API_KEY; 

    const args: any = [url, apiKey]
    execFile(binPath, args, (error: any, stdout: any, stderr: any) => {
        console.log(stdout);
    });
    
    return "res";
}

export { execApiHandler }
