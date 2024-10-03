import axios from 'axios';
import { create } from 'zustand';
const url = import.meta.env.VITE_BACKEND_URL;

const usePaymentStore = create((set) => ({
  payments: [],

  fetchPayments: async (loanId) => {
    try {
      const response = await fetch(`${url}/api/payments/${loanId}`);
      const data = await response.json();
      set({ payments: data });
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  },

  makePayment: async (payment) => {
    try {
      const response = await axios.post(`${url}/api/payments`, payment);
      const data = response.data;  // Access the data directly from axios response
      set((state) => ({ payments: [...state.payments, data] }));
    } catch (error) {
      console.error('Error making payment:', error);
      throw error;  // Re-throw the error to be caught in the component
    }
  },

  deletePayment: async (paymentId) => {
    try {
      await axios.delete(`${url}/api/payments/${paymentId}`);
      set((state) => ({
        payments: state.payments.filter(payment => payment._id !== paymentId)
      }));
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;  // Re-throw the error to be caught in the component
    }
  },
}));

export default usePaymentStore;