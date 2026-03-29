function formatCurrency(value) {
  return "$" + Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateLoan() {
  const principal = parseFloat(document.getElementById("loanAmount")?.value);
  const annualRate = parseFloat(document.getElementById("interestRate")?.value);
  const years = parseFloat(document.getElementById("loanYears")?.value);
  const result = document.getElementById("loanResult");

  if (!result) return;

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
    monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
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
  const debt = parseFloat(document.getElementById("debtAmount")?.value);
  const annualRate = parseFloat(document.getElementById("debtRate")?.value);
  const monthlyPayment = parseFloat(document.getElementById("debtMonthlyPayment")?.value);
  const result = document.getElementById("debtResult");

  if (!result) return;

  if (isNaN(debt) || isNaN(annualRate) || isNaN(monthlyPayment) || debt <= 0 || annualRate < 0 || monthlyPayment <= 0) {
    result.innerHTML = "<p>Please enter valid positive values.</p>";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  let balance = debt;
  let months = 0;
  let totalInterest = 0;

  if (monthlyRate > 0 && monthlyPayment <= balance * monthlyRate) {
    result.innerHTML = "<p>Your monthly payment is too low to reduce this debt.</p>";
    return;
  }

  while (balance > 0 && months < 1200) {
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - monthlyPayment;
    months += 1;
    if (balance < 0) balance = 0;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const totalPaid = debt + totalInterest;
}
