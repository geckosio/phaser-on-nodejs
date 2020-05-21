require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const StartTest = require('./startTest')

it('should load both scenes', done => {
  class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene')
    }
    create() {
      this.scene.start('MainScene')
    }
  }

  class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene')
    }
    create() {
      done()
    }
  }

  StartTest([PreloadScene, MainScene])
})
