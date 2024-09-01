import Client from '../models/client.model.js'; // Make sure to adjust the path as needed

// Create a new client
export const createClient = async (req, res) => {
    try {
        const { id_number, fullname, initial_name, address, contact_number, name_guarantee1, name_guarantee2, id_guarantee1, id_guarantee2 } = req.body;

        // Create a new client instance
        const newClient = new Client({
            id_number,
            fullname,
            initial_name,
            address,
            contact_number,
            name_guarantee1,
            name_guarantee2,
            id_guarantee1,
            id_guarantee2
        });

        // Save the client to the database
        const savedClient = await newClient.save();

        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//get all Clients
export const getallClients = async (req, res) => {

    try {

        const clients = await Client.find();
        res.status(200).json(clients);

    } catch (error) {

        res.status(500).json({ message: error.message });

}
}

//get a single client
export const getClient = async (req, res) => {
    try{

        const { id } = req.params;

        const client = await Client.findById(id);

        res.status(200).json(client);

    }catch(error){
        res.status(500).json({ message: error.message });
    }

}

// Delete a client by ID
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a client by ID
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_number, fullname, initial_name, address, contact_number, name_guarantee1, name_guarantee2, id_guarantee1, id_guarantee2 } = req.body;

        // Find the client by ID and update the fields
        const updatedClient = await Client.findByIdAndUpdate(
            id,
            {
                id_number,
                fullname,
                initial_name,
                address,
                contact_number,
                name_guarantee1,
                name_guarantee2,
                id_guarantee1,
                id_guarantee2
            },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


