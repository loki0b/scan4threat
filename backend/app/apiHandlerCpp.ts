import { execFile } from "child_process";
import path from "path";

const DIR_NAME: string = import.meta.dirname;
const PREVIOUS: string = "..";
const BIN_DIR_NAME: string = "bin";
const BIN_EXEC: string = "api_handler";   

async function execApiHandler(url: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
        const binPath: string = path.join(DIR_NAME, PREVIOUS, BIN_DIR_NAME, BIN_EXEC); 
        const apiKey: string | undefined = process.env.API_KEY;
        const args: any = [url, apiKey]
        console.log(url, apiKey);

        execFile(binPath, args, (error: any, stdout: any, stderr: any) => {
            if (error) reject(error);
            else resolve(stdout);
        });
    });

    return result;
}

export { execApiHandler }
