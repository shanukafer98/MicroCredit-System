import create from 'zustand';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

const useLoanStore = create((set) => ({
  loans: [],
  fetchLoans: async () => {
    const response = await fetch(`${url}/api/loans`);
    const data = await response.json();
    set({ loans: data });
  },
  createLoan: async (loan) => {
    const response = await axios.post(`${url}/api/loans`, loan);
    const data = response.data; 
    set((state) => ({ loans: [...state.loans, data] }));
  },
}));

export default useLoanStore;
