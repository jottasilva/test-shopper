import express, {Request, Response, NextFunction }  from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '1210mb' }));
app.use(express.json({ limit: '1250mb' }));
app.use(express.urlencoded({ limit: '1250mb', extended: true }));
const PORT = parseInt(`${process.env.SV_PORT || 3000}`);
app.listen(PORT, () => {
    console.log("Server is Running, Port " + PORT);
  });
export default app;