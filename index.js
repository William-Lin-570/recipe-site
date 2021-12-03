const express = require('express')
const axios = require('axios')

var cors = require('cors')
var app = express()

app.use(cors())
const port = 3000 || process.env.PORT;

const apiKey = '636a1bbe30c1423fbc94c278e16834d7';

app.get('/gen-recipes', async (req, res) => {
    const ing = await axios.get('http://localhost:${port}' + apiKey + '&ingredients=' + req.query.ingredients + '&number=30');

    res.json(ing.data);
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})