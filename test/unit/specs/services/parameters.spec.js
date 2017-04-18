import parameters from '@/services/parameters'
import superagent from 'superagent'

describe('Parameters service', () => {
  it('should be defined', () => {
    expect(parameters.getParameters).to.exist
    expect(parameters.selectUserParameters).to.exist
  })

  describe('SelectUserParameters', () => {
    it('should interpret the user parameter selected from url', () => {
      let location = {
        search: '?p=test',
        hash: '#'
      }
      let user = parameters.selectUserParameters(location)
      expect(user).equal('test')
      location = {
        search: '',
        hash: '#/p=test'
      }
      user = parameters.selectUserParameters(location)
      expect(user).equal('test')
      location = {
        search: '?param=test',
        hash: '#/test'
      }
      user = parameters.selectUserParameters(location)
      expect(user).equal('user')
    })

    it('should interpret the location global object if no parameter is pass', () => {
      let user = parameters.selectUserParameters()
      expect(user).equal('user')
    })
  })

  describe('getParameters', () => {
    let getRequest

    before(() => {
      getRequest = sinon.stub(superagent, 'get')
    })

    afterEach(() => {
      getRequest.restore()
      getRequest = sinon.stub(superagent, 'get')
    })

    // clean up your sinon spys/stubs/mocks
    after(() => {
      getRequest.restore()
    })

    it('should merge both params into one', (done) => {
      getRequest.onCall(0).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16
          spatializer:
            - type: GMAPV
              name: OSM
              field: Adresse`
      }))

      getRequest.onCall(1).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16
          spatializer:
            - type: GMAPV
              name: OSM
              field: Adresse`
      }))
      parameters.getParameters().then((params) => {
        expect(params).to.be.an('object')
        expect(params).to.have.all.keys('map', 'spatializer')
      }).then(done, done)
    })

    it('should manage user params without data', (done) => {
      getRequest.onCall(0).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16
          spatializer:
            - type: GMAPV
              name: OSM
              field: Adresse`
      }))

      getRequest.onCall(1).returns(Promise.resolve({
        ok: true,
        text: `---`
      }))
      parameters.getParameters().then((params) => {
        expect(params).to.be.an('object')
        expect(params).to.have.all.keys('map', 'spatializer')
      }).then(done, done)
    })

    it('should manage ajax request error', (done) => {
      getRequest.onCall(0).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16`
      }))

      getRequest.onCall(1).throws('HTTP 402 Error')
      parameters.getParameters().then((params) => {

      }).catch((error) => {
        expect(error).to.contain('HTTP 402 Error')
      }).then(done, done)
    })

    it('should manage user params without map.defaultCenter', (done) => {
      getRequest.onCall(0).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16`
      }))

      getRequest.onCall(1).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Zoom au lancement
            defaultZoom: 16`
      }))
      parameters.getParameters().then((params) => {
        expect(params).to.be.an('object')
        expect(params).to.have.all.keys('map')
      }).then(done, done)
    })

    it('should manage user params without map.defaultZoom', (done) => {
      getRequest.onCall(0).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]
            # Zoom au lancement
            defaultZoom: 16`
      }))

      getRequest.onCall(1).returns(Promise.resolve({
        ok: true,
        text: `---
          map:
            # Centre de la carte au lancement
            defaultCenter: [261396.32787541073, 6244661.6511626225]`
      }))
      parameters.getParameters().then((params) => {
        expect(params).to.be.an('object')
        expect(params).to.have.all.keys('map')
      }).then(done, done)
    })
  })
})
