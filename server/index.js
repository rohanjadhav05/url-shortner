const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://ronneyjadhav1:root@firstcuster.cjsmzkd.mongodb.net/?retryWrites=true&w=majority&appName=firstCuster', { dbName: "url_shortner" });

app.listen(3000, () => console.log('Server running on port 3000'));