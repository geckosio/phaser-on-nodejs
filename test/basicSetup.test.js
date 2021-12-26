require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')

it('should render at 30 fps (+-5 fps)', done => {
  // set the fps you need
  const FPS = 30
  global.phaserOnNodeFPS = FPS

  class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene')
    }
    create() {
      done()
    }
  }

  // prepare the config for Phaser
  const config = {
    type: Phaser.HEADLESS,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    scene: [MainScene],
    fps: {
      target: FPS
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 }
      }
    }
  }

  new Phaser.Game(config)
})
