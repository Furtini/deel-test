const { Profile } = require('../models')

const getProfile = async (req, res, next) => {
  const profileId = req.headers.profile_id
  if (!profileId) return res.status(401).end()

  const profile = await Profile.findOne({ where: { id: profileId } })
  if (!profile) return res.status(401).end()

  req.profile = profile

  next()
}

module.exports = { getProfile }
