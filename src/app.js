const express = require('express')
const bodyParser = require('body-parser')

const { sequelize } = require('./models')

const contractRoutes = require('./domain/contracts/routes')
const jobRoutes = require('./domain/jobs/routes')
const balanceRoutes = require('./domain/balances/routes')
const adminRoutes = require('./domain/admin/routes')

const app = express()
app.use(bodyParser.json())
app.set('sequelize', sequelize)

app.use('/contracts', contractRoutes)
app.use('/jobs', jobRoutes)
app.use('/balances', balanceRoutes)
app.use('/admin', adminRoutes)

module.exports = app
