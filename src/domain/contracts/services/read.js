const { Contract, Op } = require('../../../models')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async showById(contractId, profile) {
    const profileColumn = getProfileTypeColumn(profile)

    const query = {
      where: {
        ['id']: contractId,
        [profileColumn]: profile.id
      }
    }

    const contract = await Contract.findOne(query)

    // TODO: Build error classes
    if (!contract) {
      throw new Error('Contract not found')
    }

    return contract
  }

  async listActive(profile) {
    const profileColumn = getProfileTypeColumn(profile)

    const query = {
      where: {
        [Op.and]: [
          { [profileColumn]: profile.id },
          { [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }
        ]
      }
    }

    const contract = await Contract.findAll(query)
    return contract
  }
}

/**
 * Returns the column name according to the profile type
 * @param {object} profile
 * @returns 'ClientId' | 'ContractorId'
 */
const getProfileTypeColumn = (profile) => {
  const { type } = profile
  return type === 'client' ? 'ClientId' : 'ContractorId'
}

module.exports = new ReadService()
