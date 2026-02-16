// Data Storage
let totalBudget = 0;
let expensesList = [];

// Helper function to update the 3 display boxes
function updateDashboard() {
    const totalExp = expensesList.reduce((acc, curr) => acc + curr.amount, 0);
    const timeLeft = totalBudget - totalExp;

    document.getElementById('totalBudget').innerText = totalBudget;
    document.getElementById('totalExpenses').innerText = totalExp;
    document.getElementById('budgetLeft').innerText = timeLeft;

    // Optional: Make Budget Left red if you overspend
    const budgetBox = document.getElementById('budgetLeft').parentElement;
    if (timeLeft < 0) {
        budgetBox.classList.replace('alert-primary', 'alert-danger');
    } else {
        budgetBox.classList.replace('alert-danger', 'alert-primary');
    }
}

// 1. Function to Add Budget
function addBudget() {
    // Prevent the page from refreshing
    event.preventDefault();
    
    const budgetInput = document.getElementById('budget');
    const value = parseFloat(budgetInput.value);

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid budget amount!");
        return;
    }

    totalBudget = value;
    budgetInput.value = ''; // Clear input
    updateDashboard();
}

// 2. Function to Add Expense
function addExpense() {
    event.preventDefault();

    const titleInput = document.getElementById('expense-title');
    const amountInput = document.getElementById('amount');

    const title = titleInput.value;
    const amount = parseFloat(amountInput.value);

    if (title === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid title and amount!");
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount
    };

    expensesList.push(expense);
    
    // Clear inputs
    titleInput.value = '';
    amountInput.value = '';

    renderTable();
    updateDashboard();
}

// 3. Function to Render the Table Rows
function renderTable() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ""; // Clear current table

    expensesList.forEach((item) => {
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>${item.amount}</td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="editExpense(${item.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExpense(${item.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 4. Delete Function
function deleteExpense(id) {
    expensesList = expensesList.filter(expense => expense.id !== id);
    renderTable();
    updateDashboard();
}

// 5. Edit Function
function editExpense(id) {
    const itemToEdit = expensesList.find(expense => expense.id === id);
    
    // Put values back into inputs for editing
    document.getElementById('expense-title').value = itemToEdit.title;
    document.getElementById('amount').value = itemToEdit.amount;

    // Remove the old item (user will "re-add" it after editing)
    deleteExpense(id);
}

// 6. Reset All Function
function resetAll() {
    if(confirm("Are you sure you want to reset everything?")) {
        totalBudget = 0;
        expensesList = [];
        document.querySelector('table tbody').innerHTML = "";
        updateDashboard();
    }
}