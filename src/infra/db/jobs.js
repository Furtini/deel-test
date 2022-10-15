const { Contract, Job, Profile, Op } = require('../../models')
const { buildProfileFilter } = require('./helpers/queryBuilder')

let instance

class JobRepository {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this
  }

  async listUnpaid(profile) {
    const query = {
      where: {
        [Op.or]: [{ paid: false }, { paid: null }]
      },
      include: {
        model: Contract,
        where: {
          [Op.and]: [{ ['status']: 'in_progress' }] // active contracts
        }
      }
    }

    if (profile) {
      const profileFilter = buildProfileFilter(profile)
      query.include.where[Op.and].push(profileFilter)
    }

    const results = await Job.findAll(query)
    return results
  }

  /**
   * @param {Date} start
   * @param {Date} end
   * @param {'contractors' | 'clients'} profile
   * @returns
   */
  async listPaidBeetweenDates(start, end, profile) {
    const query = {
      where: {
        paid: true,
        paymentDate: {
          [Op.gt]: new Date(start).toUTCString(),
          [Op.lt]: new Date(end).toUTCString()
        }
      }
    }

    if (profile === 'contractors') {
      query.include = {
        model: Contract,
        include: { model: Profile, as: 'Contractor' }
      }
    }

    if (profile === 'clients') {
      query.include = {
        model: Contract,
        include: { model: Profile, as: 'Client' }
      }
    }

    const jobs = await Job.findAll(query)
    return jobs
  }
}

module.exports = new JobRepository()
