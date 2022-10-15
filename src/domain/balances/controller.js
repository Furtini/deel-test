const CreateService = require('./services/create')

let instance

class BalancesController {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async makeDeposit(req, res) {
    try {
      const { id } = req.params
      const { amount } = req.body

      const result = await CreateService.makeDeposit(id, amount)
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

module.exports = new BalancesController()
