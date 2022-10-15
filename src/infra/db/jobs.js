const { Contract, Job, Op } = require('../../models')
const { buildProfileFilter } = require('../../helpers/queryBuilder')

let instance

class JobRepository {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this
  }

  async listUnpaid(profile) {
    const query = {
      where: {
        [Op.or]: [{ paid: false }, { paid: null }]
      },
      include: {
        model: Contract,
        where: {
          [Op.and]: [{ [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }]
        }
      }
    }

    if (profile) {
      const profileFilter = buildProfileFilter(profile)
      query.include.where[Op.and].push(profileFilter)
    }

    const results = await Job.findAll(query)
    return results
  }
}

module.exports = new JobRepository()
