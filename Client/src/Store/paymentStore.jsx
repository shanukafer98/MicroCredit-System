import {create} from 'zustand';

const usePaymentStore = create((set) => ({
  payments: [],
  fetchPayments: async (loanId) => {
    const response = await fetch(`/api/payments/${loanId}`);
    const data = await response.json();
    set({ payments: data });
  },
  makePayment: async (payment) => {
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    const data = await response.json();
    set((state) => ({ payments: [...state.payments, data] }));
  },
}));

export default usePaymentStore;