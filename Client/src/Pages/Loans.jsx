import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import  useClientStore  from '../Store/ClientStore';

export default function Loans(Client) {


  const [modalType, setModalType] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const client = useClientStore((state) => state.setClientID);


  useEffect(() => {
  
  })


  return (
    <div>
        <div className='text-center'>Loans of {Client.name}</div> 


    </div>
  )
}
