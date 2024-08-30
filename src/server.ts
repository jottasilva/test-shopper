import express, {Request, Response, NextFunction }  from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const corsOptions = {
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: '222250mb' }));
app.use(express.json({ limit: '222250mb' }));
app.use(express.urlencoded({ limit: '222250mb', extended: true }));
const PORT = parseInt(`${process.env.SV_PORT || 3000}`);
app.listen(PORT, () => {
    console.log("Server is Running, Port " + PORT);
  });
export default app;