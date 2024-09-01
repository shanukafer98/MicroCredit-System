import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    id_number: {
        type: String,
        required: true,
        unique: true
    },

    fullname: {
        type: String,
        required: true,
        unique: true
    },

    initial_name: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    contact_number: {
        type: String,
        required: true
    },

    name_guarantee1: {
        type: String,
        required: false
    },

    name_guarantee2: {
        type: String,
        required: false
    },

    id_guarantee1: {
        type: String,
        required: false
    },

    id_guarantee2: {
        type: String,
        required: false
    },
},

{timestamps:true}

)

const Client = mongoose.model("Client", clientSchema);
export default Client;