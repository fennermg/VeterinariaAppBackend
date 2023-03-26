const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

const app = express();

connectDB()

app.use(cors())
app.use(express.json({ extented: false }));

app.use('/api/user', require('./routes/user'))

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
