const express = require('express');
const pool = require('../db'); 

const router = express.Router();

/**
    1. longURL is the input.
    2. The system checks if the longURL is in the database.
    3. If it is, it means the longURL was converted to shortURL before. In this case, fetch the shortURL from the database and return it to the client.
    4. If not, the longURL is new. A new unique ID (TimeStamp) Is generated with the help of timestamp of system.
    5. Convert the ID to shortURL with base 62 conversion.
    6. Create a new database row with the ID, shortURL, and longURL.

    for a maximum value of 13 digit timestamp we can generate 9 trillion unique timestamp
    and each number can be converted in  Base-62 Encoding
 */
router.post('/shortUrl', async (req, res) => {
    const url = req.body.url;
    const id = generateUniqueId();
    const shortUrl = await getShortUrl(url);
    const decimalNumber = BigInt(id); 
    const uuid = toBase62(decimalNumber);

    console.log(uuid);
    if(shortUrl == 'no data found'){
        const url_short = `http://localhost:3010/${uuid}`
        const sql = `INSERT INTO url (url_long, url_short) VALUES (?, ?)`;
        pool.query(sql, [url, url_short]).then((response) => {
            console.log("connection created : "+response);
            res.status(200).json({name : url_short});
        }).catch((err) => {
            res.status(500).json({name : "internal server Error : "+err});
        });
    }else{
        console.log('Short URL:', shortUrl);
        res.status(200).json({name : shortUrl })
    }
    
});
  
function generateUniqueId() {
    return Date.now(); 
}

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

async function getShortUrl(shortUrl) {
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT url_short FROM url WHERE url_long = ?';
        const [rows, fields] = await connection.execute(sql, [shortUrl]);
        console.log("row : "+JSON.stringify(rows,2));
        if (rows.length > 0) {
            return rows[0].url_short;
        } else {
            return "no data found";
        }
    } catch (error) {
      throw error;
    }
}

/**
 * Converts a number to a Base-62 string.
 * @param {bigint} num - The number to convert.
 * @returns {string} Base-62 encoded string.
 */
function toBase62(num) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let base62 = '';

    while (num > 0) {
        const remainder = num % 62n;
        base62 = chars[Number(remainder)] + base62;
        num = num / 62n;
    }

    return base62 || '0';
}

module.exports = {
    router : router,
    getLongUrl : getLongUrl
}