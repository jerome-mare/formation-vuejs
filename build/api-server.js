// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const data = require(path.join(__dirname, '../api/db.json'))
const router = jsonServer.router(data)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
