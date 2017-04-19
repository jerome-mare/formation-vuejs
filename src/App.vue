<template>
  <div id="q-app">
    <q-layout>
      <q-tabs slot="navigation">
        <q-tab name="tab-about" icon="home" route="/about" exact replace>About</q-tab>
        <q-tab name="tab-operations" icon="work" route="/operations" replace>Interventions</q-tab>
      </q-tabs>
    </q-layout>
    <router-view class="layout-view"></router-view>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions } from 'vuex'
import * as actionTypes from '@/store/action-types'
import EventBus from '@/services/event-bus'

export default {
  name: 'q-app',
  store: store,
  props: ['params'],
  data () {
    return {
      appVersion: APP.version,
      appName: APP.name
    }
  },
  methods: {
    ...mapActions([
      actionTypes.initParams
    ])
  },
  created () {
    // Get parameters from root component
    let params = this.$root.$data
    // Load them into the store
    this.initParams(params)
    EventBus.$on('appLoaded', () => {
      // Close Splashscreen
      if (window && window.loading_screen) {
        // Wait a little to be sure that app rendering is done
        setTimeout(() => { window.loading_screen.finish() }, 1000)
      }
    })
  },
  mounted () {
    // App has been loaded
    EventBus.$emit('appLoaded')
  }
}
</script>

<style lang="stylus">
#q-app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

body
  padding: 0
  margin: 0
  overflow: hidden

html, body
  height: 100%
  color: #303F48

.layout-view
  margin-top: 80px
  margin-left: 10px
  margin-right: 10px
</style>
