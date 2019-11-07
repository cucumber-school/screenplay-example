const { Given, When, Then } = require('cucumber')
const { assertThat, is, not, matchesPattern } = require('hamjest')

Given('{word} has created an account', function (name) {
  this.createAccount({ name })
})

When('{word} tries to sign in', function (name) {
  this.signIn({ name })
})

When('{word} activates his/her account', function (name) {
  this.activateAccount({ name })
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
