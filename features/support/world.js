const { setWorldConstructor, Before } = require('cucumber')
const { App, Account } = require('../../lib/app')

Before(function () {
  this.app = new App()
})

class DomainDriver {
  getProjects({ name }) {
    return this.app.getSession(name).projects
  }

  isAuthenticated({ name }) {
    return this.app.getSession(name).isAuthenticated
  }

  authenticationError({ name })  {
    return this.app.getSession(name).error
  }
}

setWorldConstructor(DomainDriver)
