class Session {
  constructor({ name, projectsByUser }) {
    if (!projectsByUser[name])
      projectsByUser[name] = []
    this.projects = projectsByUser[name]
  }

  get isAuthenticated() {
    return true
  }

  createProject(project) {
    this.projects.push(project)
  }
}

class NotActivatedSession {
  get isAuthenticated() {
    return false
  }

  get error() {
    return "You need to activate your account first"
  }

  createProject() {
    throw new Error(this.error)
  }
}

class NoSession  {
  get isAuthenticated() {
    return false
  }

  get error() {
    return 'Not authenticated'
  }

  createProject() {
    throw new Error(this.error)
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
    this.projectsByUser = {}
  }

  authenticate({ name }) {
    const user = this.getAccount(name)
    this.sessions[name] =
      (!user.isActivated) ?
        new NotActivatedSession() :
        new Session({ name, ...this })
  }

  getAccount(name) {
    return this.accounts[name] || new NoUser()
  }

  getSession(name) {
    return this.sessions[name] || new NoSession()
  }
}

module.exports = { App, Account }
