
import { getUserMeasures, Measure } from "./db/cruds";
import { base64image } from "./src/api";
import app from "./src/server";
import dotenv from "dotenv";
dotenv.config();
var isBase64 = require("is-base64");

app.post("/upload", async (req, res) => {
  const { image } = req.body;
  if (image) {
   
    if (isBase64(image, { mimeRequired: true })) {
      try {
       const data = await base64image(image);
        res.status(200).json(data);
      } catch (error: any){
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description:error.message,
          });
      }
    } 
  } else {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }
});
// Confirm Image
app.patch("/confirm", (req, res) => {
  res.send("Confirm Image :D");
});
// Update Image
app.get("/:costumer_code/list", async (req, res) => {
  try {
    res.json(await getUserMeasures());
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching measures' });
  }
});
app.get("/create", async (req, res) => {
  const {name} = req.body;
  res.json(await Measure(name));
});