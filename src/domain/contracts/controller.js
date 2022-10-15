const ReadService = require('./services/read')

let instance

class ContractsController {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async showById(req, res) {
    try {
      const { id } = req.params
      const { profile } = req

      const result = await ReadService.showById(id, profile)

      res.json(result)
    } catch (err) {
      // TODO: Erro handler
      console.error(err)
      res.status(404).end()
    }
  }

  async listActive(req, res) {
    try {
      const { profile } = req

      const result = await ReadService.listActive(profile)

      res.json(result)
    } catch (err) {
      // TODO: Erro handler
      console.error(err)
      res.status(404).end()
    }
  }
}

module.exports = new ContractsController()
