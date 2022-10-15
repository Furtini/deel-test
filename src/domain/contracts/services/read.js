const { Contract } = require('../../../models')

let instance

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async show(contractId) {
    const contract = await Contract.findOne({ where: { id: contractId } })

    // TODO: Build error classes
    if (!contract) {
      throw new Error('Contract not found')
    }

    return contract
  }
}

module.exports = new ReadService()
