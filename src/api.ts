require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "genini-1.5-flash" });
// leitura de dados
async function generateText(prompt: string) {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); 
        console.log(text);
    } catch (error) {
        console.error("Erro ao tentar Ler Imagem:", error);
    }

}
export {generateText};
