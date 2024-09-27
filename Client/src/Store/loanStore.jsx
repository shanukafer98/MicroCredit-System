import {create} from 'zustand';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

const useLoanStore = create((set) => ({
  loans: [],
  fetchLoans: async (clientID) => {
    const response = await axios.get(`${url}/api/loans/${clientID}`);
    const data = response.data;
    set({ loans: data });
  },
  createLoan: async (loan) => {
    const response = await axios.post(`${url}/api/loans`, loan);
    const data = response.data; 
    
   
    set((state) => ({ loans: [...state.loans, data] }));
  },


  deleteLoan: async (loanID) => {
    const response = await axios.delete(`${url}/api/loans/${loanID}`);
    const data = response.data;
  }
}));

export default useLoanStore;
