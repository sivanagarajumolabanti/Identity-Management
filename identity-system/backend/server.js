const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const formidableMiddleware = require('express-formidable');



require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


// app.use(formidableMiddleware());
app.use(cors());
app.use(express.json());

const uri = process.env.uri;
mongoose.set('useCreateIndex', true)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const credentialRouter = require('./routes/credentials');
const hash = require('./routes/credentials');
const credentials = require('./routes/credentials');
const Users = require('./routes/users')
const adminrouter = require('./routes/admin');

app.use('/credentials', credentialRouter);
app.use('/get', hash);
app.use('/get', credentials);
app.use('/users', Users)
app.use('/admin', adminrouter);





app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});