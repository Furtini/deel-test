const { Contract, Job, Profile, Op } = require('../../../models')

let instance

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
}

module.exports = new ReadService()
