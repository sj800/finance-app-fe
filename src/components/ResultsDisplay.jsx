import React from 'react';

const ResultsDisplay = ({ results }) => {
  return (
    <div className="results-display">
      <h3>Results</h3>
      <p>You will need: <strong>INR {results.totalSavingsNeeded}</strong> by retirement.</p>
      <p>You need to save: <strong>INR {results.monthlySavings}</strong> per month.</p>
      
      <h4>Yearly Withdrawals During Retirement</h4>
      <ul>
        {results.yearlyWithdrawal.map((item, index) => (
          <li key={index}>
            Year {item.year}: Withdraw INR {item.amount} (Remaining Balance: INR {item.balance})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;
