const transactions = [
  { date: "2026-04-01", amount: 2000, category: "Salary", type: "income" },
  { date: "2026-04-02", amount: 500, category: "Food", type: "expense" },
  { date: "2026-04-03", amount: 800, category: "Shopping", type: "expense" }
];

const tableBody = document.getElementById("tableBody");
const role = document.getElementById("role");
const actionHead = document.getElementById("actionHead");
const search = document.getElementById("search");

// Calculate totals
function calculate() {
  let income = 0, expense = 0;

  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;
  document.getElementById("balance").innerText = "₹" + (income - expense);
}

// Render table
function renderTable(filter = "") {
  tableBody.innerHTML = "";

  transactions
    .filter(t => t.category.toLowerCase().includes(filter.toLowerCase()))
    .forEach(t => {
      let row = `<tr>
        <td>${t.date}</td>
        <td>₹${t.amount}</td>
        <td>${t.category}</td>
        <td>${t.type}</td>`;

      if (role.value === "Admin") {
        row += `<td><button>Edit</button></td>`;
      }

      row += "</tr>";
      tableBody.innerHTML += row;
    });
}

// Role switch
role.addEventListener("change", () => {
  actionHead.style.display =
    role.value === "Admin" ? "table-cell" : "none";
  renderTable(search.value);
});

// Search
search.addEventListener("input", () => {
  renderTable(search.value);
});

// Insights
function insights() {
  let max = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      max[t.category] = (max[t.category] || 0) + t.amount;
    }
  });

  let highest = Object.keys(max).reduce((a, b) =>
    max[a] > max[b] ? a : b
  );

  document.getElementById("insight1").innerText =
    "📊 Highest spending: " + highest;

  document.getElementById("insight2").innerText =
    "📈 Total transactions: " + transactions.length;
}

// Charts
window.onload = function () {

  calculate();
  renderTable();
  insights();

  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [{
        data: [2000, 3000, 2500, 4000],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.2)",
        fill: true,
        tension: 0.4
      }]
    }
  });

  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Food", "Shopping", "Bills"],
      datasets: [{
        data: [500, 800, 300],
        backgroundColor: ["#93c5fd", "#86efac", "#fca5a5"]
      }]
    }
  });

};