const express = require('express');
const pool = require('../db'); 

const router = express.Router();

router.post('/shortUrl', (req, res) => {
    const url = req.body.url;
    const uuid = Math.random().toString(32).slice(5);
    const url_short = `http://13.60.37.72:5134/${uuid}`
    const sql = `INSERT INTO url (url_long, url_short) VALUES (?, ?)`;
    pool.query(sql, [url, url_short]).then((response) => {
        console.log("connection created : "+response);
        res.status(200).json({name : url_short});
    }).catch((err) => {
        res.status(500).json({name : "internal server Error"});
    });
});
  
router.get('/longUrl', async (req, res) => {    
    const shortUrl = req.query.surl;
    getLongUrl(shortUrl).then(longUrl => {
        console.log('Long URL:', longUrl);
        res.status(200).json({name : longUrl })
    })
    .catch(error => {
        console.error('Error:', error.message);
        res.status(500).json({name : "internal server Error : "+error.message});
    });
})


async function getLongUrl(shortUrl) {
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT url_long FROM url WHERE url_short = ?';
        const [rows, fields] = await connection.execute(sql, [shortUrl]);
        console.log("row : "+JSON.stringify(rows,2)+" : "+rows[0].url_long);
        if (rows.length > 0) {
            return rows[0].url_long;
        } else {
            throw new Error('Short URL not found');
        }
    } catch (error) {
      throw error;
    }
}

module.exports = {
    router : router,
    getLongUrl : getLongUrl
}