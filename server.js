const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT=process.env.PORT || 3000;


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





