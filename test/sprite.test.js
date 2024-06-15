require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const StartTest = require('./startTest')

it('should multiply to 528 (24*22)', done => {
  class MainScene extends Phaser.Scene {
    preload() {
      this.load.image('star', './assets/star.png')
    }

    create() {
      const star = this.physics.add.sprite(400, 300, 'star')
      expect(star.body.width * star.body.height).toBe(528)
      done()
    }
  }

  StartTest([MainScene])
})
