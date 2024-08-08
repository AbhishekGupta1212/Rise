
const { ClientModule } = require("../model/clientModel");
const {Project}  = require("../model/projectModel")
//create



const createProject = async(req,res)=>{
    try {
        const {id,title,client,price,deadline} = req.body;
        const clientExists = await ClientModule.findById(client);
        if(!clientExists){
            return res.status(404).send({error: "Client not found"});
        }
        const project = new Project({
            id,title,client,price,deadline
        })
        await project.save()
        res.status(201).send({ msg: "Project Created Successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//get 
 const getAllProjects = async(req,res)=>{
    try {
        const {sort,search, ...filters} = req.query;
        let sortCriteria ={};

        if(sort){
            const[field,order] = sort.split(':');
            sortCriteria[field] = order === 'desc' ? -1 : 1;
        }
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [
                { id: isNaN(Number(search)) ? undefined : Number(search) },
                { price : searchRegex },
                { status: searchRegex },
            
            ].filter(filter => Object.values(filter).some(value => value !== undefined));
        }
        const projects = await Project.find(filters).sort(sortCriteria).populate('client', 'name');
        res.send({projects})
    } catch (error) {
        res.status(401).send({ error: "Error in fetching data!" });
    }
 }

 //update

 const updateProject = async(req,res) =>{
    const {id} = req.params;
    try {
        const project = await Project.findByIdAndUpdate(id,req.body,{new: true});

        if (!project) return res.status(404).send({ error: 'Project not found' });

        res.send(project)

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
 }

 //Delete

 const deleteProject = async(req,res)=>{
    const {id} = req.params;
    try{
        const project = await Project.findByIdAndDelete(id);

        if(!project) return res.status(404).send({ error: 'Project not found' });

        res.send({ msg: 'Project deleted successfully' });

    }
    catch(error){
        res.status(400).send({error:error.message})
    }
 }

 module.exports = {
    getAllProjects , createProject ,
    updateProject , deleteProject
 }