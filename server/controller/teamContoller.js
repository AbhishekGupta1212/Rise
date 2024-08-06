
const teamModel=require('../model/team.model');
const timeCardModel = require("../model/timeCard.model");

// ADD
const addTeam = async(req,res)=>{
    const teams= new teamModel(req.body)
    try {
        const savedteam=await teams.save()
        console.log(savedteam)
        res.status(201).send(savedteam)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// GET ALL
const getAllTeam = async(req,res)=>{
    try {
        const teams=await teamModel.find()
        res.status(200).send(teams)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

// GET ONE
const getTeam = async(req,res)=>{
    const {id}=req.params
    // console.log(id)
    try {
        const teams=await teamModel.findById({_id:id});
        if(!teams){
            return res.status(404).send()
        }
        res.status(200).send(teams)
    } catch (error) {
        res.status(404).send(error)
    }
}


    // DELETE

    const deleteTeam = async(req,res)=>{
        const {id}=req.params
        
        try {
            const team=await teamModel.findByIdAndDelete({_id:id})
            if(!lead){
                return res.status(404).send()
            }
            res.status(200).send(lead)
        } catch (error) {
            res.status(404).send(error)
        }
    }

    // ADD TIME CARD
    const addTime = async(req,res)=>{
        const timeCard= new timeCardModel(req.body)
        try {
            const savedcard=await timeCard.save()
            console.log(savedcard)
            res.status(201).send(savedcard)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    // GET ALL ATTENDACE
    const getAttendance = async(req,res)=>{
        try {
            const timeCard=await timeCardModel.find()
            res.status(200).send(timeCard)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }



module.exports={getAllTeam,addTeam,getTeam,deleteTeam,addTime,getAttendance}