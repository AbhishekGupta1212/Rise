const { Ticket } = require("../model/ticketModel");
const { ClientModule } = require("../model/clientModel")

const getAllTickets = async (req, res) => {
    try {
        const { sort, search, ...filters } = req.query;
        let sortCriteria = {};

        if (sort) {
            const [field, order] = sort.split(':');
            sortCriteria[field] = order === 'desc' ? -1 : 1;
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [
                { ticketID: isNaN(Number(search)) ? undefined : Number(search) },
                { title: searchRegex },
                { status: searchRegex },
                { ticketType: searchRegex },
                { assignedTo: searchRegex }
            ].filter(filter => Object.values(filter).some(value => value !== undefined));
        }
        const tickets = await Ticket.find(filters).sort(sortCriteria).populate('client', 'name');
        res.send({ tickets });

    } catch (error) {
        res.status(401).send({ error: "Error in fetching data!" });
    }
}

//create

const createTicket = async (req, res) => {
    try {
        const { ticketID, title, client, ticketType } = req.body;
        const clientExists = await ClientModule.findById(client);

        if (!clientExists) {
            return res.status(404).send({ error: "Client not found" });
        }

        const ticket = new Ticket({
            ticketID, title, client, ticketType, status: "New"
        })
        await ticket.save();
        res.status(201).send({ msg: "Ticket Created Successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//update

const updateTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });

        if (!ticket) {
            return res.status(404).send({ error: 'Ticket not found' });
        }
        res.send(ticket);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//delete 
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) return res.status(404).send({ error: 'Ticket not found' });
        res.send({ msg: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    getAllTickets,
    createTicket,
    updateTicket,
    deleteTicket
}