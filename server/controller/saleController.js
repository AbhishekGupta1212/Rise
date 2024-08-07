
const Invoice=require('../model/invoice.model');
const ItemModel = require("../model/items.model");


// ADD
const addSales = async(req,res)=>{
    const sales= new Invoice(req.body)
    try {
        const savedsales=await sales.save()
        console.log(savedsales)
        res.status(201).send(savedsales)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// GET ALL
const getAllSales = async(req,res)=>{
    try {
        const sales=await Invoice.find()
        res.status(200).send(sales)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

// GET ONE
const getSale = async(req,res)=>{
    const {id}=req.params
    try {
        const sales=await Invoice.findById({_id:id});
        if(!sales){
            return res.status(404).send()
        }
        res.status(200).send(sales)
    } catch (error) {
        res.status(404).send(error)
    }
}
    // UPDATE
    const updateSale = async(req,res)=>{
        const {id}=req.params
        try {
            const sales=await Invoice.findByIdAndUpdate({_id:id},req.body)
            if(!sales){
                return res.status(404).send()
            }
            res.status(200).send(sales)
        } catch (error) {
            res.status(404).send(error)
        }
    }

    // DELETE

    const deleteSale = async(req,res)=>{
        const {id}=req.params
        try {
            const sales=await Invoice.findByIdAndDelete({_id:id})
            if(!sales){
                return res.status(404).send()
            }
            res.status(200).send(sales)
        } catch (error) {
            res.status(404).send(error)
        }
    }

    // SEARCH & FILTER

    const searchSale = async(req,res)=>{
        const { Client, Project} = req.query;
        const filter = {};
    
        if (Client) filter.Client = Client;
        if (Project) filter.Project = Project;
    
        try {
            const items = await Invoice.find(filter);
            res.status(200).send(items);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // ADD ITEMS
    const addItem = async(req,res)=>{
        const items= new ItemModel(req.body)
        try {
            const savedItems=await items.save()
            console.log(savedItems)
            res.status(201).send(savedItems)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

// GET ALL ITEMS
    const getAllItems = async(req,res)=>{
        try {
            const items=await ItemModel.find()
            res.status(200).send(items)
        } catch (error) {
            res.status(400).send(error.message)
        }
    
    }

// GET ONE ITEM

const getItem = async(req,res)=>{
    const {id}=req.params
    try {
        const items=await ItemModel.findById({_id:id});
        if(!items){
            return res.status(404).send()
        }
        res.status(200).send(items)
    } catch (error) {
        res.status(404).send(error)
    }
}

// DELETE ONE ITEM

const deleteItem = async(req,res)=>{
    const {id}=req.params
    try {
        const items=await ItemModel.findByIdAndDelete({_id:id})
        if(!items){
            return res.status(404).send()
        }
        res.status(200).send(items)
    } catch (error) {
        res.status(404).send(error)
    }
}


module.exports={addSales,getAllSales,getSale,searchSale,deleteSale, updateSale,getAllItems,getItem,addItem,deleteItem}