
import { base64image } from "./src/api";
import app from "./src/server";
import dotenv from "dotenv";
dotenv.config();
var isBase64 = require("is-base64");

app.post("/upload", async (req, res) => {
  const { image, costumer_code, measure_datetime, measure_type } = req.body;
  if (image && measure_type && measure_datetime && costumer_code) {
    // Base64 Verification
    if (isBase64(image, { mimeRequired: true })) {
      try {
       const data = await base64image(image);
        res.status(200).json(data);
      } catch {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description:
              "Ocorreu um erro ao tentar Acessar a API",
          });
      }
    } else {
      res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
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
