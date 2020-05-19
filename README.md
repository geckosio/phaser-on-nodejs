<h1 align="center">
  <br>
  <a href="https://github.com/yandeu/phaser3-multiplayer-with-physics#readme"><img src="readme/phaser-on-nodejs.png" alt="header" width="400"></a>
  <br>
  Phaser on Node.js
  <br>
</h1>

#### Allows you to run Phaser 3 games (including Phaser's physics engines) on Node.js.

[![Github Workflow](https://img.shields.io/github/workflow/status/geckosio/phaser-on-nodejs/CI/master?label=github%20build&logo=github&style=flat-square)](https://github.com/geckosio/phaser-on-nodejs/actions?query=workflow%3ACI)
[![David](https://img.shields.io/david/geckosio/phaser-on-nodejs.svg?style=flat-square)](https://david-dm.org/geckosio/phaser-on-nodejs)
[![npm](https://img.shields.io/npm/v/@geckos.io/phaser-on-nodejs.svg?style=flat-square)](https://www.npmjs.com/package/@geckos.io/phaser-on-nodejs)
[![NPM](https://img.shields.io/npm/l/@geckos.io/phaser-on-nodejs.svg?style=flat-square)](LICENSE)

## Install

```console
npm install @geckos.io/phaser-on-nodejs
```

## How to use

```js
require('@geckos.io/phaser-on-nodejs')
// or with es6
import '@geckos.io/phaser-on-nodejs'
```

## Examples

- [Phaser 3 - Multiplayer game example with geckos.io](https://github.com/geckosio/phaser3-multiplayer-game-example#readme)
- [Phaser 3 - Multiplayer game with physics](https://github.com/yandeu/phaser3-multiplayer-with-physics#readme)

## Limitations and differences

- You can't have multiple scenes on the server. But this is usually not required anyways. If you want to use multiple scene, just spin up multiple Phaser instances.
- Use Phaser in headless mode on the server `{ type: Phaser.HEADLESS }`:

```js
// set the fps you need
const FPS = 30
global.phaserOnNodeFPS = FPS

// prepare the config for Phaser
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
```

- Since you do not (and can't) load any assets on the server, Phaser does not know the size of you images. You have to add it manually like so:

```js
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
```

## Compatible Phaser versions

For now, it has not been tested with Phaser 2, but it works well with Phaser 3.
