const ReadService = require('./services/read')

let instance

class JobsController {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async listUnpaid(req, res) {
    try {
      const { profile } = req

      const result = await ReadService.listUnpaid(profile)

      res.json(result)
    } catch (err) {
      // TODO: Erro handler
      console.error(err)
      res.status(404).end()
    }
  }
}

module.exports = new JobsController()
