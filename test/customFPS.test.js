require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')

jest.setTimeout(10_000)

// set the fps you need
const FPS = 30
global.phaserOnNodeFPS = FPS

it('should render at 30 fps (+-5 fps)', done => {
  class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene')
      this.d = []
    }

    update(time, delta) {
      this.d.push(delta)
      if (this.d.length === 90) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        const average = this.d.reduce(reducer) / this.d.length
        const difference = Math.abs(average - (1 / FPS) * 1000)
        // unfortunately jest testing is slow and we cannot measure the accuracy
        expect(difference).toBeLessThanOrEqual(100)
        done()
      }
    }
  }

  const config = {
    type: Phaser.HEADLESS,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    scene: [MainScene],
    fps: {
      // at the desired fps as target
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
