import path from 'path'
import fs from 'fs'

export class FakeXMLHttpRequest {
  public url: string
  public status = 200
  public response: any

  public open(_type: string, url: string) {
    this.url = path.resolve(__dirname, url)
  }

  public send() {
    fs.readFile(this.url, { encoding: 'base64' }, (err, data) => {
      if (err) throw err
      this.response = data
      const event = { target: { status: this.status } }
      this.onload(this, event)
    })
  }
  public onload(xhr: any, event: any) {}
  public onerror(err: NodeJS.ErrnoException | null) {}
  public onprogress() {}
}
