const {ClientModule} = require("../model/clientModel")

//create client

const createClient = async(req,res)=>{
    try{
        const client = new ClientModule(req.body)
        await client.save();
        res.status(201).send({ msg: "Client Added Successfully" });
    }
    catch(error){
        res.status(400).send({ error: error.message });
    }
}

//get client

const getAllClients = async(req,res)=>{
    try {
        const {sort , ...filters} = req.query;
        let sortCriteria = {};
        if(sort){
            const [field, order] = sort.split(':');
            sortCriteria[field] = order === 'desc' ? -1 : 1;
        }
        const clients = await ClientModule.find(filters).sort(sortCriteria);
        res.send({ clients });
    } catch (error) {
        res.status(401).send({ error: "Error in fetching data!" });
    }
}

//update

const  updateClient = async (req,res) =>{
    const {id} = req.params;
    try {
        const client = await ClientModule.findByIdAndUpdate(id,req.body,{new: true});
        if(!client){
            return res.status(404).send({ error: 'Client not found' });
        }
        res.send(client)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//delete

const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientModule.findByIdAndDelete(id);
        if (!client) return res.status(404).send({ error: 'Client not found' });
        res.send({ msg: 'Client deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}


module.exports = {
    createClient , getAllClients, updateClient, deleteClient
}