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
      res.status(404).end()
    }
  }
}

module.exports = new AdminController()
