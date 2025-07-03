import { execFile } from "child_process";
import e from "express";
import path from "path";

function execApiHandler(url: string): any {
    const __dirname = import.meta.dirname;
    const binPath = path.join(__dirname, "bin", "api_handler");
    const args = [url]

    try {
        execFile(binPath, args, (error, stdout, stderr) => {
            throw stdout;
        });
    } catch (e) {
        return e
    }
}

export { execApiHandler }

