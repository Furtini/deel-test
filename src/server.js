const app = require('./app')

const port = 3001

init()

async function init() {
  try {
    app.listen(port, () => {
      console.log('Express App Listening on Port:' + port)
    })
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}
