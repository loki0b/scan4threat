import { execFile } from "child_process";
import path from "path";

const DIR_NAME: string = import.meta.dirname;
const PREVIOUS: string = "..";
const BIN_DIR_NAME: string = "bin";
const BIN_EXEC: string = "api_handler";   
const binPath: string = path.join(DIR_NAME, PREVIOUS, BIN_DIR_NAME, BIN_EXEC); 

async function apiScanUrl(url: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
        const action: string = "scan";
        const apiKey: string | undefined = process.env.API_KEY;
        const args: any = [action, url, apiKey]

        execFile(binPath, args, (error: any, stdout: any, stderr: any) => {
            if (error) reject(error);
            else resolve(stdout);
        });
    });

    return result;
}

async function apiAnalyse(id: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
        const action: string = "analyses";
        const apiKey: string | undefined = process.env.API_KEY;
        const args: any = [action, id, process.env.API_KEY];
        console.log(apiKey);
        execFile(binPath, args, (error: any, stdout: any, stderr: any) => {
            if (error) reject(error);
            else resolve(stdout);
        })

    })

    return result;
}

export { apiScanUrl, apiAnalyse }
