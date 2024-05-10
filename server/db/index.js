const mongoose = require("mongoose");
// Define mongoose schemas

  
const urlSchema = new mongoose.Schema({
    short_url : String,
    long_url : String,
});


const Url = mongoose.model('Url', urlSchema);
  
module.exports = {
    Url
}