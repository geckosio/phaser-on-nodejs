require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const StartTest = require('./startTest')

it('should render without errors', done => {
  class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      // pass empty string for the texture
      super(scene, x, y, '')

      scene.add.existing(this)
      scene.physics.add.existing(this)

      // set the width and height of the sprite as the body size
      this.body.setSize(32, 48)
    }
  }

  class MainScene extends Phaser.Scene {
    create() {
      this.player = new Player(this, 100, 100)
    }

    update(time, delta) {
      done()
    }
  }

  StartTest([MainScene])
})
