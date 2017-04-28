<template>
    <div class="gmapv">
      <div id="map"></div>
    </div>
</template>

<script>
import { GfiMapViewer, GfiMapViewerCommonLayer, GfiMapViewerBackgroundLayer, GfiMapViewerDataLayer, GfiMapViewerDrawing, GfiMapViewerGbi, GfiMapViewerTooltips } from 'gs-gmapv'

const Settings = {
  map: {
    internProj: 'EPSG:3857', // Projection interne NE PAS MODIFIER
    defaultCenter: [261396.32787541073, 6244661.6511626225], // Centre de la carte au lancement
    defaultZoom: 5 // Zoom par défaut au lancement
  }
}

export default {
  name: 'gmapv',
  mounted () {
    let defaultCenter = Settings.map.defaultCenter
    let defaultZoom = Settings.map.defaultZoom
    let gv = (new GfiMapViewer({
      mapdiv: 'map', // Id du div contenant la carte
      projection: Settings.map.internProj, // Système de projection du viewer
      defaultCenter,
      defaultZoom
    }))
    .use(GfiMapViewerCommonLayer({}))
    .use(GfiMapViewerBackgroundLayer({}))
    .use(GfiMapViewerDataLayer({}))
    .use(GfiMapViewerDrawing({}))
    .use(GfiMapViewerTooltips({}))
    .use(GfiMapViewerGbi({}))
    this.gv = gv
    this.gv.backgroundLayer.addBackgroundLayer(
      'basemap',
      'osm',
      {})
  }
}
</script>

<style lang="stylus">
// Import Openlayers default style
@import '~gs-gmapv/lib/ol.css'

#map
  height: 100%

.gmapv
  height: 100%

.ol-control
  label
    display: block
    margin: 1px
    padding: 0
    color: #fff
    text-decoration: none
    text-align: center
    height: 2em
    width: 2em
    line-height: 2em
    background-color: rgba(240,127,10,.3)
    border: none
    border-radius: 2px
  button
  button:focus
    background-color: #303F48
  button:hover
    background-color: #F07F0A

  label.active
    background-color: rgba(240,127,10,.7)

.ol-touch .ol-attribution
  button
    font-size: 1.2em
    background-color: rgba(240,127,10,.3)

.rotate-custom
  top: 0.5em
  right: 2.5em

.ol-touch .rotate-custom
  top: 0.8em

.ol-scale-line
  background-color: rgba(48,63,72,.3)

.ol-zoom
  left: unset
  right: 4px

</style>
