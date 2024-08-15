const express=require('express');
const router=express.Router();

const Person=require('../models/person');

//POST route to add a person
router.post('/', async (req,res)=>{
    try{
        const data=req.body  //Assuming the request body contains the persons data

        //create a new person document using the mongoose model
        const newPerson= new Person(data);

        //save the new person to the database
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})

//Get method to get the person
router.get('/', async(req,res)=>{
    try{
        const data= await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        const workType=req.params.workType;  //Extract the worktype from the URL parameter
        if(workType=='chef' || workType=='waiter' || workType=='manager')
        {
            const response= await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        } else{
            res.status(404).json({error:'Invalid work type'});
        }
    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId=req.params.id; //Extract the id from the url parameter
        const updatedPersonData=req.body; //Updated data for the person

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,  //Return the updated document
            runValidators:true, //Run mongoose validation
        })

        if(!response){
            return res.status(404).json({error:'Person Not found'})
        }

        console.log('Data updated successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const personId=req.params.id;   //Extract the id from the url parameter
        //Assuming you have a person model
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'Persons data deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;