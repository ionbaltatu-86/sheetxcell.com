function calculateLoan() {
  const principal = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("loanYears").value);
  const result = document.getElementById("result");

  if (!principal || !annualRate || !years) {
    result.innerHTML = "Please fill in all fields.";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = totalPaid - principal;

  result.innerHTML = `
    <p><strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}</p>
    <p><strong>Total Paid:</strong> $${totalPaid.toFixed(2)}</p>
    <p><strong>Total Interest:</strong> $${totalInterest.toFixed(2)}</p>
  `;
}
