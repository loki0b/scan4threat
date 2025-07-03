import express, { Request, Response } from "express";
import { execFile } from "child_process";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;
const host = "127.0.0.1"
const __dirname = import.meta.dirname;

const binPath = path.join(__dirname, "bin", "api_handler");
const args = ["google.com"]

execFile(binPath, args, (error, stdout, stderr) => {
    console.log(stdout);
});

app.use(express.json());
app.post("/", (req: Request, res: Response) => {
    console.log(req.body); // receive json, process and send to front
});

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});