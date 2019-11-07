class Session {
  constructor() {
  }

  get isAuthenticated() {
    return true
  }
}

class NotActivatedSession {
  get isAuthenticated() {
    return false
  }

  get error() {
    return "You need to activate your account first"
  }
}

class NoSession  {
  get isAuthenticated() {
    return false
  }

  get error() {
    return 'Not authenticated'
  }
}

class Account {
  constructor(attributes) {
    this.name = attributes.name
    this.isActivated = false
  }

  activate() {
    this.isActivated = true
  }
}

class NoUser {
  constructor() {
    this.isActivated = false
  }

  activate() { }
}

class App {
  constructor() {
    this.sessions = {}
    this.accounts = {}
  }

  authenticate({ name }) {
    const user = this.getAccount(name)
    this.sessions[name] =
      (!user.isActivated) ?
        new NotActivatedSession() :
        new Session()
  }

  activateAccount({ name }) {
    this.getAccount(name).activate()
    this.authenticate(({ name }))
  }

  createAccount({ name }) {
    this.accounts[name] = new Account({ name })
  }

  getAccount(name) {
    return this.accounts[name] || new NoUser()
  }

  getSession(name) {
    return this.sessions[name] || new NoSession()
  }
}
module.exports = { App, Account }
