import express from "express";
import userRouter from "../routes/user";
import scanRouter from "../routes/scan";
import analyses from "../routes/analyses";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use("/api/scan", scanRouter);
app.use("/api", userRouter);
app.use("/api/analyses", analyses);

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

export { app }
