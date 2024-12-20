import React from "react";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

const LonePage = () => {
  return (
    <div className="container mx-auto p-2 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Loan Section</h1>
      <div className="flex gap-2">
        <div className="w-1/3">
          <LoanForm />
        </div>
        <div className="w-2/3">
          <LoanList />
        </div>
      </div>
    </div>
  );
};

export default LonePage;
