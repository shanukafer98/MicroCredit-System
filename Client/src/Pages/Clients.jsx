import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useClientStore from "../Store/ClientStore";
import Layout from "../components/Layout";



const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const Navigate = useNavigate();
  const Client = useClientStore((state) => state.setClientID);

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${url}/api/client`);
      if (Array.isArray(response.data)) {
        setClients(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        toast.error("Failed to load clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Error fetching clients");
      setClients([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClient = () => {
    setModalType("add");
    setSelectedClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setModalType("edit");
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`${url}/api/client/${clientId}`);
        toast.success("Client deleted successfully");
        fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
        toast.error("Error deleting client");
      }
    }
  };

  const handleShowLoans = (client) => {
    setSelectedClient(client);
    Client(client._id);
  
    Navigate(`/loans`);
   
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const clientData = {
      id_number: formData.get("id_number"),
      fullname: formData.get("fullname"),
      initial_name: formData.get("initial_name"),
      address: formData.get("address"),
      contact_number: formData.get("contact_number"),
      name_guarantee1: formData.get("name_guarantee1"),
      name_guarantee2: formData.get("name_guarantee2"),
      id_guarantee1: formData.get("id_guarantee1"),
      id_guarantee2: formData.get("id_guarantee2"),
    };

    try {
      if (modalType === "add") {
        await axios.post(`${url}/api/client`, clientData);
        toast.success("Client added successfully");
        console.log(clientData)
      } else if (modalType === "edit") {
        await axios.put(`${url}/api/client/${selectedClient._id}`, clientData);
        toast.success("Client updated successfully");
      }
      fetchClients();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Error saving client");
    }
  };

  return (
    <Layout>
    <div >
      <h1 className="text-2xl font-bold mb-4 text-center py-2">Loan Management System</h1>
      <div className="flex justify-between items-center mb-4 px-8">
        <input
          type="text"
          placeholder="Search clients"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddClient}
          className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
        >
          + Add Client
        </button>
      </div>
      <table className="min-w-full bg-slate-500 border border-slate-200">
        <thead>
          <tr>
            <th className="py-2 px-2 border-b text-sm font-bold">ID Number</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Full Name</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Initial Name</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Address</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Contact Number</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Guarantee 1</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Guarantee 2</th>
            <th className="py-2 px-2 border-b text-sm font-bold">ID Guarantee 1</th>
            <th className="py-2 px-2 border-b text-sm font-bold">ID Guarantee 2</th>
            <th className="py-2 px-2 border-b text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((client) =>
              client.fullname.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((client) => (
              <tr key={client._id}>
                <td className="py-2 px-2 border-b text-xs">{client.id_number}</td>
                <td className="py-2 px-2 border-b text-xs">{client.fullname}</td>
                <td className="py-2 px-2 border-b text-xs">{client.initial_name}</td>
                <td className="py-2 px-2 border-b text-xs">{client.address}</td>
                <td className="py-2 px-2 border-b text-xs">{client.contact_number}</td>
                <td className="py-2 px-2 border-b text-xs">{client.name_guarantee1}</td>
                <td className="py-2 px-2 border-b text-xs">{client.name_guarantee2}</td>
                <td className="py-2 px-2 border-b text-xs">{client.id_guarantee1}</td>
                <td className="py-2 px-2 border-b text-xs">{client.id_guarantee2}</td>
                <td className="py-2 px-2 border-b text-xs space-x-2">
                  <div className="flex space-x-2">
                  
                  <button
                    onClick={() => handleEditClient(client)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded shadow-2xl hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded shadow-2xl hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleShowLoans(client)}
                    className="bg-blue-500 text-white px-2 py-1 rounded shadow-2xl hover:bg-blue-600"
                  >
                    Show Loans
                  </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add" ? "Add Client" : "Edit Client"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="id_number"
                  placeholder="ID Number"
                  defaultValue={selectedClient?.id_number || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  defaultValue={selectedClient?.fullname || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="initial_name"
                  placeholder="Initial Name"
                  defaultValue={selectedClient?.initial_name || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  defaultValue={selectedClient?.address || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="contact_number"
                  placeholder="Contact Number"
                  defaultValue={selectedClient?.contact_number || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="name_guarantee1"
                  placeholder="Guarantee 1"
                  defaultValue={selectedClient?.name_guarantee1 || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="name_guarantee2"
                  placeholder="Guarantee 2"
                  defaultValue={selectedClient?.name_guarantee2 || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="id_guarantee1"
                  placeholder="ID Guarantee 1"
                  defaultValue={selectedClient?.id_guarantee1 || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="id_guarantee2"
                  placeholder="ID Guarantee 2"
                  defaultValue={selectedClient?.id_guarantee2 || ""}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-2 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Clients;
