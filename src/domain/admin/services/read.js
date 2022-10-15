const { Contract, Job, Profile, Op } = require('../../../models')

let instance

const defaultLimit = 2

class ReadService {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  async bestProfession(start, end) {
    // List all paid jobs in the interval
    const query = {
      where: {
        paid: true,
        paymentDate: {
          [Op.gt]: new Date(start).toUTCString(),
          [Op.lt]: new Date(end).toUTCString()
        }
      },
      include: {
        model: Contract,
        include: {
          model: Profile,
          as: 'Contractor'
        }
      }
    }
    const jobs = await Job.findAll(query)

    const totalPaidByProfession = jobs.reduce((acc, job) => {
      const key = job.Contract.Contractor.profession

      if (!acc[key]) {
        acc[key] = 0
      }

      acc[key] += job.price
      return acc
    }, {})

    const professions = Object.keys(totalPaidByProfession)
    let bestRevenue = totalPaidByProfession[professions[0]]
    let bestProfession = {}
    for (const key in totalPaidByProfession) {
      const revenue = totalPaidByProfession[key]
      if (revenue >= bestRevenue) {
        bestRevenue = revenue
        bestProfession[key] = revenue
      }
    }

    return bestProfession
  }

  async bestClients(start, end, limit) {
    // List all paid jobs in the interval
    const query = {
      where: {
        paid: true,
        paymentDate: {
          [Op.gt]: new Date(start).toUTCString(),
          [Op.lt]: new Date(end).toUTCString()
        }
      },
      include: {
        model: Contract,
        include: {
          model: Profile,
          as: 'Client'
        }
      }
    }

    const jobs = await Job.findAll(query)

    const totalPaidByClient = jobs.reduce((acc, job) => {
      const client = job.Contract.Client
      const key = client.id

      if (!acc[key]) {
        acc[key] = {
          id: key,
          fullName: '',
          paid: 0
        }
      }

      acc[key]['fullName'] = `${client.firstName} ${client.lastName}`
      acc[key]['paid'] += job.price

      return acc
    }, {})

    const result = []
    for (const key of Object.keys(totalPaidByClient)) {
      result.push(totalPaidByClient[key])
    }

    result.sort((a, b) => (a.paid > b.paid ? -1 : 1))

    const limitBy = limit || defaultLimit
    return result.slice(0, limitBy)
  }
}

module.exports = new ReadService()
