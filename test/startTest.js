const StartGame = Scenes => {
  const config = {
    type: Phaser.HEADLESS,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    scene: Scenes,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
      },
    },
  }

  new Phaser.Game(config)
}

module.exports = StartGame
