require('../lib/index.js')
require('./globalMock')
const Phaser = require('phaser')
const http = require('http')

// remove fakeXMLHttpRequest
const tmp = XMLHttpRequest
XMLHttpRequest = undefined
// init axios
const axios = require('axios').default
// restore fakeXMLHttpRequest
XMLHttpRequest = tmp

let server
const PORT = Math.floor(Math.random() * 50000 + 5000)

beforeAll(done => {
  const requestListener = function (req, res) {
    if (req.url === '/hello') return res.writeHead(200).end('Hello!')
    else return res.writeHead(404).end()
  }
  server = http.createServer(requestListener)
  server.listen(PORT, () => {
    done()
  })
})

it('should be able to use axios', done => {
  class MainScene extends Phaser.Scene {
    preload() {
      // load image (only possible of FakeXMLHttpRequest is available)
      this.load.image('star', '../assets/star.png')
    }
    create() {
      axios({ method: 'get', url: `http://localhost:${PORT}/hello` })
        .then(res => {
          expect(res.data).toBe('Hello!')
          done()
        })
        .catch(err => {
          console.log(err.message)
        })
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
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 }
      }
    }
  }

  new Phaser.Game(config)
})

afterAll(done => {
  server.close(() => {
    done()
  })
})
