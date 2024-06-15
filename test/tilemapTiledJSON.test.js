require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const StartTest = require('./startTest')

/**
 * From the example:
 * https://phaser.io/examples/v3/view/game-objects/tilemap/collision/simple-map
 */
it('player should collide with the tile map', done => {
  class MainScene extends Phaser.Scene {
    preload() {
      this.load.image('tiles', './assets/gridtiles.png')
      this.load.tilemapTiledJSON('map', './assets/simple-map.json')
    }

    create() {
      const map = this.make.tilemap({
        key: 'map',
        tileWidth: 32,
        tileHeight: 32
      })
      const tileset = map.addTilesetImage('tiles')
      const layer = map.createLayer('Level1', tileset)

      map.setCollision([20, 48])

      this.player = this.physics.add.sprite(96, 96, '')
      this.player.body.setSize(24, 38)

      this.physics.add.collider(this.player, layer)
    }

    update() {
      if (this.player.body.onFloor()) {
        done()
      }
    }
  }

  StartTest([MainScene])
})
