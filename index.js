const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.nytimes.com/'
// My only regret is that cheerio resembles jQuery. I'm not a fan of jQuery.
app.get('/', (req, res) => {
  axios(url)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const articles = []
      // Iterate through each article, and push the data to the articles array.
      $('.indicate-hover', html).each(function() {
        const title = $(this).text()
        const url = $(this).closest('a').attr('href')
        articles.push({
          title,
          url
        })
      })
      res.json(articles)
    }).catch(error => console.log(error + ', unable to retrieve data'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))