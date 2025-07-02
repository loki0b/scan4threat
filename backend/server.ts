import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8000;
const host = "127.0.0.1"

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});