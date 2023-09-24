const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db.js');
const pinRouter = require('./routes/pins.js');
const userRouter=require('./routes/users.js');
dotenv.config();
const app = express();
const port = process.env.PORT ||8080;
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

app.use('/api/pins', pinRouter);
app.use('/api/users', userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
