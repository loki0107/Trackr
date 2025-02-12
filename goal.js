document.getElementById('goalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const targetAmount = document.getElementById('targetAmount').value;

    const response = await fetch('http://localhost:5000/api/goal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: goalName, targetAmount }),
    });

    if (response.ok) {
        alert('Goal added');
        loadGoals();
    } else {
        alert('Error adding goal');
    }
});

// Load goals
async function loadGoals() {
    const response = await fetch('http://localhost:5000/api/goal');
    const goals = await response.json();
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = goals.map(goal => `<p>${goal.name}: $${goal.targetAmount}</p>`).join('');
}

loadGoals();
