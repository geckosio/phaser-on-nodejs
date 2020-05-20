require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const StartTest = require('./startTest')

it('should multiply to 1536 (32*48)', done => {
  class MainScene extends Phaser.Scene {
    preload() {
      this.load.spritesheet('dude', '../assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48,
      })
    }

    create() {
      const dude = this.physics.add.sprite(100, 450, 'dude')
      expect(dude.body.width * dude.body.height).toBe(1536)
      done()
    }
  }

  StartTest(MainScene)
})
