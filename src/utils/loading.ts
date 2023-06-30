import { green, red } from 'kolorist'

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

class Ora {
  private message: string
  private interval: NodeJS.Timeout | null

  constructor(message: string) {
    this.message = message
    this.interval = null
  }

  start(): Ora {
    let i = 0
    this.interval = setInterval(() => {
      process.stdout.write('\r' + `${frames[i % 9]} ${this.message}`)
      i++
    }, 100)
    return this
  }

  fail(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${red('✖')} ${message}\n`)
  }

  succeed(message: string): void {
    if (!this.interval)
      return
    clearInterval(this.interval)
    process.stdout.write('\r' + `${green('✔')} ${message}\n`)
  }
}

export function ora(message: string) {
  return new Ora(message)
}