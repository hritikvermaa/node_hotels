const express=require('express');
const router=express.Router();

const Menuitem=require('../models/menuitem');

//Post route to add a menu
router.post('/',async (req,res)=>{
    try{
        const menuData=req.body
        const newMenu=new Menuitem(menuData);

        const menuResponse= await newMenu.save();
        console.log('menu data saved');
        res.status(200).json(menuResponse);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//Get method to get the menu
router.get('/', async(req,res)=>{
    try{
        const menudata=await Menuitem.find();
        console.log('data fetched');
        res.status(200).json(menudata);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//complete the 3rd one that we had done in the person worktype
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour')
        {
            const response=await Menuitem.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid Work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedMenu=req.body;
        const response=await Menuitem.findByIdAndUpdate(menuId,updatedMenu,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }

        console.log('Menu items updated successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const menuItemId=req.params.id;
        const response=await Menuitem.findByIdAndDelete(menuItemId);

        if(!response){
            res.status(404).json({error:'MenuItem not found'});
        }
        console.log('Item Deleted');
        res.status(200).json({message:'Menu Item deleted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;