const ReadService = require('./read')

const ContractRepository = require('../../../infra/db/contracts')

describe('#Contracts reader', () => {
  const findContractByIdSpy = jest.spyOn(ContractRepository, 'findById')

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Should throw: missing contract id', async () => {
    expect.hasAssertions()

    try {
      await ReadService.show(null, {})
    } catch (error) {
      expect(error).toHaveProperty('message', 'Contract not found')

      expect(findContractByIdSpy).toHaveBeenCalledTimes(0)
    }
  })

  it('Should throw: contract not found', async () => {
    const fakeContract = mockContract()

    findContractByIdSpy.mockReturnValueOnce(Promise.resolve(fakeContract))

    const result = await ReadService.show(1, {})

    expect(result).toHaveProperty('id', fakeContract.id)
    expect(result).toHaveProperty('terms', fakeContract.terms)
    expect(result).toHaveProperty('status', fakeContract.status)
    expect(result).toHaveProperty('ContractorId', fakeContract.ContractorId)
    expect(result).toHaveProperty('ClientId', fakeContract.ClientId)

    expect(findContractByIdSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return a contract', async () => {
    findContractByIdSpy.mockReturnValueOnce(Promise.resolve({}))
  })
})

const mockContract = () => {
  return {
    id: 1,
    terms: 'some term',
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
    ContractorId: 1,
    ClientId: 1
  }
}
