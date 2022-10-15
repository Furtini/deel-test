const ReadService = require('./services/read')
const CreateService = require('./services/create')

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
      console.error(err)
      if (err.message.includes('not found')) {
        res.status(404).send(err.message).end()
      }

      res.status(400).send(err.message).end()
    }
  }

  async payOne(req, res) {
    try {
      const { job_id } = req.params
      // ? A job can be paid by othe client?
      const { profile } = req

      const result = await CreateService.payOne(job_id, profile)

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

module.exports = new JobsController()
