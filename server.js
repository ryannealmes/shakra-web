const express = require('express')
const next = require('next')
const logger = require('./utils').logger

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('dotenv').config()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT, err => {
      if (err) throw err
      logger.info(
        `Ready on http://localhost:${process.env.PORT} - Environment ${
          process.env.NODE_ENV
        }`
      )
    })
  })
  .catch(ex => {
    logger.error(ex.stack)
    process.exit(1)
  })
