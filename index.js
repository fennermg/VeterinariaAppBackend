const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const session = require('express-session')

const app = express();

connectDB()

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}))
app.use(express.json({ extented: false }));
app.use(express.urlencoded())

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 43200000  } //Session dura 12 horas
}))



app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/responsable', require('./routes/responsable'))
app.use('/api/paciente', require('./routes/paciente'))
app.use('/api/rvet', require('./routes/rvet'))
app.use('/api/cita', require('./routes/cita'))


app.listen(5000, () => {
  console.log('Server started on port 5000');
});
