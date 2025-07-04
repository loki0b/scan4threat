import express from "express";
import router from "../routes/root";
import scanRouter from "../routes/scan";

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use('/api', router);
app.use('/scanUrl', scanRouter);

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

export { app }
