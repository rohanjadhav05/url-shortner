const express = require('express');
const cors = require('cors');
const { router, getLongUrl } = require('./routes/route');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get('/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid;
        const shortUrl = `http://13.60.37.72:5134/${uuid}`;
        const longUrl = await getLongUrl(shortUrl);
        console.log("Long Url : " + longUrl);
        res.redirect(longUrl);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ name: "Internal Server Error: " + error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
