export const calculateRetirementNeeds = (formValues) => {
  const { currentAge, retirementAge, monthlyExpensesToday, interestRate, lifeExpectancy } = formValues;
  const inflationRate = 4; // constant 4% inflation

  const yearsUntilRetirement = retirementAge - currentAge;
  const retirementDuration = lifeExpectancy - retirementAge;

  // Adjust monthly expenses for inflation
  const inflationAdjustedExpenses = monthlyExpensesToday * Math.pow((1 + inflationRate / 100), yearsUntilRetirement);

  // Monthly interest rate (from annual rate)
  const monthlyInterestRate = (interestRate / 100) / 12;
  const monthsInRetirement = retirementDuration * 12;

  // Calculate total savings required for retirement using annuity formula
  const totalSavingsNeeded = inflationAdjustedExpenses * ((1 - Math.pow(1 + monthlyInterestRate, -monthsInRetirement)) / monthlyInterestRate);

  // Calculate monthly savings needed to reach that amount
  const monthsUntilRetirement = yearsUntilRetirement * 12;
  const monthlySavings = totalSavingsNeeded / ((Math.pow(1 + monthlyInterestRate, monthsUntilRetirement) - 1) / monthlyInterestRate);

  // Calculate yearly withdrawal with inflation adjustment
  let yearlyWithdrawal = [];
  let balance = totalSavingsNeeded;

  for (let i = 0; i < retirementDuration; i++) {
    const withdrawal = inflationAdjustedExpenses * Math.pow(1 + inflationRate / 100, i); // withdrawal grows with inflation
    balance = (balance - withdrawal) * (1 + interestRate / 100); // balance reduces and earns interest

    yearlyWithdrawal.push({
      year: i + 1,
      amount: withdrawal.toFixed(2),
      balance: balance.toFixed(2)
    });
  }

  return {
    totalSavingsNeeded: totalSavingsNeeded.toFixed(2),
    monthlySavings: monthlySavings.toFixed(2),
    yearlyWithdrawal
  };
};
