const { Contract, Op } = require('../../../models')
const { buildProfileFilter } = require('../../../helpers/queryBuilder')

const ContractRepository = require('../../../infra/db/contracts')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async show(contractId, profile) {
    if (!contractId) {
      throw new Error('Contract not found')
    }

    const contract = await ContractRepository.findById(contractId, profile)

    // TODO: Build error classes
    if (!contract) {
      throw new Error('Contract not found')
    }

    return contract
  }

  async listActive(profile) {
    const contract = await ContractRepository.listActive(profile)
    return contract
  }
}

module.exports = new ReadService()
