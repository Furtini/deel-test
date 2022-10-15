const { Job, Contract, Profile, sequelize } = require('../../../models')

let instance

class CreateService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // TODO: organize code
  async payOne(id) {
    const job = await Job.findByPk(id, { include: Contract })
    if (!job) {
      throw new Error('Job not found')
    }

    if (job.paid) {
      throw new Error('Job already paid')
    }

    const client = await Profile.findByPk(job.Contract.ClientId)
    if (!client) {
      throw new Error('Client not found')
    }

    const contractor = await Profile.findByPk(job.Contract.ContractorId)
    if (!contractor) {
      throw new Error('Contractor not found')
    }

    const clientBalance = client.balance
    const jobPrice = job.price

    if (clientBalance < jobPrice) {
      throw new Error('Client do not have enought balance')
    }

    const newClientBalance = clientBalance - jobPrice
    const newContractorBalance = contractor.balance + jobPrice

    const transaction = await sequelize.transaction()
    try {
      await Profile.update({ balance: newClientBalance }, { where: { id: client.id }, transaction })
      await Profile.update(
        { balance: newContractorBalance },
        { where: { id: contractor.id }, transaction }
      )
      await Job.update(
        { paid: true, paymentDate: new Date() },
        { where: { id: job.id }, transaction }
      )

      await transaction.commit()

      const updatedJob = await Job.findByPk(job.id)
      return updatedJob
    } catch (err) {
      await transaction.rollback()

      throw new Error('Error while paying job')
    }
  }
}

module.exports = new CreateService()
