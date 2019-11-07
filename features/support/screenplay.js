const { defineParameterType } = require('cucumber')
const { assertThat } = require('hamjest')

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

  asks(question) {
    return question(this.abilities)
  }
}

defineParameterType({
  name: 'actor',
  regexp: /\w+/,
  transformer: function(name) {
    return new Actor({ name, ...this })
  }
})

const checkThat = (question, matcher) =>
  abilities => assertThat(question(abilities), matcher)

module.exports = { checkThat }
