import React from 'react';
import PaymentHistory from '../components/PaymentHistory';
import { useParams } from 'react-router-dom';
import PaymentCalculator from '../components/PaymentCalculator';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  const { loanId, loanType } = useParams();

  return (
    <Layout>
      <motion.div
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 3 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-center text-slate-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          Payment Details Section
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 1 }}
        >
          <PaymentHistory loanId={loanId} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 1 }}
        >
          <PaymentCalculator loanId={loanId} loanType={loanType} />
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.6 }}
        >
          <Dashboard loanId={loanId} loanType={loanType} />
        </motion.div> */}
      </motion.div>
    </Layout>
  );
};

export default PaymentPage;