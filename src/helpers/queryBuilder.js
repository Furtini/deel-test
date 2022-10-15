const buildProfileFilter = (profile) => {
  const { type } = profile
  const column = type === 'client' ? 'ClientId' : 'ContractorId'
  return { [column]: profile.id }
}

module.exports = {
  buildProfileFilter
}
