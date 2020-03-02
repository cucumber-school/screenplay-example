const { Given, When, Then } = require('cucumber')
const { assertThat, is, not, matchesPattern, hasItem, isEmpty } = require('hamjest')
const { Account } = require('../../lib/app')

class Actor {
  constructor(abilities) {
    this.abilities = abilities
  }

  attemptsTo(interaction) {
    interaction(this.abilities)
  }
}

Given('{word} has created an account', function (name) {
  const interaction = ({ name, app }) => app.accounts[name] = new Account({ name })
  const actor = new Actor({ name, app: this.app })
  actor.attemptsTo(interaction)
})

When('{word} tries to sign in', function (name) {
  this.signIn({ name })
})

When('{word} activates his/her account', function (name) {
  this.activateAccount({ name })
})

Given('{word} has signed up', function (name) {
  this.createAccount({ name })
  this.activateAccount({ name })
})

When('{word} (tries to )create(s) a project', function (name) {
  this.createProject({ name, project: { name: 'a-project' }})
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

