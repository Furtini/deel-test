const { Contract, Op } = require('../../../models')
const { buildProfileFilter } = require('../../../helpers/queryBuilder')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async bestProfession(start, end) {
    // List all paid jobs in the interval
    // Group by contractor professions
    // Return largest one

    const contract = await Contract.findOne(query)
    return contract
  }
}

module.exports = new ReadService()
