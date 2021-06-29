//import dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

//import routes
const items = require('./routes/items')
const users = require('./routes/users')
const auth = require('./routes/auth')

//initalize express
const app = express()

//initalize port
const PORT = process.env.SERVER_PORT || 5002;

//initalize middleware
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :response-time'))

//MonogoDB connect
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("Connected to MongoDB")).catch((err)=>{console.log(err)})

//initalize routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

//app listening
app.listen(PORT, ()=>{console.log(`Server running at ${PORT}`)})