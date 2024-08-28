require('dotenv').config(); 
import {GoogleAIFileManager} from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(String(API_KEY));
const model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});
// leitura de dados
async function generateText(img: string) {
    const fileImg = new GoogleAIFileManager(String(API_KEY));
    const uploadResponse = await fileImg.uploadFile("./uploads/Lista-compras.jpeg", {
        mimeType: "image/jpeg",
        displayName: "Lista de Compras"
    });
     console.log(uploadResponse.file.displayName);
     console.log(uploadResponse.file.state)
     console.log(uploadResponse.file.uri);

     const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri
          }
        },
        { text: "Describe how this product might be manufactured." },
      ]);
      console.log(result.response.text());

}
export {generateText};
