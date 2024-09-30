import {create} from 'zustand';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

const useLoanStore = create((set) => ({
  createLoan: async (loan) => {
    try {
      const response = await axios.post(`${url}/api/loans`, loan);
      set((state) => ({
        loans: [...state.loans, response.data]
      }));
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  },
  fetchLoans: async (clientID) => {
    try {
      const response = await axios.get(`${url}/api/loans/${clientID}`);
      const data = response.data;
      set({ loans: data });
    } catch (error) {
      console.error('Error fetching loans:', error);
      throw error;
    }
  },
  deleteLoan: async (loanType, id) => {
    try {
      const response = await axios.delete(`${url}/api/loans?loanType=${loanType}&id=${id}`);
      // Optionally, update the state to remove the deleted loan
      set((state) => ({
        loans: state.loans.filter(loan => loan._id !== id)
      }));
    } catch (error) {
      console.error('Error deleting loan:', error);
      throw error;
    }
  },
  loans: []
}));

export default useLoanStore;
