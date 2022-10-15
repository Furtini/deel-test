const JobRepository = require('../../../infra/db/jobs')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async listUnpaid(profile) {
    const jobs = await JobRepository.listUnpaid(profile)
    return jobs
  }
}

module.exports = new ReadService()
