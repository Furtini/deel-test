const ReadService = require('./services/read')

let instance

class ContractsController {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const { profile } = req

      const result = await ReadService.show(id, profile)

      res.json(result)
    } catch (err) {
      // TODO: Erro handler
      res.status(404).end()
    }
  }
}

module.exports = new ContractsController()
