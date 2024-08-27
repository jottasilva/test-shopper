import { request, response } from "express";
import app from "./src/server";
import dotenv from 'dotenv';
dotenv.config();
const PORT = parseInt(`${process.env.SV_PORT || 3000}`);
// Uplad Image
app.post('/readimgxx', (req, res) => {
    res.send("Hello World!");
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