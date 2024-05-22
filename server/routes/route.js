const express = require('express');
const pool = require('../db'); 

const router = express.Router();

router.post('/shortUrl', (req, res) => {
    const url = req.body.url;
    const length = req.body.length;
    console.log(length);
    const uuid = Math.random().toString(32).slice(-length);
    console.log(uuid);
    const url_short = `http://3.109.108.180:3010/${uuid}`
    const sql = `INSERT INTO url (url_long, url_short) VALUES (?, ?)`;
    pool.query(sql, [url, url_short]).then((response) => {
        console.log("connection created : "+response);
        res.status(200).json({name : url_short});
    }).catch((err) => {
        res.status(500).json({name : "internal server Error : "+err});
    });
});
  
router.get('/longUrl', async (req, res) => {    
    const shortUrl = req.query.surl;
    const longUrl = await getLongUrl(shortUrl);
    if(longUrl == 'no data found'){
        console.log("in no data found");
        res.status(200).json({name : "no data found"})
    }else{
        console.log('Long URL:', longUrl);
        res.status(200).json({name : longUrl })
    }
})

router.get("/100Req", async(req,res) => {
    for(var i = 0; i < 100; i++){
        const uuid1 = Math.random().toString(32).slice(-20);
        const uuid2 = Math.random().toString(32).slice(-5);
        const longUrl = `http:/rohandev.com/${uuid1}`;
        const shortUrl = `http:/shortUrl.com/${uuid2}`;
        const sql = `INSERT INTO url (url_long, url_short) VALUES (?, ?)`;
        var count = 0;
        pool.query(sql, [longUrl, shortUrl]).then((response) => {
            console.log("createed : "+count++);
        }).catch((err) => {
            console.log("falied");
        });
    }
})
async function getLongUrl(shortUrl) {
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT url_long FROM url WHERE url_short = ?';
        const [rows, fields] = await connection.execute(sql, [shortUrl]);
        console.log("row : "+JSON.stringify(rows,2));
        if (rows.length > 0) {
            return rows[0].url_long;
        } else {
            return "no data found";
        }
    } catch (error) {
      throw error;
    }
}

module.exports = {
    router : router,
    getLongUrl : getLongUrl
}