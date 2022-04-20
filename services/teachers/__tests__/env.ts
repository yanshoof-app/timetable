import http from 'http'

describe('Tests the jest environment', () => {
  it('Tests environment variables', () => {
    expect(process.env.BASE_URL).toBeDefined()
    expect(process.env.TOKEN).toBeDefined()
    expect(process.env.PORT).toBeDefined()
  })
})
