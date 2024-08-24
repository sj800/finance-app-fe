import React, { useState } from 'react';
import InputField from './InputField';
import ResultsDisplay from './ResultsDisplay';
import { calculateRetirementNeeds } from '../utils/retirementCalculations';

const CalculatorForm = () => {
  const [formValues, setFormValues] = useState({
    currentAge: 23,
    retirementAge: 40,
    monthlyExpensesToday: 100000,
    interestRate: 5,
    lifeExpectancy: 75,
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (formValues.currentAge >= formValues.retirementAge) {
      errors.retirementAge = 'Retirement age must be greater than current age.';
    }
    if (formValues.monthlyExpensesToday <= 0) {
      errors.monthlyExpensesToday = 'Monthly expenses must be positive.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const result = calculateRetirementNeeds(formValues);
      setResults(result);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Retirement Calculator</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Current Age"
          name="currentAge"
          value={formValues.currentAge}
          onChange={handleChange}
          error={errors.currentAge}
        />
        <InputField
          label="Retirement Age"
          name="retirementAge"
          value={formValues.retirementAge}
          onChange={handleChange}
          error={errors.retirementAge}
        />
        <InputField
          label="Monthly Expenses Today (INR)"
          name="monthlyExpensesToday"
          value={formValues.monthlyExpensesToday}
          onChange={handleChange}
          error={errors.monthlyExpensesToday}
        />
        <InputField
          label="Interest Rate on Savings (%)"
          name="interestRate"
          value={formValues.interestRate}
          onChange={handleChange}
        />
        <InputField
          label="Life Expectancy"
          name="lifeExpectancy"
          value={formValues.lifeExpectancy}
          onChange={handleChange}
        />
        <button type="submit">Calculate</button>
      </form>
      {results && <ResultsDisplay results={results} />}
    </div>
  );
};

export default CalculatorForm;
