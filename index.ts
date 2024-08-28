

import { generateText } from "./src/api";
import app from "./src/server";
import dotenv from 'dotenv';
dotenv.config();
const PORT = parseInt(`${process.env.SV_PORT || 3000}`);
const API_KEY = process.env.API_KEY;
// Uplad Image
app.get('/readimgxx',async (req, res) => {
    await generateText("Quem descobriu o brasil, e como foi ?");
});
// Confirm Image
app.patch('/confirmimg', (req, res) => {
    res.send("Confirm Image :D");
});
// Update Image
app.get('/listreads', (req, res) => {
    res.send("List all image Reads");
});
app.listen(PORT,()=> {
    console.log("Server is Running, Port "+PORT);
})