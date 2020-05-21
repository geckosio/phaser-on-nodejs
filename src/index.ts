declare global {
  namespace NodeJS {
    interface Global {
      document: any
      window: any
      Image: any
      navigator: any
      XMLHttpRequest: any
      HTMLCanvasElement: any
      HTMLVideoElement: any
      requestAnimationFrame: any
      URL: any
      phaserOnNodeFPS: number
    }
  }
}

import Canvas from 'canvas'
import jsdom from 'jsdom'
import FakeXMLHttpRequest from './fakeXMLHttpRequest'

const { JSDOM } = jsdom
const dom = new JSDOM(`<!DOCTYPE html><body></body>`)

const document = dom.window.document
const window = dom.window
window.focus = () => {}

global.document = document
global.window = window
global.Image = Canvas.Image
global.window.Element = undefined
global.navigator = { userAgent: 'node' }
global.XMLHttpRequest = FakeXMLHttpRequest
global.HTMLCanvasElement = window.HTMLCanvasElement
global.HTMLVideoElement = window.HTMLVideoElement

global.URL = () => {}
global.URL.createObjectURL = (base64: any) => `data:image/png;base64,${base64}`
global.URL.revokeObjectURL = () => {}

// phaser on node variables
global.phaserOnNodeFPS = 60

const animationFrame = (cb: any) => {
  if (typeof cb !== 'function') return 0 // this line saves a lot of cpu
  window.setTimeout(() => cb(0), 1000 / global.phaserOnNodeFPS)
  return 0
}
export { animationFrame }

window.requestAnimationFrame = cb => {
  return animationFrame(cb)
}

const requestAnimationFrame = window.requestAnimationFrame
export { requestAnimationFrame }
