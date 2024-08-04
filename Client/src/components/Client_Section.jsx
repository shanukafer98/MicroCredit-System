import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AddForm } from './AddForm'; // Adjust the path according to your project structure

Modal.setAppElement('#root'); // This line is needed for accessibility reasons

const Client_Section = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/clients");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="text-white bg-black w-full ">
        <div className="flex flex-row justify-center gap-10">
          <input
            type="text"
            className="w-52 h-6 bg-white text-blue-700 rounded-full my-10 px-5"
            placeholder="Enter Client ID"
          />
          <input
            type="text"
            className="w-52 h-6 bg-white text-blue-700 rounded-full my-10 px-5"
            placeholder="Enter Client Name"
          />
        </div>
        <table className="w-full bg-slate-500 max-h-[200px] h-auto overflow-y-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone no</th>
              <th>Contact number</th>
              <th>Name(Gurantee-1)</th>
              <th>Name(Gurantee-2)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <tr key={client._id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.address}</td>
                <td>{client.phone}</td>
                <td>{client.contact}</td>
                <td>{client.gurantee1}</td>
                <td>{client.gurantee2}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center">
        <button onClick={openModal} className="rounded-lg bg-green-600 flex flex-row justify-center p-2">
          Add user
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
   
        style={customStyles}
      >
        <AddForm />
      </Modal>
    </>
  );
};

export default Client_Section;
