const mongoose = require("mongoose");
const express = require('express');
const {Url} = require('../db')

const router = express.Router();


router.post('/shortUrl', (req, res) => {
    const url = req.body.url;
    const uuid = Math.random().toString(32).slice(5);
    const url_short = `http://rohanDev.com/${uuid}`
    const newUrl = new Url({ short_url: url_short , long_url: url})
    newUrl.save();
    console.log("saved");
    console.log(newUrl);
    res.status(200).json({name : url_short});
});
  
router.get('/longUrl', async (req, res) => {    
    await Url.findOne({short_url : req.query.surl}).then((longUrl) =>{
        if(longUrl){
            res.status(200).json({name : longUrl.long_url})
        }else{
            res.json({name : "no data found"}) 
        }
    }).catch(err => {
        console.error('An error occurred:', err);
    res.status(500).json({ error: 'An internal server error occurred' });
    })
})

module.exports = router