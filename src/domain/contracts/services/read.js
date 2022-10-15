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

  async showById(contractId, profile) {
    if (!contractId) {
      throw new Error('Contract not found')
    }

    const query = buildShowByIdQuery(profile, contractId)

    const contract = await Contract.findOne(query)

    // TODO: Build error classes
    if (!contract) {
      throw new Error('Contract not found')
    }

    return contract
  }

  async listActive(profile) {
    const query = buildListActiveQuery(profile)

    const contract = await Contract.findAll(query)
    return contract
  }
}

const buildShowByIdQuery = (profile, id) => {
  const profileFilter = buildProfileFilter(profile)

  return {
    where: {
      ['id']: id,
      ...profileFilter
    }
  }
}

const buildListActiveQuery = (profile) => {
  const profileFilter = buildProfileFilter(profile)

  return {
    where: {
      [Op.and]: [
        { ...profileFilter },
        { [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }
      ]
    }
  }
}

module.exports = new ReadService()
