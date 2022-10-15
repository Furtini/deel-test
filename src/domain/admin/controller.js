const ReadService = require('./services/read')

let instance

class AdminController {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async bestProfession(req, res) {
    try {
      const { start, end } = req.query

      const result = await ReadService.bestProfession(start, end)

      res.json(result)
    } catch (err) {
      console.error(err)
      if (err.message.includes('not found')) {
        res.status(404).send(err.message).end()
      }

      res.status(400).send(err.message).end()
    }
  }

  async bestClients(req, res) {
    try {
      const { start, end, limit } = req.query

      const result = await ReadService.bestClients(start, end, limit)

      res.json(result)
    } catch (err) {
      console.error(err)
      if (err.message.includes('not found')) {
        res.status(404).send(err.message).end()
      }

      res.status(400).send(err.message).end()
    }
  }
}

module.exports = new AdminController()
