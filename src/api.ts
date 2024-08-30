require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(String(API_KEY));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const UUID = uuidv4();

async function base64image(imgbase64: string) {
  try {
    const base64Data = imgbase64.replace(/^data:image\/(jpeg|jpg|png|gif);base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');
    const tempFilePath = path.join(__dirname, `./uploads/${UUID}.jpeg`);
    await sharp(imgBuffer).resize({ width: 600 }).jpeg({ quality: 80 }).toFile(tempFilePath);
    const processedImgBuffer = fs.readFileSync(tempFilePath);
    const processedBase64Data = processedImgBuffer.toString("base64");

    const result = await model.generateContent([
      "What is the reading number of this meter, please return numbers only",
      {
        inlineData: {
          data: processedBase64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);
    const measure_value = result.response.text().replace(/\D/g, "");
    return {
      costumer_code: 1,
      image: tempFilePath,
      measure_value: measure_value,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

export { base64image };
