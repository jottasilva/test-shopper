
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
app.get("/:costumer_code/list", (req, res) => {
  const code = req.params.costumer_code;
  res.send(code);
});
