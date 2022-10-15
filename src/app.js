const express = require('express')
const bodyParser = require('body-parser')

const { sequelize } = require('./models')
const contractRoutes = require('./domain/contracts/routes')
const jobRoutes = require('./domain/jobs/routes')

const app = express()
app.use(bodyParser.json())
app.set('sequelize', sequelize)

app.use('/contracts', contractRoutes)
app.use('/jobs', jobRoutes)

module.exports = app
