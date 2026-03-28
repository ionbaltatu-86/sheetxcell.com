function formatCurrency(value) {
  return "$" + Number(value).toFixed(2);
}

function calculateLoan() {
  const principal = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("loanYears").value);
  const result = document.getElementById("loanResult");

  if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
    result.innerHTML = "<p>Please enter valid positive values.</p>";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  } else {
    monthlyPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  }

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = totalPaid - principal;

  result.innerHTML = `
    <p><strong>Monthly Payment:</strong> ${formatCurrency(monthlyPayment)}</p>
    <p><strong>Total Paid:</strong> ${formatCurrency(totalPaid)}</p>
    <p><strong>Total Interest:</strong> ${formatCurrency(totalInterest)}</p>
  `;
}

function calculateDebtPayoff() {
  const debt = parseFloat(document.getElementById("debtAmount").value);
  const annualRate = parseFloat(document.getElementById("debtRate").value);
  const monthlyPayment = parseFloat(document.getElementById("debtMonthlyPayment").value);
  const result = document.getElementById("debtResult");

  if (isNaN(debt) || isNaN(annualRate) || isNaN(monthlyPayment) || debt <= 0 || annualRate < 0 || monthlyPayment <= 0) {
    result.innerHTML = "<p>Please enter valid positive values.</p>";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  let balance = debt;
  let months = 0;
  let totalInterest = 0;

  if (monthlyRate > 0 && monthlyPayment <= balance * monthlyRate) {
    result.innerHTML = "<p>Your monthly payment is too low to pay off this debt.</p>";
    return;
  }

  while (balance > 0 && months < 1200) {
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - monthlyPayment;
    months++;

    if (balance < 0) balance = 0;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const totalPaid = debt + totalInterest;

  result.innerHTML = `
    <p><strong>Time to Pay Off:</strong> ${years} years and ${remainingMonths} months</p>
    <p><strong>Total Interest Paid:</strong> ${formatCurrency(totalInterest)}</p>
    <p><strong>Total Paid:</strong> ${formatCurrency(totalPaid)}</p>
  `;
}

function calculateSavingsGoal() {
  const goal = parseFloat(document.getElementById("savingsGoal").value);
  const annualRate = parseFloat(document.getElementById("savingsRate").value);
  const years = parseFloat(document.getElementById("savingsYears").value);
  const result = document.getElementById("savingsResult");

  if (isNaN(goal) || isNaN(annualRate) || isNaN(years) || goal <= 0 || annualRate < 0 || years <= 0) {
    result.innerHTML = "<p>Please enter valid positive values.</p>";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  let monthlyContribution;

  if (monthlyRate === 0) {
    monthlyContribution = goal / months;
  } else {
    monthlyContribution = goal * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
  }

  result.innerHTML = `
    <p><strong>Monthly Savings Needed:</strong> ${formatCurrency(monthlyContribution)}</p>
    <p><strong>Target Amount:</strong> ${formatCurrency(goal)}</p>
    <p><strong>Time Period:</strong> ${years} years</p>
  `;
}

function calculateMortgageExtra() {
  const principal = parseFloat(document.getElementById("mortgageAmount").value);
  const annualRate = parseFloat(document.getElementById("mortgageRate").value);
  const years = parseFloat(document.getElementById("mortgageYears").value);
  const extraPayment = parseFloat(document.getElementById("extraPayment").value);
  const result = document.getElementById("mortgageResult");

  if (
    isNaN(principal) ||
    isNaN(annualRate) ||
    isNaN(years) ||
    isNaN(extraPayment) ||
    principal <= 0 ||
    annualRate < 0 ||
    years <= 0 ||
    extraPayment < 0
  ) {
    result.innerHTML = "<p>Please enter valid values.</p>";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let regularPayment;
  if (monthlyRate === 0) {
    regularPayment = principal / totalMonths;
  } else {
    regularPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalMonths));
  }

  let balance = principal;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < 1200) {
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - (regularPayment + extraPayment);
    months++;

    if (balance < 0) balance = 0;
  }

  const originalTotalPaid = regularPayment * totalMonths;
  const originalInterest = originalTotalPaid - principal;
  const newTotalPaid = principal + totalInterest;
  const interestSaved = originalInterest - totalInterest;
  const monthsSaved = totalMonths - months;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const extraMonthsSaved = monthsSaved % 12;

  result.innerHTML = `
    <p><strong>Regular Monthly Payment:</strong> ${formatCurrency(regularPayment)}</p>
    <p><strong>New Payoff Time:</strong> ${months} months</p>
    <p><strong>Interest Saved:</strong> ${formatCurrency(interestSaved)}</p>
    <p><strong>Time Saved:</strong> ${yearsSaved} years and ${extraMonthsSaved} months</p>
    <p><strong>New Total Interest:</strong> ${formatCurrency(totalInterest)}</p>
    <p><strong>Total Monthly Payment with Extra:</strong> ${formatCurrency(regularPayment + extraPayment)}</p>
  `;
}
