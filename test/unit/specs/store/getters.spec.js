import * as getters from '@/store/getters'

describe('Global getters', () => {
  it('should be return appInfos', () => {
    expect(getters.appInfos({ appInfos: 'appInfos' })).to.be.equal('appInfos')
  })
})
