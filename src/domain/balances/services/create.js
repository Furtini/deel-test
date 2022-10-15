const JobRepository = require('../../../infra/db/jobs')
const ProfileRepository = require('../../../infra/db/profiles')

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
    const unpaidJobs = await JobRepository.listUnpaid()
    if (!unpaidJobs) {
      throw new Error('No active jobs found')
    }

    const totalToPay = unpaidJobs.reduce((sum, job) => (sum += job.price), 0)

    // no more then 25% of unpaid jobs
    const allowedPercentage = 0.25
    const maxAllowedToDeposit = Math.ceil(totalToPay * allowedPercentage)
    if (amount > maxAllowedToDeposit) {
      throw new Error('invalid amount to deposit')
    }

    const client = await ProfileRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    const currentBalance = client.balance
    const newBalance = currentBalance + amount

    const attributes = { balance: newBalance }
    await ProfileRepository.updateOneById(client.id, attributes)
    const updatedClient = await ProfileRepository.findById(clientId)
    return updatedClient
  }
}

module.exports = new CreateService()
