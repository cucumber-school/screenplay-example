const { Given, When, Then } = require('cucumber')
const { assertThat, is, not, matchesPattern, hasItem, isEmpty } = require('hamjest')
const { Account } = require('../../lib/app')

const CreateAccount = {
  forThemselves: ({ name, app }) =>
    app.accounts[name] = new Account({ name })
}

const ActivateAccount = ({ name, app }) => {
  app.getAccount(name).activate()
  app.authenticate({ name })
}

const CreateProject = {
  named: projectName =>
    ({ name, app }) =>
      app.getSession(name).createProject({ name: projectName })
}

const SignIn = ({name, app}) => app.authenticate({ name })

class Actor {
  constructor(abilities) {
    this.abilities = {
      ...abilities,
      attemptsTo: this.attemptsTo.bind(this)
    }
  }

  attemptsTo(...tasks) {
    for (const task of tasks)
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

When('{actor} tries to sign in', function (actor) {
  actor.attemptsTo(SignIn)
})

When('{actor} activates his/her account', function (actor) {
  actor.attemptsTo(ActivateAccount)
})

When('{actor} (tries to )create(s) a project', function (actor) {
  actor.attemptsTo(CreateProject.named('a-project'))
})

const SignUp = ({ attemptsTo }) =>
  attemptsTo(
    CreateAccount.forThemselves,
    ActivateAccount
  )

Given('{actor} has signed up', function (actor) {
  actor.attemptsTo(SignUp)
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

