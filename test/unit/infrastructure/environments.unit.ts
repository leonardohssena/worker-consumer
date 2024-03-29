import { setEnvironment } from 'infrastructure/environments'

describe('setEnvironment', () => {
  it('should return [".env.test", ".env"] when NODE_ENV is "test"', () => {
    process.env.NODE_ENV = 'test'
    expect(setEnvironment()).toEqual(['.env.test', '.env'])
  })

  it('should return [".env.stage", ".env"] when NODE_ENV is "stage"', () => {
    process.env.NODE_ENV = 'stage'
    expect(setEnvironment()).toEqual(['.env.stage', '.env'])
  })

  it('should return [".env.development", ".env"] when NODE_ENV is "development"', () => {
    process.env.NODE_ENV = 'development'
    expect(setEnvironment()).toEqual(['.env.development', '.env'])
  })

  it('should return ".env" when NODE_ENV is "production"', () => {
    process.env.NODE_ENV = 'production'
    expect(setEnvironment()).toBe('.env')
  })

  it('should return ".env" when NODE_ENV is not recognized', () => {
    process.env.NODE_ENV = 'unknown'
    expect(setEnvironment()).toBe('.env')
  })
})
