require("dotenv").config();
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFileSync } from "fs";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(String(API_KEY));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const UUID = uuidv4();
// Data read
async function base64image(img: string, type:string) {
  const imgBuffer = Buffer.from(img, "base64");
  const tempImg = path.join(__dirname,`/tmp_img_${UUID}.jpg`);
  const nameImg = `Leitura - ${type} - ${UUID}.png`;
  writeFileSync(tempImg, imgBuffer);
  try {
    const fileImg = new GoogleAIFileManager(String(API_KEY));
    const uploadResponse = await fileImg.uploadFile(tempImg, {
      mimeType: "image/jpeg",
      displayName: nameImg,
    });
    // Result generation API
    console.log(img.toString);
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "Leia esta Imagem e me de a numeração da Leitura" },
    ]);
    console.log(result.response.text());
  } catch (error) {

    throw new Error("Api Error : " + error);
  }
}
export { base64image };
