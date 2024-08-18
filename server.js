const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT=process.env.PORT || 3000;

//Middleware Function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
    res.send('Welcome to my hotel How can I help you')
})

//Import the router files of person
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');
const { config } = require('dotenv');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);




app.listen(PORT,()=>{
    console.log('listening on port 3000');
})





