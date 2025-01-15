<div align="center">

<a href="https://github.com/yandeu/phaser3-multiplayer-with-physics#readme">
<img src="readme/phaser-on-nodejs.png" alt="logo" width="400">
</a>

# Phaser on Node.js

### Allows you to run Phaser 3 games (including Phaser's physics engines) on Node.js.

[![Github Workflow](https://img.shields.io/github/actions/workflow/status/geckosio/phaser-on-nodejs/ubuntu.yaml?branch=master&label=github%20build&logo=github&style=flat-square)](https://github.com/geckosio/phaser-on-nodejs/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/@geckos.io/phaser-on-nodejs.svg?style=flat-square)](https://www.npmjs.com/package/@geckos.io/phaser-on-nodejs)
[![Downloads](https://img.shields.io/npm/dm/@geckos.io/phaser-on-nodejs.svg?style=flat-square)](https://www.npmjs.com/package/@geckos.io/phaser-on-nodejs)
[![NPM](https://img.shields.io/npm/l/@geckos.io/phaser-on-nodejs.svg?style=flat-square)](LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/geckosio/phaser-on-nodejs?logo=codecov&style=flat-square)](https://codecov.io/gh/geckosio/phaser-on-nodejs)

</div>

## Arcade Physics

⚠️ If your goal is to run the Arcade Physics on the server, I highly recommend using [`arcade-physics`](https://github.com/yandeu/arcade-physics#readme).

## Compatibility

Works with Phaser >=3.55.2.  
_Successfully tested with v3.87.0_

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

## Features

- Phaser Physics (Arcade and Matter)
- Load Images and SpriteSheets
- Load TileMaps
- Adjustable Frame Rate
- Allows to use Multiple Scenes

## Examples

- [Simple Phaser on Node.js example](https://github.com/geckosio/phaser-on-nodejs-example)
- [Phaser 3 - Multiplayer game example with geckos.io](https://github.com/geckosio/phaser3-multiplayer-game-example#readme)
- [Phaser 3 - Multiplayer game with physics](https://github.com/yandeu/phaser3-multiplayer-with-physics#readme)

## Basic Setup

Install and require `phaser` and `@geckos.io/phaser-on-nodejs`. Make sure you use Phaser in headless mode on the server `{ type: Phaser.HEADLESS }`

```js
require('@geckos.io/phaser-on-nodejs')
const Phaser = require('phaser')

// set the fps you need
const FPS = 30
global.phaserOnNodeFPS = FPS // default is 60

// your MainScene
class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }
  create() {
    console.log('it works!')
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

// start the game
new Phaser.Game(config)
```

## Loading Assets

You can load textures (images, spritesheets etc.) on the server.

```js
preload() {
  // use a relative path
  this.load.image('star', './assets/star.png')
}

create() {
  const star = this.physics.add.sprite(400, 300, 'star')
}
```

But to save some memory, I recommend the following approach instead:

```js
class Star extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    // pass empty string for the texture
    super(scene, x, y, '')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // set the width and height of the sprite as the body size
    this.body.setSize(24, 22)
  }
}
```

## Using node-fetch or axios?

If you are using **node-fetch**, you do not need to do anything.

If you are using **axios**, you have to make sure `XMLHttpRequest` will not break:  
`XMLHttpRequest` is only use in the browser. Phaser.js is a browsers framework which uses `XMLHttpRequest` so phaser-on-nodejs has to provide a mock implementation. Unfortunately, axios is a isomorphic framework. On initialization, axios checks if `XMLHttpRequest` is available and will think it is running in the browser. To make sure axios works on nodejs, we just have to hide `XMLHttpRequest` from axios during its initialization.
See the snipped below to make it work:

```js
// remove fakeXMLHttpRequest
const tmp = XMLHttpRequest
XMLHttpRequest = undefined
// init axios
const axios = require('axios').default
// restore fakeXMLHttpRequest
XMLHttpRequest = tmp
```
