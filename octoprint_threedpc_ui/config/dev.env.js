'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '"localhost"',
  PORT: 8080,
  APP_SCRIPT_URL: '"http://" + process.env.HOST + ":" + process.env.PORT + "/app.js"'
})
