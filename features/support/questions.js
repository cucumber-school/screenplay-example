const ProjectsVisible =
  ({ name, app }) =>
    app.getSession(name).projects

const IsAuthenticated =
  ({ name, app }) =>
    app.getSession(name).isAuthenticated

const AuthenticationError =
  ({ name, app }) =>
    app.getSession(name).error

module.exports = { ProjectsVisible, IsAuthenticated, AuthenticationError }

