const { Job, Contract, Op } = require('../../../models')
const { buildProfileFilter } = require('../../../helpers/queryBuilder')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async listUnpaid(profile) {
    const profileFilter = buildProfileFilter(profile)

    const query = {
      include: {
        model: Contract,
        where: {
          [Op.and]: [
            { ...profileFilter },
            { [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }
          ]
        }
      }
    }

    const jobs = await Job.findAll(query)
    return jobs
  }
}

module.exports = new ReadService()
