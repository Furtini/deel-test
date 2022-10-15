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
      res.status(404).end()
    }
  }
}

module.exports = new BalancesController()
