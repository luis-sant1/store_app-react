const app = require('./app')

const PORT = process.env.PORT || 4001;

app.listen(PORT)
console.log('Your server is listenning at:', PORT + ' port')