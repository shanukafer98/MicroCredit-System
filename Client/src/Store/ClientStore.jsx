import React from 'react'
import {create} from 'zustand';

const persistState = (clientID) => {
  localStorage.setItem('clientID', clientID);
}

const loadState = () => {
    const savedClientID = localStorage.getItem('clientID');
    return savedClientID ? savedClientID: null;
}


const useClientStore = create((set) => ({
   
clientID: loadState(),
setClientID: (clientID) => {
  set({ clientID });
  persistState(clientID);
},

}))



export default useClientStore;




