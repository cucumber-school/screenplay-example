const { setWorldConstructor, Before } = require('cucumber')
const { App, Account } = require('../../lib/app')

Before(function () {
  this.app = new App()
})

class DomainDriver {
  createAccount({ name }) {
    this.app.accounts[name] = new Account({ name })
  }

  activateAccount({ name }) {
    this.app.getAccount(name).activate()
    this.app.authenticate({ name })
  }

  signIn({ name }) {
    this.app.authenticate({ name })
  }

  isAuthenticated({ name }) {
    return this.app.getSession(name).isAuthenticated
  }

  authenticationError({ name })  {
    return this.app.getSession(name).error
  }
}

setWorldConstructor(DomainDriver)
