const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const session = require('express-session')

const app = express();

connectDB()

app.use(cors())
app.use(express.json({ extented: false }));
app.use(express.urlencoded())

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use('/api/user', require('./routes/user'))

app.use('/api/auth', require('./routes/auth'))

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
