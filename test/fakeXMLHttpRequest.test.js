require('../lib/index')
const FakeXMLHttpRequest = require('../lib/fakeXMLHttpRequest').default

it('should load the file without errors', done => {
  try {
    const XMLHttpRequest = new FakeXMLHttpRequest()
    XMLHttpRequest.open('GET', '../assets/dude.png')
    XMLHttpRequest.onload = (xml, event) => {
      expect(event.target.status).toBe(200)
      done()
    }
    XMLHttpRequest.send()
  } catch (error) {
    done(error)
  }
})
