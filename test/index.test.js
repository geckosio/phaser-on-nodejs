require('../lib/index')
const { requestAnimationFrame, animationFrame } = require('../lib/index')

jest.setTimeout(10_000)

it('should create object URL', () => {
  expect(URL.createObjectURL('test')).toBe('data:image/png;base64,test')
})

it('should return 0', done => {
  const res = animationFrame('string')

  setTimeout(() => {
    expect(res).toBe(0)
    done()
  }, 0)
})

it('should increase tick', done => {
  let tick = 0
  const loop = () => {
    tick++
    requestAnimationFrame(loop)
  }
  loop()

  setTimeout(() => {
    expect(tick).toBeGreaterThan(10)
    done()
  }, 2000)
})
