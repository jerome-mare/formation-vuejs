import * as types from '@/store/mutation-types'
import module from '@/store/modules/params'
import { testAction } from '../helper'

describe('Params store module', () => {
  describe('Mutations', () => {
    it('CLEAR_PARAMS', () => {
      const state = {}
      module.mutations[types.CLEAR_PARAMS](state)
    })

    it('SET_PARAMS', () => {
      const state = {}
      const params = {
        map: 'map',
        baseMap: 'baseMap'
      }

      module.mutations[types.SET_PARAMS](state, params)

      expect(state).have.property('map')
      expect(state).have.property('baseMap')
      expect(state.map).equal('map')
      expect(state.baseMap).equal('baseMap')
    })
  })

  describe('Actions', () => {
    it('should be all defined', () => {
      expect(module.actions.initParams).to.be.a('function', 'Action initParams not defined')
    })

    it('initParams functions', (done) => {
      testAction(module.actions.initParams, [ 'myBaseMap' ], { /* State */ }, [
        { type: 'CLEAR_PARAMS' },
        { type: 'SET_PARAMS', payload: 'myBaseMap' }
      ], done)
    })
  })
})
