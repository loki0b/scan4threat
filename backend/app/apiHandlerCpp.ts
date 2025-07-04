import { execFile } from "child_process";
import path from "path";

function execApiHandler(url: string): string {
    const binPath = path.join("/home/loki0b/eecs/scan4threat/backend/", "bin", "api_handler");
    const apiKey: any | undefined = process.env.API_KEY; 
    const args = [url, apiKey]
    
    execFile(binPath, args, (error: any, stdout: any, stderr: any) => {
        console.log(stdout);
    });
    
    return "res";
}

export { execApiHandler }
