import { SchoolLookup } from '../utils'
import { AMI_ASSAF_SYMBOL } from '../utils/sample-constants'
import axios from 'axios'

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Tests the school lookup class', () => {
  it('Searches for a single, existing school', async () => {
    const amiAssafLookup = await SchoolLookup.buildFromQuery(AMI_ASSAF_SYMBOL)
    const [amiAssafResult] = amiAssafLookup.results
    expect(amiAssafResult.symbol).toEqual(Number(AMI_ASSAF_SYMBOL))
  })

  it('Searches a school not existing', async () => {
    const invalidLookup = await SchoolLookup.buildFromQuery(
      '123456789012345678901234567890'
    )
    expect(invalidLookup.results.length).toBe(0)
  })
})
