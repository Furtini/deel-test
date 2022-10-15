const JobRepository = require('../../../infra/db/jobs')

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
    if (!start) start = new Date()
    if (!end) end = new Date()

    const jobs = await JobRepository.listPaidBeetweenDates(start, end, 'contractors')

    const totalPaidByProfession = calculateTotalPaidByProfession(jobs)
    const bestProfession = findBestPayingProfession(totalPaidByProfession)

    return bestProfession
  }

  async bestClients(start, end, limit) {
    if (!start) start = new Date()
    if (!end) end = new Date()

    const jobs = await JobRepository.listPaidBeetweenDates(start, end, 'clients')

    const totalPaidByClient = calculateTotalPaidByClients(jobs)

    const sorted = sortByPaidDesc(totalPaidByClient)

    const limitBy = limit || defaultLimit
    return sorted.slice(0, limitBy)
  }
}

const calculateTotalPaidByProfession = (jobs) => {
  return jobs.reduce((acc, job) => {
    const key = job.Contract.Contractor.profession

    if (!acc[key]) {
      acc[key] = 0
    }

    acc[key] += job.price
    return acc
  }, {})
}

const findBestPayingProfession = (totalPaidByProfession) => {
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

const calculateTotalPaidByClients = (jobs) => {
  const byClientId = jobs.reduce((acc, job) => {
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
  for (const key of Object.keys(byClientId)) {
    result.push(byClientId[key])
  }

  return result
}

const sortByPaidDesc = (values) => {
  return values.sort((a, b) => (a.paid > b.paid ? -1 : 1))
}

module.exports = new ReadService()
