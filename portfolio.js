document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const investmentName = document.getElementById('investmentName').value;
    const amountInvested = document.getElementById('amountInvested').value;

    const response = await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ investmentName, amountInvested }),
    });

    if (response.ok) {
        alert('Investment added');
        loadPortfolio();
    } else {
        alert('Error adding investment');
    }
});

// Load portfolio
async function loadPortfolio() {
    const response = await fetch('http://localhost:5000/api/portfolio');
    const portfolios = await response.json();
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = portfolios.map(port => `<p>${port.investmentName}: $${port.amountInvested}</p>`).join('');
}

loadPortfolio();
