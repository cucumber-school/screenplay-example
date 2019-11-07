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

module.exports = { CreateAccount, ActivateAccount, CreateProject, SignIn }

