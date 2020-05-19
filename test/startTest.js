const StartGame = MainScene => {
  const config = {
    type: Phaser.HEADLESS,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    scene: [MainScene],
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
