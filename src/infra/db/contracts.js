const { Contract, Op } = require('../../models')
const { buildProfileFilter } = require('./helpers/queryBuilder')

let instance

class ContractRepository {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this
  }

  async findById(id, profile) {
    const query = {
      where: {
        ['id']: id
      }
    }

    if (profile) {
      const profileFilter = buildProfileFilter(profile)
      query.where = { ...query.where, ...profileFilter }
    }

    const result = await Contract.findOne(query)
    return result
  }

  async listNonTerminated(profile) {
    const query = {
      where: {
        [Op.and]: [{ [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }]
      }
    }

    if (profile) {
      const profileFilter = buildProfileFilter(profile)
      query.where[Op.and].push(profileFilter)
    }

    const result = await Contract.findAll(query)
    return result
  }
}

module.exports = new ContractRepository()
