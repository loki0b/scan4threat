import { execFile } from "child_process";
import path from "path";

function execApiHandler(url: string): string {
    const binPath = path.join("/home/loki0b/eecs/scan4threat/backend/", "bin", "api_handler");
    const args = [url]
    
    execFile(binPath, args, (error, stdout, stderr) => {
        console.log(stdout);
    });
    
    return "res";
}

export { execApiHandler }