const { Profile } = require('../../models')

let instance

class ProfileRepository {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this
  }

  async findById(id) {
    const result = await Profile.findByPk(id)
    return result
  }

  async updateOneById(id, attributes) {
    const result = await Profile.update(attributes, { where: { id } })
    return result
  }
}

module.exports = new ProfileRepository()
