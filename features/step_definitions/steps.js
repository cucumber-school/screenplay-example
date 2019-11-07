const { Given, When, Then } = require('cucumber')
const { is, not, matchesPattern, hasItem, isEmpty } = require('hamjest')
const { CreateAccount, ActivateAccount, CreateProject, SignIn } = require('../support/actions')
const { SignUp } = require('../support/tasks')
const { ProjectsVisible, IsAuthenticated, AuthenticationError } = require('../support/questions')
const { checkThat } = require('../support/screenplay')

Given('{actor} has created an account', actor =>
  actor.attemptsTo(CreateAccount.forThemselves)
)

When('{actor} tries to sign in', actor =>
  actor.attemptsTo(SignIn)
)

When('{actor} activates his/her account', actor =>
  actor.attemptsTo(ActivateAccount)
)

When('{actor} (tries to )create(s) a project', actor =>
  actor.attemptsTo(CreateProject.named('a-project'))
)

Given('{actor} has signed up', actor =>
  actor.attemptsTo(SignUp)
)

Then('{actor} should see the project', actor =>
  actor.attemptsTo(
    checkThat(
      ProjectsVisible,
      hasItem({ name: 'a-project' })
    )
  )
)

Then('{actor} should not see any projects', actor =>
  actor.attemptsTo(
    checkThat(
      ProjectsVisible,
      isEmpty()
    )
  )
)

Then('{actor} should not be authenticated', actor =>
  actor.attemptsTo(
    checkThat(
      IsAuthenticated,
      is(not(true))
    )
  )
)

Then('{actor} should be authenticated', actor =>
  actor.attemptsTo(
    checkThat(
      IsAuthenticated,
      is(true)
    )
  )
)

Then('{actor} should see an error telling him/her to activate the account', actor =>
  actor.attemptsTo(
    checkThat(
      AuthenticationError,
      matchesPattern(/activate your account/)
    )
  )
)
