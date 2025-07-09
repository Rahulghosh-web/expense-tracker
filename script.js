let transactions = [];

function addTransaction() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const month = parseInt(document.getElementById("month").value);

  if (!desc || isNaN(amount) || isNaN(month)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount,
    type,
    month
  };

  transactions.push(transaction);
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("month").value = "Select Month";

  renderTransactions();
}

function renderTransactions(filterMonth = "all") {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = transactions;
  if (filterMonth !== "all") {
    filtered = transactions.filter(t => t.month == filterMonth);
  }

  let balance = 0;

  filtered.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      <span>${t.desc} - ₹${t.amount}</span>
      <small>${months[t.month]}</small>
    `;
    list.appendChild(li);

    balance += t.type === "income" ? t.amount : -t.amount;
  });

  document.getElementById("balance").textContent = balance.toFixed(2);
}

function filterByMonth() {
  const month = document.getElementById("filter-month").value;
  renderTransactions(month);
}
