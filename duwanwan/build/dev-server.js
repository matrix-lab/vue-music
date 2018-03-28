var axios = request('axios')

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fag'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      authority: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).cath((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
