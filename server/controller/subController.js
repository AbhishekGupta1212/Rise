const SubscriptionModel=require('../model/subscription.model')


// ADD
const addSub = async(req,res)=>{
    const subs= new SubscriptionModel(req.body)
    try {
        const savedsub=await subs.save()
        console.log(savedsub)
        res.status(201).send(savedsub)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// GET Aasync(req,res)=>{
    const getAllSub = async(req,res)=>{
    try {
        // const subs=await SubscriptionModel.find()
        // res.status(200).send(subs)
        const {sort ,search, ...filters} = req.query;
        let sortCriteria = {};
        if(sort){
            const [field, order] = sort.split(':');
            sortCriteria[field] = order === 'desc' ? -1 : 1;
        }
        if(search){
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [
                { Title: searchRegex },
                { Client: searchRegex },
                { Tax: searchRegex },
                { SecondTax: searchRegex },
                { Note: searchRegex },
                { Label: searchRegex },
                { Type: searchRegex}
            ].filter(filter => Object.values(filter).some(value => value !== undefined));
        }
        const subs = await SubscriptionModel.find(filters).sort(sortCriteria);
        res.send({ subs });
    } catch (error) {
        res.status(400).send(error.message)
    }

}

// GET ONE
    const getSub = async(req,res)=>{
    const {id}=req.params
    // console.log(id)
    try {
        const subs=await SubscriptionModel.findById({_id:id});
        if(!subs){
            return res.status(404).send()
        }
        res.status(200).send(subs)
    } catch (error) {
        res.status(404).send(error)
    }
}


    // SEARCH & FILTER

    const searchSub = async(req,res)=>{
        const { name, Owner} = req.query;
        const filter = {};
    
        if (name) filter.name = name;
        if (Owner) filter.Owner = Owner;
    
        try {
            const items = await SubscriptionModel.find(filter);
            res.status(200).send(items);
        } catch (error) {
            res.status(400).send(error);
        }
    }


module.exports={addSub,getAllSub,getSub,searchSub}