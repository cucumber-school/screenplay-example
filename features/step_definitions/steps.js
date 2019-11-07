const { Given, When, Then } = require('cucumber')
const { assertThat, is, not, matchesPattern, hasItem, isEmpty } = require('hamjest')
const { Account } = require('../../lib/app')

CreateAccount = {
  forThemselves: 
    ({ name, app }) => app.accounts[name] = new Account({ name })
}

class Actor {
  constructor(abilities) {
    this.abilities = abilities
  }

  attemptsTo(task) {
    task(this.abilities)
  }
}

const { defineParameterType } = require('cucumber')

defineParameterType({
  name: 'actor',
  regexp: /\w+/,
  transformer: function(name) {
    return new Actor({ name, ...this })
  }
})

Given('{actor} has created an account', function (actor) {
  actor.attemptsTo(CreateAccount.forThemselves)
})

const SignIn = ({name, app}) => app.authenticate({ name })

When('{actor} tries to sign in', function (actor) {
  actor.attemptsTo(SignIn)
})

const ActivateAccount = ({ name, app }) => {
  app.getAccount(name).activate()
  app.authenticate({ name })
}

When('{actor} activates his/her account', function (actor) {
  actor.attemptsTo(ActivateAccount)
})

const CreateProject = {
  named: projectName =>
    ({ name, app }) =>
      app.getSession(name).createProject({ name: projectName })
}

When('{actor} (tries to )create(s) a project', function (actor) {
  actor.attemptsTo(CreateProject.named('a-project'))
})

Given('{word} has signed up', function (name) {
  this.createAccount({ name })
  this.activateAccount({ name })
})

Then('{word} should see the project', function (name) {
  assertThat(
    this.getProjects({ name }),
    hasItem({ name: 'a-project' })
  )
})

Then('{word} should not see any projects', function (name) {
  assertThat(
    this.getProjects({ name }),
    isEmpty()
  )
})

Then('{word} should not be authenticated', function (name) {
  assertThat(this.isAuthenticated({ name }), is(not(true)))
})

Then('{word} should be authenticated', function (name) {
  assertThat(this.isAuthenticated({ name }), is(true))
})

Then('{word} should see an error telling him/her to activate the account', function (name) {
  assertThat(
    this.authenticationError({ name }),
    matchesPattern(/activate your account/)
  )
})

