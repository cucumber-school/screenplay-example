const { CreateAccount, ActivateAccount } = require('./actions')

const SignUp = ({ attemptsTo }) =>
  attemptsTo(
    CreateAccount.forThemselves,
    ActivateAccount
  )

module.exports = { SignUp }
