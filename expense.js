document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch('http://localhost:5000/api/expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, amount }),
    });

    if (response.ok) {
        alert('Expense added');
        loadExpenses();
    } else {
        alert('Error adding expense');
    }
});

// Load expenses
async function loadExpenses() {
    const response = await fetch('http://localhost:5000/api/expense');
    const expenses = await response.json();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = expenses.map(exp => `<p>${exp.name}: $${exp.amount}</p>`).join('');
}

loadExpenses();
