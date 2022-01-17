const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();
mongoose.connect('mongodb+srv://Ishita:Ishitaa@cluster0.aryi0.mongodb.net/social-media?retryWrites=true&w=majority');
 

//middleware
//parse incoming request 
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

 app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)

// app.get('/users',(req, res, next)=>{
//     res.send("welcome to users page")
// })

// app.get('/',(req, res, next)=>{
//     res.send("welcome to home page")
// })




app.listen(3009,()=>{
    console.log('listening on port 8800')
});