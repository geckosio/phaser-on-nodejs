require('../lib/index.js')
const Phaser = require('phaser')

const FPS = 30
global.phaserOnNodeFPS = FPS

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
    constructor() {
      super('MainScene')
      this.logged = false
      this.player
    }

    create() {
      console.log('create')
      this.player = new Player(this, 100, 100)
    }

    update(time, delta) {
      if (!this.logged && this.player.y > 200) {
        this.logged = true
        console.log('player', this.player.y.toFixed())
        console.log('update')

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
      target: FPS,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1200 },
      },
    },
  }

  new Phaser.Game(config)
})
