const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (req, res) {
  let content = ''
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  })
  console.log(req.url)
  // console.log("URL--->",req.url)
  try {
    content = fs.readFileSync(path.join(__dirname, req.url))
  } catch (e) {
    content = ''
  }
  res.write(content)
  res.end()
}).listen(8080)

