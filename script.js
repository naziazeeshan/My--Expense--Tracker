const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transaction-list");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

let transactions = [];

function updateDashboard() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    balanceElement.textContent =
        "Rs. " + balance.toLocaleString("en-PK");

    incomeElement.textContent =
        "Rs. " + totalIncome.toLocaleString("en-PK");

    expenseElement.textContent =
        "Rs. " + totalExpenses.toLocaleString("en-PK");
}

function displayTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        const li = document.createElement("li");

        const details = document.createElement("span");

        details.textContent =
            transaction.description +
            " — Rs. " +
            transaction.amount.toLocaleString("en-PK") +
            " — " +
            transaction.type +
            " — " +
            transaction.date;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "12px";
        deleteButton.style.padding = "7px 12px";
        deleteButton.style.backgroundColor = "#dc2626";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", function () {
            transactions = transactions.filter(function (item) {
                return item.id !== transaction.id;
            });

            displayTransactions();
            updateDashboard();
        });

        li.appendChild(details);
        li.appendChild(deleteButton);
        transactionList.appendChild(li);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const date = dateInput.value;

    if (description === "" || amount <= 0 || !date) {
        alert("Please enter valid transaction details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        date: date
    };

    transactions.push(transaction);

    displayTransactions();
    updateDashboard();

    form.reset();
});