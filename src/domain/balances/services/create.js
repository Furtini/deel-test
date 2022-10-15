const { Job, Contract, Profile, Op } = require('../../../models')

let instance

class CreateService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // TODO: improve validations
  async makeDeposit(clientId, amount) {
    const query = {
      include: {
        model: Contract,
        where: {
          [Op.and]: [
            { ['ClientId']: clientId },
            { [Op.or]: [{ ['status']: 'new' }, { ['status']: 'in_progress' }] }
          ]
        }
      }
    }

    const unpaidJobs = await Job.findAll(query)
    const totalToPay = unpaidJobs.reduce((sum, job) => (sum += job.price), 0)

    // no more then 25% of unpaid jobs
    const allowedPercentage = 0.25
    const maxAllowedToDeposit = Math.ceil(totalToPay * allowedPercentage)
    if (amount > maxAllowedToDeposit) {
      throw new Error('invalid amount to deposit')
    }

    const client = await Profile.findByPk(clientId)
    if (!client) {
      throw new Error('Client not found')
    }
    const currentBalance = client.balance
    const newBalance = currentBalance + amount

    await Profile.update({ balance: newBalance }, { where: { id: client.id } })
    const updatedClient = await Profile.findByPk(clientId)
    return updatedClient
  }
}

module.exports = new CreateService()
